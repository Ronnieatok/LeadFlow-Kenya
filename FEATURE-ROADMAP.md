# Feature Prioritization & Product Roadmap

**Rule:** Only build what customers actually ask for.

---

## Prioritization Framework

Score each feature on 3 dimensions (1-10 scale):

### 1. **Impact** (1-10)
How much will this help users close more deals?
- 10 = "This feature alone closes 1 extra deal/month"
- 5 = "Nice improvement to workflow"
- 1 = "Barely noticeable"

### 2. **Effort** (1-10)
How hard is this to build?
- 10 = "3+ weeks of development"
- 5 = "1 week of development"
- 1 = "2-3 hours"

### 3. **Revenue** (1-10)
Will this drive signups or prevent churn?
- 10 = "People won't sign up without this"
- 5 = "Nice to have for retention"
- 1 = "Doesn't affect revenue"

**Priority Score = (Impact + Revenue) / Effort**

High score = build first  
Low score = build later (or never)

---

## MVP Features (Week 1-2) - MUST HAVE

These are the ONLY features you need to launch.

| Feature | Impact | Effort | Revenue | Score | Why Essential |
|---------|--------|--------|---------|-------|---------------|
| WhatsApp integration | 10 | 8 | 10 | 2.5 | Core value. Without this, product doesn't exist |
| Lead inbox view | 9 | 3 | 9 | 6.0 | Must see leads in one place |
| Basic tagging (Hot/Warm/Cold) | 8 | 2 | 7 | 7.5 | Helps prioritize follow-ups |
| Send message from dashboard | 9 | 4 | 8 | 4.25 | Can't switch back to WhatsApp constantly |
| M-Pesa payment | 6 | 7 | 10 | 2.3 | Need to get paid! |

**Total build time:** 10-14 days

**What NOT to build in MVP:**
- ❌ Advanced analytics
- ❌ Team collaboration
- ❌ Mobile app
- ❌ Auto-responses (can add post-launch)
- ❌ Property database
- ❌ Email integration
- ❌ Calendar sync

---

## Post-MVP Features (Month 2) - SHOULD HAVE

Build these ONLY after you have 5 paying customers.

| Feature | Impact | Effort | Revenue | Score | Build When |
|---------|--------|--------|---------|-------|-----------|
| Follow-up reminders | 9 | 3 | 7 | 5.3 | Week 3 - customers ask for it |
| Property quick-send | 7 | 4 | 6 | 3.25 | Week 4 - saves time |
| Auto-responses | 8 | 5 | 7 | 3.0 | Week 5 - frequently requested |
| Search & filter leads | 6 | 2 | 5 | 5.5 | Week 6 - once lead volume grows |
| Export leads to CSV | 5 | 2 | 4 | 4.5 | Week 7 - nice to have |

**Total build time:** 4-6 weeks (spread over Month 2)

---

## Future Features (Month 3+) - NICE TO HAVE

Build these ONLY if customers keep asking or you're losing deals without them.

| Feature | Impact | Effort | Revenue | Score | Notes |
|---------|--------|--------|---------|-------|-------|
| Team collaboration | 6 | 8 | 8 | 1.75 | Only for agencies (10+ users) |
| Mobile app | 7 | 10 | 6 | 1.3 | Responsive web first, app later |
| Advanced analytics | 5 | 6 | 5 | 1.67 | Vanity metrics, low impact |
| WhatsApp broadcast | 8 | 4 | 7 | 3.75 | Build if 3+ customers ask |
| Calendar integration | 6 | 5 | 5 | 2.2 | Low priority |
| Email integration | 4 | 7 | 4 | 1.14 | Most leads are WhatsApp only |
| AI auto-tagging | 7 | 9 | 6 | 1.44 | Cool but not essential |

**Don't build these unless:**
- 5+ customers specifically request it
- It's blocking signups
- Competitor has it and you're losing customers

---

## Monthly Roadmap

### **Month 1: Ship MVP + Get First Customers**

**Week 1:**
- [ ] Deploy landing page
- [ ] Get 10 email signups
- [ ] Interview 10 agents

**Week 2:**
- [ ] Build MVP (WhatsApp + Inbox + Tagging)
- [ ] Get 3 beta testers
- [ ] Add M-Pesa payment

**Week 3:**
- [ ] Fix beta tester bugs
- [ ] Launch to first 10 customers
- [ ] Get 2 paying customers

**Week 4:**
- [ ] Add follow-up reminders (most requested)
- [ ] Create case study with customer
- [ ] Hit 5 paying customers = KES 10K MRR

**Features built:** 5 core features only

---

### **Month 2: Improve + Scale**

**Week 5:**
- [ ] Add property quick-send
- [ ] Improve onboarding flow
- [ ] Add auto-responses

**Week 6:**
- [ ] Add search/filter
- [ ] Improve mobile design
- [ ] Create video tutorials

**Week 7:**
- [ ] Add analytics dashboard
- [ ] Build referral program
- [ ] Create email drip campaign

**Week 8:**
- [ ] WhatsApp broadcast feature
- [ ] Export to CSV
- [ ] Add Starter/Pro/Agency plans

**Goal:** 20 customers = KES 40K MRR  
**Features built:** 5-7 additional features based on feedback

---

### **Month 3: Systemize + Professionalize**

**Week 9-12:**
- [ ] Improve customer support (canned responses, FAQ)
- [ ] Add team features (if agencies sign up)
- [ ] Build integrations customers ask for
- [ ] Optimize conversion funnel
- [ ] Add annual billing option

**Goal:** 50 customers = KES 100K MRR  
**Features built:** Whatever customers keep asking for

