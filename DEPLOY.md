# Deploy to Vercel - Step by Step

## Prerequisites
- GitHub account
- Vercel account (free tier is fine)

---

## Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial landing page setup"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/leadflow-kenya.git
git branch -M main
git push -u origin main
```

---

## Step 2: Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Project"
3. Connect your GitHub account (if not already connected)
4. Select the `leadflow-kenya` repository
5. Click "Import"

---

## Step 3: Configure Project

Vercel should auto-detect Next.js. If asked:

- **Framework Preset:** Next.js
- **Build Command:** `npm run build` (default)
- **Output Directory:** `.next` (default)
- **Install Command:** `npm install` (default)

---

## Step 4: Add Environment Variables (Optional)

If using Supabase or other services:

1. In Vercel project settings → Environment Variables
2. Add:
   ```
   NEXT_PUBLIC_SUPABASE_URL = https://xxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJxxx...
   ```

---

## Step 5: Deploy

Click **"Deploy"**

Your site will be live at: `https://your-project-name.vercel.app`

---

## Step 6: Custom Domain (Optional)

1. Buy domain (e.g., leadflowkenya.com from Namecheap/Godaddy)
2. In Vercel → Project Settings → Domains
3. Add your custom domain
4. Update DNS records at your domain registrar:
   ```
   Type: CNAME
   Name: @
   Value: cname.vercel-dns.com
   ```

---

## Continuous Deployment

Every time you push to GitHub, Vercel automatically redeploys:

```bash
# Make changes
git add .
git commit -m "Update pricing"
git push

# Vercel automatically deploys the changes
```

---

## Production Checklist

Before going live:

- [ ] Remove `/api/leads` GET endpoint (shows all leads publicly!)
- [ ] Set up proper database (Supabase, not JSON file)
- [ ] Add Google Analytics
- [ ] Test form submission in production
- [ ] Add privacy policy page
- [ ] Add terms of service page
- [ ] Set up email notifications for new leads
- [ ] Test on mobile devices
- [ ] Run Lighthouse audit (aim for 90+ score)

---

## Monitoring

- **Analytics:** vercel.com/YOUR_PROJECT/analytics
- **Logs:** vercel.com/YOUR_PROJECT/logs
- **Performance:** vercel.com/YOUR_PROJECT/speed-insights

---

## Troubleshooting

**Build fails:**
- Check Vercel build logs
- Ensure `package.json` has correct dependencies
- Run `npm run build` locally first

**404 errors:**
- Clear Vercel cache and redeploy
- Check file structure matches Next.js conventions

**API route not working:**
- Verify `/app/api/leads/route.ts` exists
- Check Vercel function logs

---

## Free Tier Limits

Vercel free tier includes:
- ✅ 100GB bandwidth/month
- ✅ Unlimited deployments
- ✅ Automatic HTTPS
- ✅ Preview deployments

**Perfect for validating your SaaS idea!**

Once you get traction, upgrade to Pro ($20/month) for:
- Better analytics
- More bandwidth
- Team collaboration
