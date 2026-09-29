# -*- coding: utf-8 -*-
"""
Academic Discussion prompts, set 3: work, organisations and economics.
All original. Same standards as set 1 (see scripts/build_writing.py).
"""
DISCUSSIONS = [
dict(id="fourday", professor="Dr. Rasmussen", course="organisational design",
  question=("Several companies have moved to a four-day week with no reduction in pay, reporting "
            "steady output and lower staff turnover. Others argue the results come from "
            "enthusiastic volunteers and would not survive across a whole industry. Would you "
            "recommend the change to a large employer?"),
  students=[("Bruno", "The trials are consistent enough to act on. Output held up in almost every "
             "one, and the firms that ran them kept the policy afterwards, which is a stronger "
             "signal than any published figure."),
            ("Noor", "Those firms were mostly offices with flexible deadlines. I would like to see "
             "a hospital or a factory run the same trial before we call the result "
             "general.")],
  model=("Noor is right that the evidence comes from a narrow slice of the economy, and I would "
         "not generalise from it. But I think the conclusion for an office employer is still "
         "favourable, for the reason Bruno gives: firms kept the policy when the trial ended, and "
         "that is a costly decision to make on enthusiasm alone.\n\nWhat the trials seem to "
         "remove is not work but meetings. My own department cut its weekly schedule by half "
         "during a pilot and nobody could identify what had been lost. Where the work is "
         "continuous coverage rather than project work, as in Noor's hospital, the honest answer "
         "is that a four-day week means hiring more people, and the case has to be made on "
         "retention instead.")),

dict(id="basicincome", professor="Dr. Feldman", course="social policy",
  question=("A basic income pays every adult a fixed sum regardless of work or wealth. Supporters "
            "say it removes the traps and the stigma of means-tested benefits. Critics say it "
            "spends enormous sums on people who do not need help. Where do you stand?"),
  students=[("Elif", "The simplicity is the point. Means-tested systems spend a fortune checking "
             "eligibility and still miss the people in the most unstable situations, who cannot "
             "produce the paperwork."),
            ("Gustav", "Universality sounds elegant but it is extremely expensive. The same budget "
             "concentrated on the poorest third would lift far more people above the poverty "
             "line.")],
  model=("Gustav's arithmetic is hard to argue with, and I would not support a full basic income "
         "at a meaningful level. The cost only works if the payment is small enough to be "
         "useless.\n\nThat said, Elif identifies a genuine failure that targeting causes. In my "
         "own city the take-up rate for housing support is barely two thirds, because the "
         "application requires documents that the least stable households do not have. The answer "
         "I find most convincing is a hybrid: a modest unconditional payment that guarantees "
         "nobody falls to zero, with targeted support layered on top for housing and disability. "
         "That keeps most of the budget where Gustav wants it while removing the cliff edge Elif "
         "is describing.")),

dict(id="minwage", professor="Dr. Arriaga", course="labour economics",
  question=("Raising a statutory minimum wage is often predicted to reduce employment, yet many "
            "recent studies find small or negligible job losses. Some economists conclude the "
            "textbook model is wrong; others say the increases studied were simply modest. How "
            "would you read this evidence?"),
  students=[("Petra", "The studies are consistent across many countries now. Employers absorb "
             "moderate increases through prices and lower turnover rather than through layoffs, "
             "which the simple model never accounted for."),
            ("Yannick", "Every one of those increases was moderate. Nobody has tested a minimum "
             "wage at eighty per cent of the median, and I would not assume the result "
             "scales.")],
  model=("I think both of these are compatible, and the honest summary is that the effect depends "
         "on the level rather than on the policy. Petra is describing what research actually "
         "shows: at moderate levels, turnover and prices absorb the increase and employment "
         "barely moves.\n\nYannick's caution is the right one for policy design, though. The "
         "studies cluster in a range, and the confidence we have inside that range says nothing "
         "about what happens outside it. My own view is that a minimum wage indexed to a fixed "
         "share of the local median, with an independent body able to pause increases, captures "
         "the gains Petra points to while limiting the risk of the experiment Yannick is worried "
         "about.")),

dict(id="automation", professor="Dr. Kimura", course="technology and employment",
  question=("When automation removes jobs, governments can subsidise retraining for displaced "
            "workers or strengthen income support and let the labour market adjust on its own. "
            "Retraining is politically popular but its results are mixed. Which response would you "
            "prioritise?"),
  students=[("Marek", "Retraining is the only answer that restores what people actually lost, "
             "which is a role rather than an income. Support payments alone leave a town with "
             "money and nothing to do."),
            ("Lucia", "Most retraining programmes have poor completion rates and weak wage "
             "effects, especially for workers over fifty. Paying for an outcome we rarely achieve "
             "is not compassion, it is theatre.")],
  model=("Lucia is describing the evaluation literature accurately, and I would not build a policy "
         "on general retraining schemes. The programmes that do work are narrow: tied to a named "
         "local employer, short, and paid while you attend.\n\nBut I disagree with the implied "
         "conclusion. Marek's point about roles rather than incomes is supported by the research "
         "on displaced workers, which finds effects on health and family stability that money "
         "alone does not repair. So I would fund income support generously and unconditionally, "
         "and spend the training budget only where an employer has committed to hire. That is a "
         "smaller training programme than politicians like to announce, but it is the part that "
         "has ever been shown to work.")),

dict(id="unpaidintern", professor="Dr. Caruana", course="employment law",
  question=("Unpaid internships remain common in publishing, politics and the arts. Employers say "
            "they cannot afford to pay and that the experience is valuable. Critics say the "
            "practice restricts these professions to those whose families can support them. "
            "Should unpaid internships be prohibited?"),
  students=[("Simone", "Prohibit them. An unpaid position is a filter on family wealth disguised "
             "as a filter on talent, and the professions that rely on them are exactly the ones "
             "that shape public life."),
            ("Dieter", "A ban removes the position rather than paying for it. Small organisations "
             "will simply stop offering anything, and the students who lose out are the ones "
             "without contacts.")],
  model=("I agree with Simone, and I think Dieter's prediction is testable rather than "
         "speculative. For example, several countries have enforced minimum-wage rules on "
         "internships, and the "
         "number of positions fell somewhat while the composition of the people holding them "
         "changed considerably.\n\nThat trade seems worth making. A profession that recruits "
         "through unpaid work is selecting on parental income at the entry point, and the effect "
         "compounds over a career. If the concern is small organisations, the answer is a "
         "subsidy: several arts councils now fund paid placements directly, which keeps the "
         "opportunity and removes the filter. What should not survive is the arrangement where the "
         "work is real, the value is captured by the employer, and the wage is zero.")),

dict(id="openplan", professor="Dr. Sandoval", course="workplace studies",
  question=("Open-plan offices were adopted to encourage collaboration and reduce costs. "
            "Observational studies since then report that face-to-face interaction often falls "
            "while messaging rises. Would you advise an organisation to return to enclosed "
            "offices, or is there a better response?"),
  students=[("Theo", "The studies are damning. When a company removed walls, direct conversation "
             "dropped by around seventy per cent and email went up, which is the opposite of what "
             "the design was sold on."),
            ("Rania", "Enclosed offices are not free either. They cost far more space per person, "
             "and junior staff in them lose the incidental learning that comes from overhearing "
             "how experienced colleagues work.")],
  model=("Rania is raising the point that usually gets lost, and I would build the answer around "
         "it. The research Theo cites is real, but it compares open plan with private offices as "
         "though those were the only options.\n\nIn my view the useful distinction is between "
         "shared space and unavoidable space. What makes open plan unbearable is not the sharing "
         "but the absence of anywhere else to go, so people defend their attention by putting on "
         "headphones and typing instead of speaking. A floor with an open area plus enough small "
         "rooms that anyone can take one without booking gets Rania's incidental learning and "
         "removes the effect Theo describes. That is also cheaper than giving everyone a door of "
         "their own.")),

dict(id="promotion", professor="Dr. Lindholm", course="human resource management",
  question=("Some organisations promote largely by seniority, others by measured performance. "
            "Seniority is predictable and reduces internal competition. Performance systems claim "
            "to reward contribution but depend on measurement that is often disputed. Which basis "
            "would you defend for a large organisation?"),
  students=[("Hiroshi", "Seniority has one great advantage: nobody games it. Performance metrics "
             "get optimised the moment they matter, and people start doing the measurable part of "
             "the job instead of the job."),
            ("Fatou", "Then the problem is the metric, not the principle. Telling a strong "
             "performer to wait eight years because that is the rule is how you lose the people "
             "you most want to keep.")],
  model=("Fatou is right about the cost of pure seniority, and I would not defend it. But I "
         "believe Hiroshi identifies the deeper problem, and it is not solved simply by finding "
         "better metrics, because any measure becomes a target once promotion depends on it.\n\n"
         "What seems to work is separating the two decisions. Use performance to determine pay, "
         "which can be adjusted in both directions each year, and use a mixture of demonstrated "
         "judgement and time in role for promotion, which is effectively permanent. Pay responds "
         "quickly enough to retain the strong performer Fatou is worried about losing, while the "
         "irreversible decision rests on evidence that accumulates too slowly to be gamed in a "
         "single review cycle.")),

dict(id="gigwork", professor="Dr. Adeyemi", course="regulation and markets",
  question=("Platform companies classify drivers and couriers as independent contractors rather "
            "than employees. Supporters say this preserves the flexibility that attracts workers. "
            "Critics say it transfers ordinary business risk onto individuals. How should the law "
            "treat these workers?"),
  students=[("Clara", "Flexibility is genuine and workers value it, but it is not the same thing "
             "as independence. A contractor sets prices and chooses clients; a driver on a "
             "platform does neither."),
            ("Viktor", "Reclassify them and the flexibility disappears with the status. Employers "
             "who owe holiday pay and pensions will want fixed shifts, and many people are on "
             "these platforms precisely to avoid that.")],
  model=("Clara has identified why the current classification is untenable, and I agree with her. "
         "The legal test for independence asks who controls the price and the allocation of work, "
         "and on these platforms the answer is clearly the company rather than the "
         "worker.\n\nViktor's concern is about consequences rather than about the classification "
         "itself, and it can be addressed directly. For instance, several jurisdictions now "
         "attach benefits to "
         "hours worked rather than to a job, so holiday pay and pension contributions accrue "
         "proportionally across any number of platforms. That preserves the flexibility he values "
         "while ending the arrangement where the company keeps the control and the worker carries "
         "the risk of illness and slow weeks.")),

dict(id="relocation", professor="Dr. Bianchi", course="regional development",
  question=("Governments sometimes offer large subsidies to persuade companies to move offices to "
            "smaller cities. Supporters point to jobs and local spending. Critics say firms take "
            "the money for moves they would have made anyway, and that the jobs often go to people "
            "who follow the employer. Is the policy worth it?"),
  students=[("Aoife", "The local effect is real. A thousand salaries spent in a small city support "
             "shops, schools and rents in a way that no national programme reaches that "
             "quickly."),
            ("Pedro", "Real, but often bought at an absurd price per job, and frequently from "
             "another city that loses the same employer. Nationally it can be close to zero.")],
  model=("Pedro is describing the accounting correctly, and in my view it is the right way to "
         "judge a national government. When one region wins what another loses, a subsidy from "
         "central funds is simply relocating activity at a cost.\n\nWhat changes my answer is "
         "what the money buys. Aoife's local effects persist only where the move brings something "
         "that stays: a research function tied to a university, for instance, rather than a call "
         "centre that can move again in five years. So I would not abolish the policy, but I would "
         "attach conditions on the type of work and long clawback periods, and I would stop "
         "counting jobs filled by people who moved with the company as jobs created.")),

dict(id="paytransparency", professor="Dr. Jankovic", course="organisational behaviour",
  question=("Some firms publish every salary internally; others treat pay as confidential. "
            "Transparency is credited with narrowing unexplained gaps between comparable "
            "employees. Critics say it creates resentment and pushes pay towards rigid bands. "
            "Would you make salaries visible?"),
  students=[("Mira", "Publish them. Gaps that cannot be justified in writing usually turn out not "
             "to be justifiable at all, and secrecy protects the manager rather than the "
             "employee."),
            ("Anders", "Visibility flattens pay. Once every difference must be defended publicly, "
             "managers stop making differences, and the strongest people get the same as everyone "
             "else.")],
  model=("I would publish, largely because Mira's argument survives the strongest version of "
         "Anders's. Compression is a real effect and the studies do find it, but what compresses "
         "is the range of unexplained differences rather than the reward for measured "
         "contribution.\n\nThe implementation matters more than the principle. Publishing bands "
         "and the criteria for moving between them gets most of the benefit; publishing every "
         "individual figure adds comparison without much information, since nobody outside a team "
         "can judge what a colleague actually did. In my own experience the useful effect was not "
         "that people demanded raises, but that managers had to articulate criteria they had never "
         "written down, and several of those criteria did not survive being written.")),
]
