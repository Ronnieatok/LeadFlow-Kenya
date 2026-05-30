# Business Model & Unit Economics

Understanding your numbers is critical for scaling profitably.

---

## Business Model Canvas

### **Value Proposition**
What you're selling: Time savings + more closed deals

**For real estate agents:**
- Never lose a WhatsApp lead
- Automatic follow-up reminders
- Close 30% more deals
- Save 2 hours per day

**Unique selling point:**
Built specifically for Kenyan real estate agents. M-Pesa payments. WhatsApp-first. Simple, not bloated.

---

### **Customer Segments**

**Primary:** Solo real estate agents in Kenya
- 25-45 years old
- Handle 30-100 inquiries/month
- Make KES 200K-500K/month in commissions
- Use WhatsApp as primary communication tool

**Secondary:** Small agencies (3-10 agents)
- Need team collaboration features
- Higher LTV, more complex sales

**NOT targeting:**
- Large real estate firms (different needs)
- Property developers (different use case)
- International agents (different payment methods)

---

### **Channels**

**Customer Acquisition:**
1. Facebook ads (paid)
2. Facebook groups (free)
3. WhatsApp referrals (free)
4. Google Ads (future)
5. Real estate forums (free)

**Customer Retention:**
1. Email drip campaign
2. WhatsApp support
3. Feature updates
4. Webinars/training

---

### **Revenue Streams**

**Primary:** Monthly subscriptions
- Starter: KES 2,000/month
- Professional: KES 4,500/month
- Agency: KES 12,000/month

**Future:**
- Annual plans (2 months free)
- Setup fee for agencies (KES 10,000)
- Premium support (KES 5,000/month)

**NOT doing:**
- One-time purchase (need recurring revenue)
- Freemium forever (loses money)
- Commission on deals (too complex to track)

---

### **Cost Structure**

**Fixed Costs (Monthly):**
- WhatsApp bot hosting (Railway): KES 600
- Database (Supabase): Free → KES 3,000 at scale
- Email service (Resend): KES 2,500
- Domain: KES 125 (KES 1,500/year)
- Error tracking (Sentry): Free
- Total: ~KES 3,000/month

**Variable Costs (Per Customer):**
- M-Pesa transaction fees: KES 30/payment
- Support time: ~30 min/month = KES 200 (at KES 400/hour)
- Total: ~KES 230/customer/month

**Marketing Costs:**
- Facebook ads: KES 2,000/day = KES 60,000/month
- Customer acquisition cost (CAC): Targeting KES 4,000-6,000

---

## Unit Economics

### **Key Metrics**

**Monthly Recurring Revenue (MRR):**
```
MRR = Number of customers × Average price
Example: 50 customers × KES 2,000 = KES 100,000 MRR
```

**Customer Acquisition Cost (CAC):**
```
CAC = Total marketing spend / New customers acquired
Example: KES 60,000 ad spend / 15 signups = KES 4,000 CAC
```

**Customer Lifetime Value (LTV):**
```
LTV = Average monthly revenue × Average customer lifetime (months)
Example: KES 2,000 × 18 months = KES 36,000 LTV
```

**LTV:CAC Ratio:**
```
LTV:CAC = KES 36,000 / KES 4,000 = 9:1 (EXCELLENT)
```

**Target: 3:1 or higher**
- Below 3:1 = Unsustainable
- 3:1 = Breakeven
- 5:1+ = Healthy
- 9:1 = Excellent margins

---

## Month-by-Month Projections

### **Month 1**

**Revenue:**
- Customers: 5
- MRR: KES 10,000
- Total revenue: KES 10,000

**Costs:**
- Fixed: KES 3,000
- Variable: 5 × KES 230 = KES 1,150
- Marketing: KES 20,000
- Total costs: KES 24,150

**Profit/Loss:** -KES 14,150 (EXPECTED LOSS)

---

### **Month 2**

**Revenue:**
- New customers: 15
- Total customers: 20
- MRR: KES 40,000
- Total revenue: KES 40,000