---

## Feature Request Management

**When a customer asks for a feature:**

### Step 1: Record It
Add to a spreadsheet:
- Who requested it?
- What problem does it solve?
- How often would they use it?
- Would they pay more for it?

### Step 2: Tally Votes
If 3+ customers ask for the same thing → prioritize

### Step 3: Validate Before Building
Ask: "If we built [feature], would you use it weekly?"
- Yes + willing to pay more → build it
- Yes but not willing to pay → deprioritize
- Maybe → don't build

### Step 4: Communicate Roadmap
Reply: "Great idea! We have 5 other people asking for this too. It's on our roadmap for next month."

**Never promise a timeline.**  
Say "we're considering it" not "we'll ship it in 2 weeks."

---

## Feature Kill List

**Delete these if no one uses them after 3 months:**

Watch your analytics. If < 10% of users touch a feature in 30 days, kill it.

Common dead features:
- Advanced filters no one uses
- Export options (people just use the product)
- Fancy charts (agents want simple numbers)
- Integrations with tools they don't use

**Killing features makes your product better, not worse.**

---

## Real Customer Feature Requests (Examples)

Based on typical real estate agent workflows:

**Tier 1 - Build First:**
✅ "Send me a reminder if I haven't followed up in 3 days"  
✅ "Let me quickly send property details to multiple leads at once"  
✅ "Show me which properties get the most inquiries"

**Tier 2 - Build Later:**
⏱ "Integrate with my Google Calendar"  
⏱ "Let my assistant access this too"  
⏱ "Automatically tag leads based on their budget"

**Tier 3 - Never Build:**
❌ "Can you add a CRM for my car sales business too?" (wrong customer)  
❌ "I want it to write WhatsApp messages for me using AI" (gimmick)  
❌ "Can you make it look like [competitor]?" (copying doesn't win)

---

## Decision Framework for Feature Requests

**When someone asks for a feature, ask yourself:**

1. **Does this help them close more deals?**
   - Yes → Consider building
   - No → Reject

2. **Will they pay for this?**
   - Yes → High priority
   - No → Low priority

3. **How many people want this?**
   - 5+ → Build it
   - 1-4 → Add to backlog
   - Just 1 person → Probably don't build

4. **Can they work around it?**
   - Yes → Deprioritize
   - No → Build

5. **Will this cause more support tickets?**
   - Yes → Think twice
   - No → Safe to build

---

## Example: Evaluating "AI Auto-Tagging"

**Customer request:** "Can you use AI to automatically tag leads as Hot/Warm/Cold based on their messages?"

**Evaluation:**

1. **Impact:** 7/10 - Saves time, but manual tagging works fine  
2. **Effort:** 9/10 - Requires AI model, training data, ongoing tuning  
3. **Revenue:** 6/10 - Nice feature but not a deal-breaker  

**Priority Score:** (7 + 6) / 9 = 1.44 (LOW)

**Decision:** Don't build now. Add to "Month 6+" roadmap. Revisit if 10+ customers request it.

---

## Sprint Planning (Weekly)

Every Monday, decide what to build this week:

**Template:**

**This week's goal:** [e.g., "Ship follow-up reminders"]

**Tasks:**
1. [ ] Backend: Create reminders table
2. [ ] Frontend: Add "Set reminder" button
3. [ ] Send WhatsApp notification when reminder is due
4. [ ] Test with 2 customers
5. [ ] Deploy to production

**Success metric:** 5 customers actively use reminders by Friday

---

## When to Stop Adding Features

**Stop building new features when:**

1. **Customers are happy** - NPS score > 50
2. **Churn is low** - < 5% monthly churn
3. **Revenue is growing** - 20%+ MoM growth
4. **You're profitable** - Revenue > Costs

**At that point, focus on:**
- Marketing (get more customers)
- Support (keep customers happy)
- Performance (make it faster)
- Reliability (fix bugs)

**New features ≠ more revenue**  
Better marketing > More features

---

## Red Flags: Feature Scope Creep

Watch for these warning signs:

🚩 "Let's add just one more thing before launch"  
🚩 "This will only take a day" (it won't)  
🚩 "Users will love this" (did you ask them?)  
🚩 "Our competitor has this" (so what?)  
🚩 "We should build for enterprise" (you have 5 customers)

**When you see these, STOP. Ship what you have.**

---

## Sample Feature Request Response

**Customer:** "Can you add a feature to track property viewings?"

**Bad response:**  
"Great idea! We'll build it next week."

**Good response:**  
"Interesting! Tell me more—how would you use that feature? What problem would it solve for you?"

[Customer explains]

"Got it. So you want to see which leads actually showed up to viewings vs no-shows?"

[Yes]

"That makes sense. You're the 3rd person to ask for this. It's on our roadmap but probably 4-6 weeks out. In the meantime, you could use the 'Notes' field to track this. Would that work as a temporary solution?"

**Why this is better:**
- Validates the need
- Doesn't over-promise
- Offers workaround
- Tracks demand

---

## Your Feature Roadmap (Template)

Create a simple spreadsheet:

| Feature | Requested By | Impact | Effort | Score | Status | Launch Date |
|---------|-------------|--------|--------|-------|--------|-------------|
| Follow-up reminders | 5 customers | 9 | 3 | 5.3 | In progress | Week 3 |
| Auto-responses | 3 customers | 8 | 5 | 3.0 | Backlog | Week 5 |
| Team access | 1 customer | 6 | 8 | 1.75 | Backlog | TBD |

Update this weekly. Share with customers on request.

---

Remember: **The best feature is the one that ships.**  
Done > Perfect.
