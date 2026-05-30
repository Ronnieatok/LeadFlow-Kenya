# Troubleshooting Guide & Common Problems

Solutions to problems you'll face during launch.

---

## Table of Contents

1. [Landing Page Issues](#landing-page-issues)
2. [No One Is Signing Up](#no-one-is-signing-up)
3. [Signups But No Activations](#signups-but-no-activations)
4. [Technical Problems](#technical-problems)
5. [Payment Issues](#payment-issues)
6. [Customer Support](#customer-support)
7. [Marketing Not Working](#marketing-not-working)
8. [Running Out of Money](#running-out-of-money)

---

## Landing Page Issues

### Problem: Landing page won't deploy to Vercel

**Symptoms:** Build fails, error messages, site won't go live

**Solutions:**

1. **Check Node version**
   ```bash
   node --version  # Should be 18+
   ```
   If lower, update Node.js

2. **Clear cache and rebuild**
   ```bash
   rm -rf .next node_modules
   npm install
   npm run build
   ```

3. **Check Vercel build logs**
   - Go to vercel.com → Your project → Deployments
   - Click failed deployment
   - Read error message
   - Common fixes:
     - Missing environment variable
     - TypeScript errors
     - Import path errors

4. **Test locally first**
   ```bash
   npm run build
   npm start
   ```
   If it works locally but not on Vercel, it's usually an environment variable issue.

---

### Problem: Form submissions not saving

**Symptoms:** People fill form but leads don't appear in database

**Solutions:**

1. **Check API endpoint**
   - Visit yoursite.com/api/leads in browser
   - Should see: `{"total":0,"leads":[]}`
   - If you get 404, API route isn't set up correctly

2. **Check console errors**
   - Open browser dev tools (F12)
   - Go to Console tab
   - Look for red errors when submitting form

3. **Verify Supabase connection**
   - Go to Supabase dashboard
   - Check if `leads` table exists
   - Check if RLS policies allow inserts
   - Common fix: Disable RLS temporarily to test

4. **Test API directly**
   ```bash
   curl -X POST https://yoursite.com/api/leads \
     -H "Content-Type: application/json" \
     -d '{"email":"test@test.com","phone":"0712345678"}'
   ```

---

### Problem: Mobile design is broken

**Symptoms:** Layout looks fine on desktop but broken on phone

**Solutions:**

1. **Test in mobile view**
   - Browser dev tools → Toggle device toolbar
   - Test on actual phone

2. **Check Tailwind responsive classes**
   - Make sure you're using `sm:`, `md:`, `lg:` prefixes
   - Example: `text-4xl sm:text-5xl` (smaller on mobile)

3. **Fix common issues:**
   - Text too small → increase font size for mobile
   - Buttons too small → make them bigger (min 44px height)
   - Horizontal scroll → remove fixed widths, use `max-w-full`

---

## No One Is Signing Up

### Problem: Getting traffic but no signups

**Symptoms:** 100+ visitors, 0-1 signups

**Solutions:**

**1. Test your headline**

Current: "Stop Losing Property Leads on WhatsApp"

Try:
- "Close 30% More Deals Without Working Harder"
- "Never Lose Another WhatsApp Lead"
- "Turn Your WhatsApp Into a Lead-Closing Machine"

**2. Add urgency**
- "First 20 Agents Get 50% Off Lifetime"
- "Offer Ends May 31"
- "Only 5 Spots Left"

**3. Reduce friction**
- Remove phone number field (only ask for email)
- Make button bigger
- Change CTA from "Get Early Access" to "Start Free Trial"

**4. Add proof**
- "Join 50+ Agents Already Using This"
- Add testimonial screenshot
- Add before/after numbers

**5. Test different lead magnets**

Instead of "early access," offer:
- "Free WhatsApp Lead Tracking Template (Google Sheets)"
- "Free Guide: 7 Ways to Never Lose a WhatsApp Lead"
- "Free 15-Min Strategy Call"

---

### Problem: Wrong audience is clicking ads

**Symptoms:** Clicks but no signups, or signups from non-agents

**Solutions:**

1. **Tighten Facebook targeting**
   - Add job title: "Real Estate Agent"
   - Add more specific interests
   - Exclude: Students, Job seekers

2. **Update ad copy to filter**
   - Add "For Kenyan Real Estate Agents Only"
   - Mention specific pain points agents have
   - Show agent-specific screenshots

3. **Change ad image**
   - Use image of agent on phone
   - Show WhatsApp interface
   - Avoid generic stock photos

---

## Signups But No Activations

### Problem: People sign up but don't complete onboarding

**Symptoms:** 20 signups, 2 active users

**Solutions:**

**1. Email them immediately**

Subject: "Your LeadFlow account is ready ✅"

Body:
```
Hi [Name],

Thanks for signing up! Your account is ready to go.

Quick 2-minute setup:
1. Click here: [activation link]
2. Connect your WhatsApp (we'll show you how)
3. Start tracking leads immediately

Stuck? Reply to this email and I'll help.

-[Your Name]
```

**2. Add onboarding checklist**

Show progress bar:
- ☐ Connect WhatsApp
- ☐ Add first lead
- ☐ Send first message
- ☐ Set first reminder

**3. Offer personal help**
- "Book a 10-min setup call"
- "WhatsApp me if you get stuck: 0712345678"
- "I'll personally set this up for you"

**4. Simplify onboarding**

If setup takes more than 5 minutes, it's too complex.

Current steps:
1. Sign up → 2 minutes
2. Connect WhatsApp → 3 minutes
3. Done!

Remove anything else.

---

## Technical Problems

### Problem: WhatsApp bot keeps disconnecting

**Symptoms:** Bot works then stops receiving messages

**Solutions:**

1. **Check Railway logs**
   ```bash
   railway logs
   ```
   Look for errors

2. **Common fixes:**
   - Phone died or went offline
   - WhatsApp session expired (rescan QR code)
   - Railway service crashed (restart it)

3. **Keep bot alive**
   - Add ping endpoint:
   ```javascript
   app.get('/ping', (req, res) => res.send('alive'))
   ```
   - Use UptimeRobot to ping every 5 minutes

4. **Upgrade to WhatsApp Business API**
   - More reliable than Baileys
   - Costs $40/month
   - Worth it after 20 customers

---

### Problem: Supabase database is full

**Symptoms:** "Storage limit exceeded" error

**Solutions:**

1. **Check current usage**
   - Supabase dashboard → Settings → Usage
   - Free tier: 500MB

2. **Delete old data**
   ```sql
   DELETE FROM messages WHERE created_at < NOW() - INTERVAL '90 days';
   ```

3. **Upgrade to Pro**
   - $25/month
   - 8GB storage
   - Worth it at 30+ customers

4. **Optimize storage**
   - Don't store images in database (use Cloudinary)
   - Archive old leads to CSV monthly

---

### Problem: App is slow

**Symptoms:** Takes 3+ seconds to load pages

**Solutions:**

1. **Check Vercel logs**
   - Look for slow API calls
   - Check function execution time

2. **Optimize database queries**
   - Add indexes:
   ```sql
   CREATE INDEX idx_leads_user_id ON leads(user_id);
   CREATE INDEX idx_messages_lead_id ON messages(lead_id);
   ```

3. **Enable caching**
   - Cache lead list for 30 seconds
   - Use Vercel Edge Caching

4. **Lazy load data**
   - Load 20 leads at a time, not all 1000
   - Add pagination

---

## Payment Issues

### Problem: M-Pesa payments failing

**Symptoms:** Users try to pay but get errors

**Solutions:**

1. **Check Daraja API status**
   - Go to developer.safaricom.co.ke
   - Check if API is down

2. **Verify credentials**
   - Consumer Key correct?
   - Consumer Secret correct?
   - Passkey correct?
   - Using production (not sandbox)?

3. **Common errors:**

**"Invalid Access Token"**
- Access token expired (they last 1 hour)
- Regenerate token before each payment

**"Insufficient funds"**
- User doesn't have money in M-Pesa
- Ask them to check balance

**"Transaction failed"**
- Wrong phone number format
- Should be: 254712345678 (no + or spaces)

4. **Test flow:**
   ```bash
   # Use your own number
   # Amount: KES 1 (test)
   # Should receive STK push on phone
   ```

---

### Problem: Payment succeeded but subscription not activated

**Symptoms:** User paid but still showing as "trial"

**Solutions:**

1. **Check callback URL**
   - Is it publicly accessible?
   - Test: curl https://yoursite.com/api/mpesa/callback

2. **Check database**
   - Did subscription update?
   - Look for the user's M-Pesa phone number

3. **Manual activation (temporary fix)**
   ```sql
   UPDATE subscriptions
   SET status = 'active',
       next_billing_date = CURRENT_DATE + INTERVAL '30 days'
   WHERE user_id = 'xxx';
   ```

4. **Add payment status page**
   - Let users see if payment went through
   - Show: "Payment pending" or "Payment confirmed"

---

## Customer Support

### Problem: Can't keep up with support messages

**Symptoms:** 50+ WhatsApp messages, 20 emails, falling behind

**Solutions:**

**1. Create FAQ**

Answer these 10 questions in your docs:
1. How do I connect WhatsApp?
2. How do I add a lead manually?
3. How do I send a message?
4. How do I set a reminder?
5. Why isn't my WhatsApp syncing?
6. How do I change my payment method?
7. How do I cancel?
8. Is my data safe?
9. Do you offer refunds?
10. How do I export my leads?

**2. Use canned responses**

Create templates in your email:
- "Setup issue" → Here's how to fix [common problem]
- "Payment question" → Here's our refund policy
- "Feature request" → Thanks! Added to roadmap

**3. Set support hours**

"Support available 9 AM - 6 PM EAT, Monday-Friday"

Outside hours:
"Thanks for your message! I'll respond within 24 hours."

**4. Hire VA (after 30 customers)**

Pay someone KES 20,000/month to:
- Answer common questions
- Do first-line support
- Escalate complex issues to you

---

### Problem: Customer wants refund

**Symptoms:** "This didn't work for me, I want my money back"

**Solution:**

**1. Understand why first**

"I'm sorry it didn't work out. Mind if I ask what happened? This helps me improve for others."

Common reasons:
- Too complicated → simplify onboarding
- Missing feature → add to roadmap
- Didn't see value → better onboarding

**2. Offer to help**

"Let me hop on a quick call and see if I can help you get set up properly. Would 15 minutes tomorrow work?"

Often they just need help, not a refund.

**3. If they still want refund:**

"No problem. Refund processed. Sorry it didn't work for you. If you ever want to try again, first month is free."

**Process refund same day.**  
Bad review from angry customer costs more than KES 2,000.

**4. Learn from it**

If 3+ people ask for refunds for same reason, that's a product problem. Fix it.

---

## Marketing Not Working

### Problem: Facebook ads getting no clicks

**Symptoms:** Spent KES 5,000, got 10 clicks, 0 signups

**Solutions:**

**1. Check your targeting**

Too broad:
- Kenya + Interest: Business ❌

Better:
- Nairobi, Mombasa, Kisumu + Job Title: Real Estate Agent ✅

**2. Improve ad copy**

Bad:
"LeadFlow helps you manage leads" ❌

Good:
"David closed 3 extra deals this month using LeadFlow" ✅

**3. Test new images**

Try:
- Before/after screenshots
- Happy agent on phone
- WhatsApp chat screenshot
- Numbers/results graphic

**4. Lower cost per click**

- Narrow location (Nairobi only)
- Exclude people under 25
- Use manual bidding
- Set daily budget lower (KES 500)

**5. If still not working after KES 10K spent:**

Pause ads. Focus on:
- Facebook groups (free)
- WhatsApp status (free)
- Referrals from existing customers (free)

---

### Problem: Getting signups but no one converts to paid

**Symptoms:** 50 trial users, 0 paid conversions

**Solutions:**

**1. They don't see value**

Ask: "What's preventing you from upgrading?"

Common answers:
- "Didn't actually use it" → Improve onboarding
- "Missing [feature]" → Add the feature
- "Too expensive" → Test lower price
- "Didn't work with my WhatsApp" → Fix technical issue

**2. Add mid-trial check-in**

Day 15 email:
"Hey! You're halfway through your trial. How's it going? Any questions?"

**3. Show ROI before trial ends**

Day 25 email:
"Your trial ends in 5 days. Quick question: Have you closed any extra deals using LeadFlow? Even one deal (KES 45K commission) pays for a year of LeadFlow (KES 24K)."

**4. Offer discount**

Day 29:
"Tomorrow's your last day. Special offer: 50% off first 3 months if you upgrade today. Just KES 1,000/month instead of KES 2,000."

---

## Running Out of Money

### Problem: Spent KES 20K on ads, no paying customers yet

**Symptoms:** Burning cash, no revenue, feeling stressed

**Solutions:**

**1. Pause all paid marketing**

Stop ads immediately. You can't buy customers profitably yet.

**2. Focus on free channels**

- Post in Facebook groups daily
- DM agents directly
- Ask for referrals from beta testers
- WhatsApp status updates

**3. Lower price temporarily**

"First 10 customers: KES 1,000/month lifetime"

Better to have revenue at lower price than no revenue.

**4. Offer annual plans**

"Pay KES 12,000 for the year (50% off) and get 2 months free"

Gets cash upfront.

**5. Get a co-founder or investor**

If you believe in this, find someone who:
- Knows sales/marketing (you focus on product)
- Has money to invest
- Believes in the vision

**6. Get a job (part-time)**

Work 20 hours/week for income.
Build this 20 hours/week on side.

Don't go broke pursuing this.

**7. Kill criteria**

If you hit ANY of these, consider stopping:
- Spent KES 50K, 0 paying customers
- 3 months in, still can't get to KES 10K MRR
- Customers keep canceling
- You hate working on this

---

## When to Pivot vs When to Quit

### Pivot (change direction) if:

✅ People want THIS but different  
✅ Different customer segment loves it  
✅ Close but not quite right

Example:
- Real estate agents don't want it
- BUT car salespeople love it
- Pivot to car sales CRM

### Quit (move to new idea) if:

❌ No one has the problem  
❌ No one will pay  
❌ Can't build it technically  
❌ Market is too small  
❌ You hate working on it

**Don't spend 6 months on something nobody wants.**

---

## Emergency Contacts

**Vercel Support:** vercel.com/support  
**Supabase Support:** supabase.com/support  
**M-Pesa Daraja:** 0711 222 222

**Developer Communities:**
- Reddit: r/SaaS, r/startups
- Twitter: #BuildInPublic
- Facebook: "Nairobi Tech Community"

**When really stuck:**
Post your problem with specifics:
- What you tried
- What error you got
- Code snippet (if relevant)

People love helping.

---

## Remember

**Every founder hits these problems.**

- Shopify had payment issues
- Airbnb had no signups
- Uber spent millions before profit

**You're not failing. You're learning.**

The difference between success and failure is:
- Success: Hit problem → Find solution → Keep going
- Failure: Hit problem → Give up

**You got this.**
