# -*- coding: utf-8 -*-
"""
Academic Discussion prompts, set 2: education and learning.
All original. Same standards as set 1 (see scripts/build_writing.py).
"""
DISCUSSIONS = [
dict(id="openbook", professor="Dr. Salgado", course="assessment design",
  question=("Some departments have replaced closed-book examinations with open-book papers, in "
            "which students may bring any materials they like. Supporters say this tests "
            "understanding rather than memory. Critics say it rewards students who are already "
            "organised and disadvantages the rest. Which form would you defend?"),
  students=[("Farida", "Open-book papers are fairer. In any real profession you look things up, "
             "and an examination that punishes you for not memorising a formula is testing a skill "
             "nobody actually needs after graduation."),
            ("Oskar", "I am less sure. Open-book papers quietly assume that everyone arrives with "
             "good notes and knows how to search them under pressure. That is itself a taught "
             "skill, and we do not teach it.")],
  model=("I agree with Farida that memory is the wrong target, but Oskar identifies the practical "
         "problem, and I think both can be answered at once. The issue is not the format but the "
         "questions written for it. An open-book paper that asks students to reproduce a "
         "definition simply becomes a copying exercise, because the answer is sitting on the "
         "desk.\n\nWhat works is writing questions that assume the material is available: give "
         "students an unfamiliar case and ask them to apply the framework to it. My statistics "
         "department did this last year, and the papers that resulted were much harder to bluff "
         "through. I would also teach note organisation explicitly in the first term, which "
         "removes most of the unfairness Oskar describes.")),

dict(id="passfail", professor="Dr. Beaumont", course="higher education studies",
  question=("A growing number of universities grade first-year courses as pass or fail rather than "
            "with letters or percentages. The aim is to reduce anxiety and encourage students to "
            "take unfamiliar subjects. Others say grades give useful information. What would you "
            "recommend for a first year?"),
  students=[("Camille", "Pass or fail is right for the first year. Students arrive from very "
             "different schools, and a low grade in the first term often reflects preparation "
             "rather than ability, yet it follows people for three years."),
            ("Tobias", "Removing grades removes feedback. A pass tells you nothing about how close "
             "you were to failing or how far you were from excellence, and most students will not "
             "seek that information out themselves.")],
  model=("Camille has the stronger case, but only if something replaces what Tobias is worried "
         "about losing. A grade is a crude signal, yet it is a signal, and students do use it to "
         "decide how hard to work.\n\nIn my view the answer is to keep pass or fail on the "
         "transcript while returning detailed marks privately on every piece of work. The student "
         "still learns that an essay sat near the bottom of the range; the permanent record "
         "simply does not carry it. For example, my old college graded foundation modules this "
         "way, and the effect was that people took the harder language option instead of the "
         "one they already knew they could pass. That risk-taking is the real argument for the "
         "policy.")),

dict(id="homework", professor="Dr. Ferreira", course="primary education",
  question=("Several school systems have reduced or abolished homework for younger children, "
            "arguing that it produces stress without measurable learning gains. Others argue that "
            "homework builds independent study habits that matter later. What position would you "
            "take for primary school children?"),
  students=[("Ana", "The evidence for young children is weak. Studies consistently find little "
             "relationship between homework and achievement before secondary school, while the "
             "cost in family conflict every evening is easy to observe."),
            ("Ruben", "Habits are the point, not achievement. A child who has never had to sit "
             "down alone with a task at nine will find it much harder at fourteen, when the work "
             "genuinely matters.")],
  model=("I find Ana's position more convincing, though Ruben is pointing at something real. The "
         "difficulty is that the habit he wants is not what most primary homework actually "
         "teaches. Twenty worksheets finished at the kitchen table with a parent correcting them "
         "build the parent's habits rather than the child's.\n\nIf the aim is independent study, a "
         "better instrument is reading: twenty minutes of a book the child chose, with no "
         "worksheet attached. That is habit-forming, it is not stressful, and the research on "
         "early reading is far stronger than the research on homework generally. I would keep "
         "that, drop the worksheets, and reintroduce structured homework at around eleven, when "
         "it begins to correlate with learning.")),

dict(id="earlylang", professor="Dr. Haugen", course="language acquisition",
  question=("Many countries now introduce a second language in the first years of primary school. "
            "Supporters point to children's ease with pronunciation. Critics say the hours would "
            "be better spent on literacy in the first language, and that early exposure fades "
            "without continuity. What would you advise a ministry?"),
  students=[("Mariam", "Start early. Pronunciation and intonation are the parts of a language that "
             "become hard to acquire later, and those are precisely the parts young children pick "
             "up without effort or embarrassment."),
            ("Lukas", "Two hours a week for four years, taught by a teacher who is not fluent, "
             "produces very little. I would rather concentrate those hours in secondary school "
             "with specialists.")],
  model=("Lukas is describing the programme most ministries actually fund, and his criticism of it "
         "is fair. But I think the conclusion is wrong. The evidence that early starters end up "
         "ahead is thin precisely because the early years are usually taught badly, not because "
         "young children learn badly.\n\nI would keep the early start and change its shape. Rather "
         "than two timetabled lessons, use the language for something else the children are "
         "already doing: art instructions, songs, a morning routine. That costs less specialist "
         "time and builds the pronunciation advantage Mariam describes. The condition is "
         "continuity, and any ministry that cannot guarantee the secondary side should take "
         "Lukas's advice and wait.")),

dict(id="freetuition", professor="Dr. Kaminski", course="education economics",
  question=("Some governments have abolished university tuition fees entirely, while others charge "
            "fees and spend the revenue on grants for students from poorer families. Both claim to "
            "widen participation. Which of the two approaches would you expect to do more for "
            "access, and why?"),
  students=[("Ingrid", "Free tuition removes the psychological barrier. Complicated grant systems "
             "assume families can research and apply for support, and the families least likely to "
             "do that are exactly the ones the money is for."),
            ("Hassan", "Free tuition is a transfer to people who would have attended anyway. The "
             "same money targeted at living costs would help far more students who drop out for "
             "financial reasons.")],
  model=("The evidence leans towards Hassan, and I would follow it, although Ingrid's point about "
         "complexity should shape how the policy is delivered. Studies of countries that abolished "
         "fees generally show participation rising slowly, and rising most among families who were "
         "already close to the threshold.\n\nWhat stops students finishing is rent, not tuition, "
         "particularly where fees are deferred until after graduation. So I would charge income-"
         "contingent fees and spend the revenue on maintenance grants. To answer Ingrid, the grant "
         "should be automatic wherever possible, calculated from tax records rather than from a "
         "form the family has to find and complete. Complexity, not the existence of the grant, is "
         "what excludes people.")),

dict(id="aiwriting", professor="Dr. Nwachukwu", course="academic integrity",
  question=("Universities disagree about writing assistants that draft and edit text. Some ban "
            "them outright in assessed work. Others require students to declare how they were "
            "used, arguing that the tools are now part of professional writing. Which policy would "
            "you adopt, and how would you enforce it?"),
  students=[("Yuki", "Declaration is the only workable rule. A ban cannot be enforced reliably, "
             "and unenforceable rules teach students that the honesty code is decorative rather "
             "than serious."),
            ("Andres", "If the assignment is to learn to write, using a tool that writes for you "
             "defeats it. We do not let people use a calculator in a course about arithmetic.")],
  model=("Andres's analogy is the interesting part of this, but I think it cuts the other way. We "
         "do ban calculators in the module that teaches arithmetic, and then allow them "
         "everywhere afterwards, because the skill has been established and the tool is no longer "
         "a substitute for it.\n\nThat suggests a split policy rather than one rule. In first-year "
         "writing modules, where the point is to build the skill, I would assess in supervised "
         "conditions and ban the tools. In later work, where the point is the argument, I would "
         "adopt the declaration Yuki describes. Enforcement then rests on the assessment design "
         "rather than on detection software, which in my experience is unreliable enough to "
         "accuse honest students.")),

dict(id="gapyear", professor="Dr. Lindqvist", course="developmental psychology",
  question=("A gap year between school and university is common in some countries and almost "
            "unknown in others. Supporters say students return more mature and better motivated. "
            "Critics say the year interrupts study habits and mainly benefits those who can afford "
            "to travel. What is your view?"),
  students=[("Paolo", "A year away makes a visible difference. Students who have worked or "
             "travelled arrive knowing why they chose the subject, and that shows in how they use "
             "the first term."),
            ("Selma", "The benefit is not the year, it is the money. Compare a student who "
             "backpacked with one who stacked shelves at home and the maturity story looks much "
             "less impressive.")],
  model=("Selma's objection is the one that needs answering, and I do not think the usual research "
         "answers it. Most studies of gap years compare people who took one with people who did "
         "not, and the two groups differ in income before the year even starts.\n\nStill, I lean "
         "towards Paolo's conclusion for a narrower reason. What seems to help is not travel but "
         "any extended period of ordinary responsibility, including paid work at home. A student "
         "who has spent a year being somewhere on time for a manager treats a deadline "
         "differently. If that is right, the policy implication is to make the year genuinely "
         "available rather than to praise it: deferred places as standard, and no financial "
         "penalty for taking one.")),

dict(id="classsize", professor="Dr. Osei", course="school effectiveness",
  question=("A school district has money either to reduce class sizes by four students or to raise "
            "teacher salaries substantially in order to attract stronger candidates. Both are "
            "popular with different groups. Which use of the money would you expect to raise "
            "achievement more?"),
  students=[("Nadine", "Smaller classes change what a teacher can do daily. With twenty-two "
             "children instead of twenty-six you can actually read every piece of written work "
             "carefully, and that feedback is where learning happens."),
            ("Tomas", "Teacher quality dominates everything in the research. A strong teacher with "
             "twenty-six children outperforms a weak one with twenty-two, so I would pay for the "
             "people.")],
  model=("I would follow Tomas, though with one qualification that comes from Nadine's argument. "
         "The research on class size does find effects, but they are concentrated in the earliest "
         "years and require reductions much larger than four students to show up reliably. The "
         "variation between teachers is consistently the larger factor.\n\nThe qualification is "
         "that salary alone does not buy quality; it buys a bigger applicant pool, which only "
         "helps if the district can select and develop well. I would therefore spend most of the "
         "money on pay and reserve part of it for structured mentoring in the first two years of "
         "teaching. That combination addresses Nadine's concern indirectly, since a well-supported "
         "teacher marks more carefully too.")),

dict(id="admissions", professor="Dr. Ashby", course="selection and assessment",
  question=("Some universities have dropped standardised admissions tests in favour of reviewing "
            "essays, references and school records. Supporters call this fairer and more complete. "
            "Critics say it increases the weight of coaching and connections. Which system would "
            "you trust more?"),
  students=[("Jonas", "Standardised tests are the only part of an application that a wealthy "
             "family cannot simply write for you. An essay can be polished by a consultant; a "
             "three-hour paper cannot."),
            ("Leyla", "Tests are coached too, and heavily. The difference is that coaching for "
             "them is invisible, so the scores look objective when they are measuring preparation "
             "as much as ability.")],
  model=("Both are right about their own half of the problem, which is why I would keep the test "
         "but change what it is used for. Leyla is correct that scores reflect preparation; Jonas "
         "is correct that the alternatives reflect it more.\n\nMy view is that a test works best "
         "as a floor rather than a ranking. Use it to confirm that an applicant can handle the "
         "material, and make decisions above that threshold on the school record, which reflects "
         "four years of work rather than one morning. This also reduces the value of intensive "
         "coaching, since the gains from a very high score largely disappear. Whatever system is "
         "used, the school context has to be read alongside it, because the same grade means "
         "different things in different schools.")),

dict(id="vocational", professor="Dr. Brennan", course="comparative education",
  question=("Some countries separate students into academic and vocational tracks at fourteen or "
            "fifteen; others keep a common curriculum until eighteen. Early tracking claims to "
            "serve students who dislike academic study. Late tracking claims to keep options open. "
            "Which would you recommend?"),
  students=[("Kristina", "Early tracking respects reality. Keeping a student who hates classroom "
             "work in a classroom for four more years produces a demoralised school-leaver with "
             "nothing to show for the time."),
            ("Abdi", "Choices made at fourteen are made by parents and teachers, not students, and "
             "they follow people for life. That is far too early to close a door.")],
  model=("I lean towards Abdi, mainly because of what the evidence shows about who gets tracked. In "
         "systems that sort early, background predicts the track more strongly than attainment "
         "does, and movement between tracks afterwards is rare. A decision described as a choice "
         "turns out to be an inheritance.\n\nKristina's concern is real, but it argues for "
         "changing what the common curriculum contains rather than for sorting children. A general "
         "programme can include workshop work, placements and applied projects without deciding at "
         "fourteen who will never study again. The systems that manage this well, such as "
         "Finland's, delay the separation and keep the bridges open afterwards, and their "
         "vocational routes carry much less stigma as a result.")),
]
