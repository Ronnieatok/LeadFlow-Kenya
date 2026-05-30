# LeadFlow Kenya - WhatsApp Lead Manager Landing Page

A high-converting landing page for a WhatsApp lead management SaaS targeting Kenyan real estate agents.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the landing page.

### 3. View Captured Leads

During development, you can view leads at: `http://localhost:3000/api/leads`

Leads are saved to `data/leads.json` in your project directory.

---

## 📦 Project Structure

```
├── app/
│   ├── api/
│   │   └── leads/
│   │       └── route.ts          # API endpoint for lead capture
│   ├── layout.tsx                # Root layout with metadata
│   ├── page.tsx                  # Home page
│   ├── whatsapp-lead-manager-landing.tsx  # Main landing page component
│   └── globals.css               # Global styles + Tailwind
├── data/
│   └── leads.json                # Captured leads (auto-generated)
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

---

## 🌐 Deploy to Vercel (Recommended)

### Option 1: Deploy from GitHub

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/ronnieatok/LeadFlow-Kenya.git
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repo
   - Click "Deploy"

Your site will be live at `https://your-project.vercel.app`

### Option 2: Deploy with Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

---

## 🔧 Connect to Real Database (Production Setup)

### Option 1: Supabase (Recommended)

1. **Create Supabase project:**
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Create a `leads` table:
     ```sql
     create table leads (
       id uuid primary key default gen_random_uuid(),
       email text not null,
       phone text not null,
       created_at timestamp with time zone default now(),
       source text default 'landing-page'
     );
     ```

2. **Install Supabase client:**
   ```bash
   npm install @supabase/supabase-js
   ```

3. **Update API route** (`app/api/leads/route.ts`):
   ```typescript
   import { createClient } from '@supabase/supabase-js'
   
   const supabase = createClient(
     process.env.NEXT_PUBLIC_SUPABASE_URL!,
     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
   )
   
   export async function POST(request: Request) {
     const { email, phone } = await request.json()
     
     const { data, error } = await supabase
       .from('leads')
       .insert([{ email, phone, source: 'landing-page' }])
     
     if (error) {
       return NextResponse.json({ error: error.message }, { status: 500 })
     }
     
     return NextResponse.json({ success: true })
   }
   ```

4. **Add environment variables** (`.env.local`):
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

### Option 2: Google Sheets

1. **Set up Google Sheets API:**
   - Follow: https://developers.google.com/sheets/api/quickstart/nodejs

2. **Install Google Sheets client:**
   ```bash
   npm install googleapis
   ```

3. **Update API route to append rows to Google Sheets**

### Option 3: Email Notifications

Send email to yourself when someone signs up:

```bash
npm install resend
```

```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

await resend.emails.send({
  from: 'leads@yourdomain.com',
  to: 'you@example.com',
  subject: 'New LeadFlow Signup!',
  html: `New lead: ${email}, ${phone}`
})
```

---

## 📱 Test Form Submission

1. Fill out the form on the landing page
2. Check `data/leads.json` (local) or your database (production)
3. Or visit `/api/leads` to see all captured leads (remove this endpoint in production!)

---

## 🎨 Customize Landing Page

### Update Copy/Messaging

Edit `app/whatsapp-lead-manager-landing.tsx`:

- **Hero headline:** Line ~52
- **Pricing:** Line ~383
- **Testimonials:** Line ~304
- **Features:** Line ~222

### Change Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  green: {
    600: '#YOUR_PRIMARY_COLOR',  // Main CTA buttons
    50: '#YOUR_LIGHT_BG',         // Background accents
  }
}
```

### Add Google Analytics

Update `app/layout.tsx`:

```typescript
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `
        }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

---

## 💰 Next Steps After Launch

1. **Drive Traffic:**
   - Facebook Ads targeting "Real Estate Agents Kenya"
   - Join Facebook groups: "Real Estate Agents Kenya", "Nairobi Property Dealers"
   - Post in WhatsApp groups with real estate agents

2. **A/B Test:**
   - Try different headlines
   - Test pricing visibility (show vs hide initially)
   - Test CTA button text

3. **Collect Social Proof:**
   - Get 3-5 agents to test the product
   - Record video testimonials
   - Screenshot good results
   - Update testimonials section with real data

4. **Add Payment:**
   - Integrate M-Pesa via Daraja API
   - Or use Paystack/Flutterwave for card payments

5. **Build Email Sequence:**
   - Day 1: Welcome + setup guide
   - Day 3: "How are you finding it?"
   - Day 7: "See what others are achieving"
   - Day 25: "Your trial ends in 5 days"

---

## 📊 Conversion Optimization Tips

### Current Conversion Elements:
✅ Clear value proposition in headline
✅ Social proof (testimonials)
✅ Pricing transparency
✅ 30-day free trial (lowers barrier)
✅ Mobile-responsive design
✅ FAQ section (addresses objections)
✅ Multiple CTAs throughout page

### To Test:
- Add video demo/walkthrough
- Add live chat widget (Tawk.to is free)
- Add "As featured in..." media logos
- Add exit-intent popup with discount
- Add countdown timer "50% off ends in 3 days"

---

## 🐛 Troubleshooting

**Form not submitting:**
- Check browser console for errors
- Verify API route is accessible: `/api/leads`
- Check network tab in browser dev tools

**Styling broken:**
- Run `npm install` again
- Clear `.next` folder: `rm -rf .next`
- Restart dev server

**Deployment fails:**
- Ensure all files are committed to git
- Check Vercel build logs for errors
- Verify Node version is 18+ in `package.json`: `"engines": { "node": ">=18.0.0" }`

---

## 📈 Tracking Success

Monitor these metrics:

- **Visitors** → Google Analytics
- **Form submissions** → Count rows in database
- **Conversion rate** → (Submissions / Visitors) × 100
- **Cost per lead** → (Ad spend / Submissions)

**Good benchmarks:**
- 2-5% conversion rate = Decent
- 5-10% = Great
- 10%+ = Exceptional

---

## 💡 Questions?

**Want to add features?**
- Email capture → Already built ✅
- WhatsApp click-to-chat → Add button with `https://wa.me/254XXXXXXXXX`
- Calendar booking → Integrate Calendly
- Live demo → Embed Loom video

**Need help deploying?**
- Vercel docs: https://vercel.com/docs
- Next.js docs: https://nextjs.org/docs

---

## 📝 License

MIT - Feel free to use this for your own SaaS landing page.

---

**Built with:**
- Next.js 14
- Tailwind CSS
- TypeScript
- Lucide Icons
