# MVP Technical Implementation Guide

Build the core WhatsApp Lead Manager product in 7-10 days.

---

## Tech Stack (Final Decision)

```
Frontend:  Next.js 14 + Tailwind CSS + shadcn/ui
Backend:   Next.js API routes
Database:  Supabase (PostgreSQL + real-time subscriptions)
Auth:      Supabase Auth
WhatsApp:  Baileys (open-source WhatsApp Web API)
Payments:  M-Pesa Daraja API
Hosting:   Vercel (frontend) + Railway (WhatsApp bot)
```

**Why this stack:**
- Fast to build (1-2 weeks)
- Scales to 1000+ users without refactoring
- Free tier covers first 50 customers
- Kenya-friendly (M-Pesa, WhatsApp)

---

## Database Schema

```sql
-- Users (handled by Supabase Auth automatically)

-- Leads table
create table leads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  whatsapp_number text not null,
  name text,
  budget_min integer,
  budget_max integer,
  location text,
  property_type text, -- apartment, house, land, commercial
  status text default 'warm', -- hot, warm, cold
  last_message text,
  last_message_at timestamp with time zone,
  notes text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Messages table
create table messages (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references leads(id) on delete cascade,
  sender text not null, -- 'agent' or 'customer'
  content text not null,
  created_at timestamp with time zone default now()
);

-- Properties table
create table properties (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  title text not null,
  description text,
  price integer not null,
  location text not null,
  bedrooms integer,
  property_type text,
  images text[], -- array of image URLs
  created_at timestamp with time zone default now()
);

-- Subscriptions table (for payments)
create table subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  plan text not null, -- starter, professional, agency
  status text not null, -- active, cancelled, past_due
  amount integer not null,
  mpesa_phone text,
  next_billing_date date,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Follow-up reminders table
create table reminders (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references leads(id) on delete cascade,
  user_id uuid references auth.users not null,
  scheduled_for timestamp with time zone not null,
  message text,
  completed boolean default false,
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table leads enable row level security;
alter table messages enable row level security;
alter table properties enable row level security;
alter table subscriptions enable row level security;
alter table reminders enable row level security;

-- RLS Policies (users can only see their own data)
create policy "Users can view own leads"
  on leads for select
  using (auth.uid() = user_id);

create policy "Users can insert own leads"
  on leads for insert
  with check (auth.uid() = user_id);

create policy "Users can update own leads"
  on leads for update
  using (auth.uid() = user_id);

-- Repeat similar policies for other tables
```

---

## MVP Features (Build in This Order)

### Week 1: Core Lead Management

**Day 1-2: Setup**
- [ ] Create Supabase project
- [ ] Run database schema SQL above
- [ ] Set up Next.js project
- [ ] Add Supabase client
- [ ] Build auth pages (login/signup)

**Day 3-4: Lead Inbox**
- [ ] Dashboard page showing all leads
- [ ] Table view: Name, Number, Status, Last Message, Date
- [ ] Filter by status (Hot/Warm/Cold)
- [ ] Search by name or number
- [ ] Click lead → see conversation history

**Day 5-7: WhatsApp Integration**
- [ ] Set up Baileys WhatsApp bot on Railway
- [ ] Connect bot to Supabase (save messages)
- [ ] Real-time message sync to dashboard
- [ ] Send message from dashboard → goes to WhatsApp
- [ ] Auto-tag new leads as "Warm"

### Week 2: Payment + Polish

**Day 8-10: M-Pesa Payments**
- [ ] Integrate Daraja API (see code below)
- [ ] Subscription page with pricing tiers
- [ ] STK Push for M-Pesa payments
- [ ] Webhook to update subscription status
- [ ] Email receipt after payment

**Day 11-12: Polish**
- [ ] Add property quick-send feature
- [ ] Add follow-up reminder feature
- [ ] Mobile responsive design
- [ ] Fix top 10 bugs

**Day 13-14: Deploy**
- [ ] Deploy to Vercel
- [ ] Deploy WhatsApp bot to Railway
- [ ] Test end-to-end flow
- [ ] Write user documentation

---

## WhatsApp Integration (Baileys)

### Option 1: Baileys (Free, Open Source)

**Pros:**
- Free
- No approval needed
- Works immediately
- Good for MVP

**Cons:**
- Can get banned if you spam
- Requires QR code scan to connect
- Phone must be online

**Setup:**

```bash
# On Railway (separate from Next.js app)
npm install @whiskeysockets/baileys pino
```

**bot.js:**

```javascript
const { default: makeWASocket, DisconnectReason, useMultiFileAuthState } = require('@whiskeysockets/baileys')
const { createClient } = require('@supabase/supabase-js')
const pino = require('pino')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

async function connectToWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys')
  
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
    logger: pino({ level: 'silent' })
  })

  sock.ev.on('creds.update', saveCreds)

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0]
    if (!msg.message) return
    
    const from = msg.key.remoteJid
    const text = msg.message.conversation || msg.message.extendedTextMessage?.text
    const name = msg.pushName || 'Unknown'

    // Save to Supabase
    const { data: lead } = await supabase
      .from('leads')
      .select()
      .eq('whatsapp_number', from)
      .single()

    if (!lead) {
      // Create new lead
      await supabase.from('leads').insert({
        user_id: process.env.USER_ID, // Your user ID
        whatsapp_number: from,
        name: name,
        status: 'warm',
        last_message: text,
        last_message_at: new Date()
      })
    } else {
      // Update existing lead
      await supabase
        .from('leads')
        .update({
          last_message: text,
          last_message_at: new Date()
        })
        .eq('id', lead.id)
    }

    // Save message
    await supabase.from('messages').insert({
      lead_id: lead?.id,
      sender: 'customer',
      content: text
    })

    // Auto-reply logic
    if (text.toLowerCase().includes('price')) {
      await sock.sendMessage(from, {
        text: 'Thanks for your inquiry! Our agent will respond with pricing shortly.'
      })
    }
  })

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update
    if (connection === 'close') {
      const shouldReconnect = lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut
      if (shouldReconnect) {
        connectToWhatsApp()
      }
    }
  })
}

connectToWhatsApp()
```