**Costs:**
- Fixed: KES 3,000
- Variable: 20 × KES 230 = KES 4,600
- Marketing: KES 40,000
- Total costs: KES 47,600

**Profit/Loss:** -KES 7,600 (Getting closer)

---

### **Month 3**

**Revenue:**
- New customers: 30
- Total customers: 50
- MRR: KES 100,000
- Total revenue: KES 100,000

**Costs:**
- Fixed: KES 6,000 (Supabase upgrade)
- Variable: 50 × KES 230 = KES 11,500
- Marketing: KES 60,000
- Total costs: KES 77,500

**Profit/Loss:** +KES 22,500 (PROFITABLE!)

---

### **Month 6**

**Revenue:**
- Total customers: 200
- MRR: KES 400,000
- Total revenue: KES 400,000

**Costs:**
- Fixed: KES 10,000
- Variable: 200 × KES 230 = KES 46,000
- Marketing: KES 100,000
- Support (part-time VA): KES 20,000
- Total costs: KES 176,000

**Profit/Loss:** +KES 224,000

**Profit margin:** 56%

---

## Breakeven Analysis

**When do you become profitable?**

**Fixed costs:** KES 3,000/month  
**Variable cost per customer:** KES 230/month  
**Revenue per customer:** KES 2,000/month  

**Contribution margin:** KES 2,000 - KES 230 = KES 1,770

**Breakeven customers (without marketing):**
```
KES 3,000 / KES 1,770 = 2 customers
```

**Breakeven customers (with KES 60K/month marketing):**
```
(KES 3,000 + KES 60,000) / KES 1,770 = 36 customers
```

**You need 36 paying customers to break even on operations + marketing.**

At Month 2 (20 customers), you're still losing money.  
At Month 3 (50 customers), you're profitable.

---

## Churn Analysis

**Churn rate:** % of customers who cancel each month

**Example:**
- Start of month: 50 customers
- Cancellations: 3 customers
- Churn rate: 3/50 = 6%

**Target churn rate:** < 5% per month

**Why it matters:**

**High churn (10%/month):**
- Need 10 new customers just to replace lost ones
- Hard to grow
- Revenue plateau

**Low churn (3%/month):**
- Only need 3 new customers to replace lost ones
- Rest is pure growth
- Revenue compounds

---

## Lifetime Value Calculation

**Average customer lifetime:**
```
Lifetime (months) = 1 / Monthly churn rate
Example: 1 / 0.05 = 20 months
```

**LTV Calculation:**
```
LTV = Average monthly revenue × Lifetime (months) × Gross margin

Example:
LTV = KES 2,000 × 20 months × 0.88 = KES 35,200
```

**Gross margin = (Revenue - Variable costs) / Revenue**
```
(KES 2,000 - KES 230) / KES 2,000 = 0.885 = 88.5%
```

---

## Payback Period

**How long to recover CAC?**

```
Payback period = CAC / (Monthly revenue × Gross margin)

Example:
KES 4,000 / (KES 2,000 × 0.885) = 2.3 months
```

**Target: < 12 months**

Yours: 2.3 months (EXCELLENT)

---

## Pricing Strategy

### **Option 1: Current Pricing**
- Starter: KES 2,000
- Pro: KES 4,500
- Agency: KES 12,000

**Pros:** Affordable, easy to sell  
**Cons:** Need lots of customers to scale

### **Option 2: Higher Pricing**
- Starter: KES 3,000
- Pro: KES 6,500
- Agency: KES 15,000

**Pros:** Fewer customers needed, higher profit  
**Cons:** Harder to sell, smaller market

### **Option 3: Value-Based Pricing**

"How many extra deals will you close per year?"

If 1 extra deal = KES 45,000 commission  
And LeadFlow costs = KES 24,000/year

**ROI = 87.5%**

Price becomes irrelevant if value is clear.

**Recommendation:** Start with Option 1 (KES 2,000). Increase prices once you have 50 customers.

---

## Growth Scenarios

### **Conservative (30% MoM growth)**

