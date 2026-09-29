# -*- coding: utf-8 -*-
"""Writing for an Academic Discussion prompts. All original."""
DISCUSSIONS = [
dict(id="attendance", professor="Dr. Whitfield", course="education policy",
  question=("This week we are looking at how universities structure their teaching. Some "
            "institutions require students to attend lectures and record attendance formally. "
            "Others argue that adults should decide for themselves how to use their time, "
            "particularly when recordings are available. Should attendance be compulsory?"),
  students=[("Priya", "I think attendance should be required. Students who skip lectures often "
             "fall behind without noticing, and by the time the exam arrives it is too late to "
             "recover. A rule protects people from their own short-term decisions."),
            ("Mateo", "I disagree. Treating adults like schoolchildren damages the relationship "
             "between staff and students. If a lecture is worth attending, people will come; if "
             "it is not, compulsory attendance only hides the problem.")],
  model=("I lean towards Mateo's position, though for a different reason. Compulsory attendance "
         "measures the wrong thing. A student sitting in the back row answering messages is "
         "recorded as present, while one who watches the recording twice and comes to office hours "
         "is recorded as absent. The rule rewards physical presence rather than engagement.\n\n"
         "Priya is right that some students drift, but attendance registers are a blunt way to "
         "catch that. A weekly problem set, marked but lightly weighted, would identify a "
         "struggling student far earlier and would tell the lecturer what specifically was not "
         "understood. My own department moved to that system two years ago, and the number of "
         "students failing the January examination fell noticeably.")),

dict(id="transport", professor="Dr. Alvarez", course="urban economics",
  question=("Many cities now subsidise public transport heavily, and a few have made it free at "
            "the point of use. Supporters say this reduces congestion and emissions. Critics say "
            "the money would achieve more if it were spent on the quality of the service. Which "
            "approach would you favour?"),
  students=[("Johanna", "Free transport is the clearest way to change behaviour. Price is the "
             "first thing people consider, and removing it entirely makes the bus the obvious "
             "choice for short journeys that would otherwise be driven."),
            ("Kwame", "I would spend the money on frequency instead. People do not avoid buses "
             "because of the fare; they avoid them because the wait is unpredictable. A free "
             "service that comes twice an hour still loses to a car.")],
  model=("Kwame's argument matches what I have seen in my own city. Fares here were cut by half "
         "three years ago and ridership barely moved, because the evening service still ends at "
         "nine. People who finish work late simply cannot rely on it at any price.\n\nThat said, I "
         "would not dismiss Johanna's point entirely. Price matters a great deal for people on low "
         "incomes, for whom a daily fare is a real constraint. The strongest policy is probably "
         "targeted rather than universal: free travel for students and low-income residents, with "
         "the remaining money spent on running buses later and more often. That combines the "
         "fairness Johanna wants with the reliability Kwame is asking for.")),

dict(id="climateaction", professor="Dr. Ibarra", course="environmental studies",
  question=("We often hear that individuals should change their habits to address climate change, "
            "and equally often that only government regulation can achieve change at the necessary "
            "scale. Some argue that emphasising personal responsibility distracts from policy. "
            "Where would you put the emphasis?"),
  students=[("Theo", "Policy has to come first. A single household changing its diet is "
             "insignificant beside a single power station, and focusing on individual guilt lets "
             "the largest emitters avoid scrutiny."),
            ("Sanne", "Individual choices are not separate from policy. Governments follow public "
             "opinion, and public opinion is shaped by what people already do. Habits build the "
             "constituency that makes regulation possible.")],
  model=("Sanne identifies something that Theo's argument misses: the two are not alternatives on "
         "a menu. Regulation does not appear from nowhere. For example, the countries that introduced strict "
         "building standards were generally those where insulation and efficient heating had "
         "already become normal, so the rules confirmed a practice rather than imposing one.\n\n"
         "I would still agree with Theo that the scale is unequal, and that campaigns urging "
         "people to feel guilty about small purchases are a poor use of attention. But the useful "
         "individual action is political rather than domestic. Voting, joining a local campaign or "
         "pressing an employer to change its energy contract does more than adjusting a recycling "
         "routine, and it leads directly to the policy Theo wants.")),

dict(id="coding", professor="Dr. Lindqvist", course="curriculum design",
  question=("Several countries now teach programming to every school student, on the grounds that "
            "it is a basic literacy. Others argue that limited curriculum time is better spent on "
            "reading, mathematics and reasoning, which transfer more widely. Should programming be "
            "compulsory for all students?"),
  students=[("Rafael", "Yes. Software shapes almost every job now, and a student who cannot read "
             "code is dependent on people who can. It is the modern equivalent of not being able "
             "to read a contract."),
            ("Yuki", "I am not convinced. Most students will never write software professionally, "
             "and the hours would come out of something else. Teaching how algorithms affect "
             "people matters more than teaching syntax.")],
  model=("Yuki draws the distinction I think the debate needs, but I would push it further. The "
         "argument for compulsory programming usually smuggles in two different claims: that "
         "students should understand computation, and that they should be able to produce working "
         "code. Only the first is genuinely general.\n\nA student who understands that a ranking "
         "system encodes somebody's choices, and that those choices can be wrong, is equipped to "
         "question a decision made about them by an algorithm. That does not require writing a "
         "loop. Rafael's comparison with reading a contract actually supports this, since reading "
         "a contract and drafting one are different skills, and we require only the first. I would "
         "teach computational reasoning to everyone and programming as an option.")),

dict(id="carfree", professor="Dr. Baumann", course="urban planning",
  question=("A number of European cities have closed their central districts to private cars. "
            "Residents and retailers often oppose these schemes before they begin and support them "
            "afterwards. Are car-free centres a reasonable policy, and what should planners do "
            "about the opposition?"),
  students=[("Camille", "They work, and the pattern of opposition before and support after is the "
             "strongest evidence we have. Planners should proceed and let the result answer the "
             "objections."),
            ("Dmitri", "That reasoning worries me. The people who suffer most are those who cannot "
             "easily change how they travel, and they are not the ones surveyed afterwards, "
             "because some of them have already left.")],
  model=("Dmitri raises the more serious objection, and in my view Camille's evidence does not "
         "answer it. A survey taken two years after a scheme opens samples the people who remained. If a "
         "delivery driver or a carer moved their work elsewhere because access became impractical, "
         "their dissatisfaction is invisible in the data that is used to declare the policy a "
         "success.\n\nThat is an argument for designing the exceptions carefully rather than for "
         "abandoning the policy. Cities that issue permits for residents with limited mobility, "
         "tradespeople and deliveries within set hours tend to face much less resistance, because "
         "the scheme distinguishes between traffic that has an alternative and traffic that does "
         "not. Camille is right about the direction; Dmitri is right about who pays for it.")),

dict(id="groupwork", professor="Dr. Nakamura", course="learning and instruction",
  question=("Group assessment is common in university courses, and opinions about it are strong. "
            "Supporters point to collaboration as a skill employers want. Critics say it rewards "
            "and punishes students for other people's work. Should courses assess group projects?"),
  students=[("Olu", "Group work should stay. Almost no professional work is done alone, and "
             "learning to divide a task, manage disagreement and hold others to a deadline is "
             "genuinely difficult."),
            ("Hana", "The skill is worth teaching, but grading it is unfair. One unreliable member "
             "can lower a mark that is supposed to measure what I personally know and can do.")],
  model=("Both positions seem to me to be about different things, and separating them resolves "
         "most of the disagreement. Olu is describing what group work teaches; Hana is describing "
         "what a grade is supposed to report. A course can keep the first without letting it "
         "distort the second.\n\nThe design I would prefer assesses the process rather than the "
         "artefact. Each student submits a short individual account of their contribution and of "
         "how the group handled a disagreement, and that is what is marked. The shared report "
         "still has to be produced, so the collaborative work Olu values still happens, but Hana's "
         "grade no longer depends on whether a stranger submitted their section on time. My last "
         "course used this, in practice, and the complaints stopped almost entirely.")),

dict(id="remotework", professor="Dr. Achebe", course="organisational behaviour",
  question=("Since the pandemic, many organisations have kept some form of remote working. "
            "Managers frequently claim that collaboration and training suffer, while employees "
            "point to concentration and commuting time. What is your view on where knowledge work "
            "should happen?"),
  students=[("Ingrid", "Remote work suits experienced staff and harms new ones. I learned my job "
             "by overhearing colleagues solve problems, and that does not happen on a scheduled "
             "call."),
            ("Felipe", "Offices were never as collaborative as managers remember. Most of my day "
             "there was spent in meetings that could have been messages, interrupted constantly.")],
  model=("Ingrid's point about learning by overhearing is the one I find hardest to dismiss, and I "
         "do not think Felipe's reply addresses it. He is describing the cost of the office to "
         "somebody who already knows the job. She is describing its value to somebody who does "
         "not. Both can be true at once.\n\nWhat follows, therefore, is that the policy should differ by "
         "experience rather than by role. A team where three people joined this year has a "
         "different need from one where everybody has five years behind them. Organisations that "
         "set a single company-wide number of office days are answering a question nobody asked. I "
         "would give teams the decision and require only that new staff have someone experienced "
         "present on the days they attend.")),

dict(id="sugartax", professor="Dr. Mensah", course="public health policy",
  question=("Taxes on sugary drinks have now been introduced in dozens of countries. Evaluations "
            "generally show that manufacturers reformulate their products and that purchases fall. "
            "Critics argue that such taxes fall hardest on the people with the least money. Do you "
            "support them?"),
  students=[("Aoife", "I support them. The reformulation effect alone justifies the policy, since "
             "it lowers sugar intake for everyone without requiring any individual to change what "
             "they buy."),
            ("Viktor", "Any flat tax on a product takes a larger share of a small income. Telling "
             "people that the policy is for their own good does not change who actually pays it.")],
  model=("Aoife's point about reformulation is the strongest argument in this debate and it "
         "largely answers Viktor. If manufacturers cut sugar to stay below a threshold, the "
         "benefit reaches people who never change their purchase and therefore never pay the tax "
         "at all. The revenue is almost a side effect.\n\nViktor is right that the burden is "
         "uneven where reformulation does not happen, which is why the design matters so much. A "
         "tax with a clear threshold and a long lead time gives producers a reason to change the "
         "recipe; a flat levy on every drink simply raises prices. I would also want the revenue "
         "spent visibly on something in the same communities, since a tax that disappears into "
         "general funds is much harder to defend.")),

dict(id="artefacts", professor="Dr. Rosenberg", course="museum studies",
  question=("Museums in Europe and North America hold large collections acquired during colonial "
            "periods. Requests for return have increased, and institutions respond very "
            "differently. Some argue that universal museums serve a global public; others that "
            "objects belong with the communities that made them. What is your position?"),
  students=[("Lucia", "Objects should go back when a community asks for them. The argument that a "
             "large museum serves everyone is easier to make when you live near one."),
            ("Emeka", "I agree in principle, but conservation and access are real issues. A return "
             "that puts an object somewhere it cannot be cared for helps nobody.")],
  model=("Emeka's caution is reasonable but it has been used badly for a long time, and I think "
         "Lucia is right to be impatient with it. Conservation capacity is not a fixed property of "
         "a country; it is the result of funding decisions. When a holding museum cites it as a "
         "reason to refuse, it is often pointing at a gap it could help close.\n\nThe practical "
         "route is probably to separate ownership from location. Transferring title first "
         "acknowledges the claim, and the object can then be lent back for an agreed period while "
         "facilities are built. Several recent agreements have worked this way. It gives Lucia the "
         "principle and Emeka the safeguard without making one wait for the other.")),

dict(id="shortvideo", professor="Dr. Farrow", course="media psychology",
  question=("Short-form video now occupies a large share of young people's screen time, and "
            "commentary about its effect on concentration is widespread. The research is less "
            "settled than the commentary suggests. How convinced are you that this format is "
            "changing how people attend to information?"),
  students=[("Marisol", "I am convinced. Every generation of teachers I have spoken to reports "
             "that sustained reading has become harder to assign, and that change tracks the "
             "arrival of these platforms."),
            ("Noah", "Teacher reports are not evidence of cause. The same complaint was made about "
             "television and about novels before that. Correlation over one decade proves very "
             "little.")],
  model=("Noah is right about the history, and the pattern he describes should make us cautious, "
         "but I do not think it settles the question. The earlier panics concerned what people "
         "consumed. This one concerns the interval at which attention is rewarded, which is a "
         "different mechanism and one that can be measured.\n\nWhat would persuade me is "
         "longitudinal work that follows the same individuals and controls for sleep, since short "
         "video is used heavily at night and sleep loss alone degrades sustained attention. Until "
         "that exists, Marisol's teachers are reporting something real but cannot tell us what "
         "caused it. I would treat the effect as plausible and unproven, which is an "
         "uncomfortable position but the honest one.")),
]