**Deploy to Railway:**

```bash
railway login
railway init
railway up
```

**Environment variables on Railway:**
- `SUPABASE_URL`
- `SUPABASE_KEY`
- `USER_ID`

### Option 2: WhatsApp Business API (Official)

**Pros:**
- More reliable
- Won't get banned
- Multi-device support

**Cons:**
- Costs $40-100/month
- Requires Meta Business verification
- Takes 1-2 weeks to approve

**Only use if you have 20+ paying customers.**

---

## M-Pesa Integration (Daraja API)

**Setup:**

1. Go to https://developer.safaricom.co.ke/
2. Create app
3. Get Consumer Key and Consumer Secret
4. Get Passkey for Lipa Na M-Pesa

**API Route** (`/app/api/mpesa/route.ts`):

```typescript
import { NextResponse } from 'next/server'

const CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY
const CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET
const PASSKEY = process.env.MPESA_PASSKEY
const BUSINESS_SHORTCODE = process.env.MPESA_SHORTCODE

async function getAccessToken() {
  const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64')
  
  const response = await fetch(
    'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
    {
      headers: {
        Authorization: `Basic ${auth}`
      }
    }
  )
  
  const data = await response.json()
  return data.access_token
}

export async function POST(request: Request) {
  const { phone, amount } = await request.json()
  
  // Remove leading 0 or +254
  const formattedPhone = phone.replace(/^0/, '254').replace(/^\+/, '')
  
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14)
  const password = Buffer.from(
    `${BUSINESS_SHORTCODE}${PASSKEY}${timestamp}`
  ).toString('base64')
  
  const token = await getAccessToken()
  
  const response = await fetch(
    'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        BusinessShortCode: BUSINESS_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: formattedPhone,
        PartyB: BUSINESS_SHORTCODE,
        PhoneNumber: formattedPhone,
        CallBackURL: `${process.env.NEXT_PUBLIC_URL}/api/mpesa/callback`,
        AccountReference: 'LeadFlow',
        TransactionDesc: 'Subscription Payment'
      })
    }
  )
  
  const data = await response.json()
  return NextResponse.json(data)
}
```

**Callback Route** (`/app/api/mpesa/callback/route.ts`):

```typescript
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

export async function POST(request: Request) {
  const body = await request.json()
  
  const resultCode = body.Body?.stkCallback?.ResultCode
  
  if (resultCode === 0) {
    // Payment successful
    const amount = body.Body.stkCallback.CallbackMetadata.Item
      .find((item: any) => item.Name === 'Amount').Value
    
    const phone = body.Body.stkCallback.CallbackMetadata.Item
      .find((item: any) => item.Name === 'PhoneNumber').Value
    
    // Update subscription in database
    await supabase
      .from('subscriptions')
      .update({
        status: 'active',
        next_billing_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      })
      .eq('mpesa_phone', phone)
    
    // TODO: Send confirmation email
  }
  
  return NextResponse.json({ status: 'ok' })
}
```

**Important:** Start with sandbox for testing. Switch to production after 5 paying customers.

---

## Deployment Checklist

### Next.js App (Vercel)
- [ ] Push to GitHub
- [ ] Connect to Vercel
- [ ] Add environment variables
- [ ] Deploy

### WhatsApp Bot (Railway)
- [ ] Create Railway project
- [ ] Deploy bot code
- [ ] Scan QR code to connect WhatsApp
- [ ] Monitor logs

### Supabase
- [ ] Create project
- [ ] Run SQL schema
- [ ] Enable RLS policies
- [ ] Get API keys

---

## Testing Checklist

Before launch:
- [ ] Can user sign up and log in?
- [ ] Does WhatsApp message show in dashboard?
- [ ] Can user send message from dashboard?
- [ ] Do tags (Hot/Warm/Cold) update correctly?
- [ ] Does M-Pesa payment work (sandbox)?
- [ ] Is subscription activated after payment?
- [ ] Works on mobile phone?
- [ ] Works on slow internet?

---

## Post-Launch Monitoring

Monitor these daily:

1. **Error tracking:** Use Sentry (free tier)
   ```bash
   npm install @sentry/nextjs
   ```

2. **Uptime monitoring:** Use UptimeRobot (free)
   - Monitor your website
   - Monitor WhatsApp bot

3. **Database size:** Check Supabase dashboard
   - Free tier: 500MB
   - Upgrade at 400MB

4. **Logs:** Check Railway and Vercel logs daily

---

## Cost Breakdown (First 50 Customers)

**Free:**
- Vercel hosting: Free
- Supabase: Free (up to 500MB database)
- Railway: $5/month (WhatsApp bot)

**Paid (after customers):**
- Domain: KES 1,500/year
- M-Pesa API: Free (they charge per transaction)
- Email service (Resend): $20/month
- Error tracking (Sentry): Free tier

**Total monthly cost:** ~$25 (KES 3,000)

**Revenue at 50 customers:** 50 × KES 2,000 = KES 100,000/month

**Profit margin:** 97%

---

## Next Steps

1. **Start with landing page** (you already have this!)
2. **Get 3 beta testers** from Facebook groups
3. **Build MVP in 10 days** using this guide
4. **Launch to first 10 customers**
5. **Iterate based on feedback**

Remember: Ship fast, fix later. Get to revenue quickly.