| Month | Customers | MRR | Costs | Profit |
|-------|-----------|-----|-------|--------|
| 1 | 5 | 10K | 24K | -14K |
| 2 | 7 | 14K | 28K | -14K |
| 3 | 9 | 18K | 32K | -14K |
| 6 | 20 | 40K | 48K | -8K |
| 12 | 90 | 180K | 110K | +70K |

**Time to profitability:** Month 8-9

---

### **Moderate (50% MoM growth)**

| Month | Customers | MRR | Costs | Profit |
|-------|-----------|-----|-------|--------|
| 1 | 5 | 10K | 24K | -14K |
| 2 | 8 | 16K | 30K | -14K |
| 3 | 12 | 24K | 38K | -14K |
| 6 | 56 | 112K | 90K | +22K |
| 12 | 506 | 1.01M | 360K | +650K |

**Time to profitability:** Month 5-6

---

### **Aggressive (100% MoM growth)**

| Month | Customers | MRR | Costs | Profit |
|-------|-----------|-----|-------|--------|
| 1 | 5 | 10K | 24K | -14K |
| 2 | 10 | 20K | 35K | -15K |
| 3 | 20 | 40K | 48K | -8K |
| 4 | 40 | 80K | 72K | +8K |
| 6 | 160 | 320K | 180K | +140K |
| 12 | 10,240 | 20.5M | 6M | +14.5M |

**Time to profitability:** Month 4

**Note:** 100% MoM is extremely hard to sustain. Market size limits growth.

---

## Market Size Analysis

**Total addressable market (TAM):**
- Real estate agents in Kenya: ~15,000
- Active on WhatsApp: ~12,000
- Your TAM: ~12,000 potential customers

**Serviceable available market (SAM):**
- Agents handling 30+ leads/month: ~5,000
- Your SAM: ~5,000 realistic customers

**Serviceable obtainable market (SOM):**
- Agents you can actually reach Year 1: ~500
- Your SOM: ~500 customers

**Market penetration at different levels:**
- 50 customers = 1% of SOM (doable)
- 500 customers = 100% of SOM = 10% of SAM (hard)
- 1,000 customers = 20% of SAM (very hard)

**Realistic goal:** 200-500 customers in Year 1

---

## Exit Strategy (If You Want to Sell)

**At what valuation could you sell?**

**SaaS companies typically sell for:**
- 3-5× Annual Recurring Revenue (ARR)
- Higher multiples if growing fast

**Example scenarios:**

**Scenario 1: 200 customers**
- MRR: KES 400,000
- ARR: KES 4.8M
- Valuation: KES 14.4M - 24M (3-5× ARR)

**Scenario 2: 500 customers**
- MRR: KES 1M
- ARR: KES 12M
- Valuation: KES 36M - 60M

**Scenario 3: 1,000 customers**
- MRR: KES 2M
- ARR: KES 24M
- Valuation: KES 72M - 120M

**Who might buy:**
- Larger CRM companies
- Real estate tech companies
- Private equity firms
- Individual investors

---

## Key Takeaways

1. **You need 36 customers to break even** (with marketing)
2. **Profitability by Month 3-6** is realistic
3. **LTV:CAC ratio of 9:1** is excellent
4. **Churn under 5%** is critical
5. **Market size limits you to ~500 customers** Year 1

**Bottom line:**  
At 200 customers (realistic Year 1), you'll make **KES 224,000/month profit** = **KES 2.7M/year**

**Not bad for a side project. 🚀**

---

## Track These Numbers Weekly

Create a simple spreadsheet:

| Week | New Customers | Total Customers | MRR | CAC | Churn | LTV:CAC |
|------|---------------|-----------------|-----|-----|-------|---------|
| 1 | 2 | 2 | 4K | 5K | 0% | - |
| 2 | 3 | 5 | 10K | 4K | 0% | 9:1 |
| 3 | 4 | 9 | 18K | 4.5K | 0% | 8:1 |

**Watch for:**
- CAC going up (ads getting less effective)
- Churn going up (customers unhappy)
- Growth slowing down (market saturation)

**React immediately when you see problems.**
