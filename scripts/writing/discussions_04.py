# -*- coding: utf-8 -*-
"""
Academic Discussion prompts, set 4: technology, media and information.
All original. Same standards as set 1 (see scripts/build_writing.py).
"""
DISCUSSIONS = [
dict(id="socialage", professor="Dr. Novak", course="media and society",
  question=("Several governments have proposed a minimum age for social media accounts, enforced "
            "by the platforms. Supporters point to evidence on adolescent mental health. Critics "
            "say enforcement requires identifying every user and pushes younger teenagers to "
            "unregulated services. What would you advise?"),
  students=[("Bea", "An age limit is worth the cost. We restrict alcohol and driving on much "
             "thinner evidence than we now have about teenagers, sleep and compulsive "
             "scrolling."),
            ("Ravi", "Enforcement is the problem. To check that a user is sixteen you have to "
             "check everyone, and that means handing identity documents to the same companies we "
             "are trying to restrain.")],
  model=("Ravi has identified the part of this that is usually waved away, and I think it is "
         "decisive against a hard age limit. Verification at that scale creates a permanent "
         "identity layer over the whole internet, and it would not stop a determined "
         "fifteen-year-old for long.\n\nI would put the obligation on the design instead. The "
         "evidence Bea refers to points at specific features rather than at the medium: infinite "
         "feeds, notifications at night, recommendation systems tuned for time spent. Requiring "
         "accounts registered as minors to default to chronological feeds, with notifications off "
         "overnight and no recommended strangers, targets the mechanism directly. That is "
         "enforceable by auditing the company rather than by checking the child.")),

dict(id="targetedads", professor="Dr. Emerson", course="information privacy",
  question=("Advertising based on detailed personal profiles funds most free online services. "
            "Supporters argue that users receive relevant advertising and pay nothing. Critics "
            "argue that the trade is not genuinely understood or consented to. Should this form of "
            "advertising be restricted?"),
  students=[("Louise", "Restrict it. Nobody reading a consent banner understands that their "
             "location history is being sold, and consent that depends on not understanding is "
             "not consent."),
            ("Tarek", "The alternative is subscription, and that makes access to information "
             "depend on income. Free services supported by advertising are a genuine public "
             "good.")],
  model=("Tarek's point about access is the strongest defence of the model, and I would not "
         "dismiss it. But I agree with Louise that the current arrangement cannot be described as "
         "consent, because the choice is presented at the moment of greatest friction and the "
         "refusal option is deliberately buried.\n\nMy view is that the restriction should fall on "
         "the profiling rather than on the advertising. Contextual advertising, which matches the "
         "advertisement to the page rather than to the person, funded the press for two centuries "
         "and still works; European publishers that switched back reported revenue within a "
         "quarter of what they earned before. That keeps Tarek's free service and removes the part "
         "nobody actually agreed to.")),

dict(id="facialrec", professor="Dr. Quintero", course="technology policy",
  question=("Police forces in several cities use automated facial recognition in public spaces. "
            "Supporters say it locates suspects far faster than officers can. Critics point to "
            "uneven accuracy across groups and to the effect of permanent identification on public "
            "life. Should the technology be used?"),
  students=[("Idris", "The accuracy gap is the immediate objection. A system that misidentifies "
             "some groups several times more often than others produces stops that fall on the "
             "same communities again and again."),
            ("Hedda", "Accuracy improves every year, though. If the objection is only technical, "
             "then we are really saying we will accept this once the numbers are good enough.")],
  model=("Hedda has asked the right question, and I think the answer is that the objection is not "
         "only technical. Idris's point about error rates is serious and well documented, but a "
         "perfectly accurate system would still change what a public space is, because it makes "
         "being unremarked in a crowd impossible.\n\nIn my view that argues for limiting the "
         "purpose rather than waiting for the accuracy. I would allow retrospective searches "
         "against a named suspect with judicial authorisation, which is a recognisable "
         "investigative act, and prohibit continuous scanning of passers-by. The distinction is "
         "not about the technology at all; it is the same line we already draw between searching "
         "one house with a warrant and searching every house on the street.")),

dict(id="newspaywall", professor="Dr. Lagerlöf", course="media economics",
  question=("Serious journalism increasingly sits behind paywalls while free sites carry lighter "
            "material. Supporters of paywalls say readers must fund reporting. Critics say the "
            "result is an informed minority and an under-informed majority. How should quality "
            "journalism be funded?"),
  students=[("Casper", "Paywalls are simply honest. Reporting costs money, and the free era was "
             "funded by a classified advertising business that no longer exists and is not coming "
             "back."),
            ("Zeynep", "Honest, and corrosive. When the careful account of a local council is paid "
             "for and the inflammatory version is free, the division of the audience follows "
             "automatically.")],
  model=("Zeynep is describing something I find genuinely worrying, and the evidence from local "
         "news supports her: circulation falls behind a paywall, and the readers who leave do not "
         "move to another paper, they move to social media.\n\nCasper is right about the "
         "economics, though, so the answer cannot be simply to drop the paywall. What seems "
         "workable is a split: a metered wall for most coverage, with anything touching elections, "
         "courts and public health free to everyone. Several papers already do this during "
         "emergencies, which shows the principle is accepted. The harder question, which neither "
         "post addresses, is who funds the local reporting that no paywall can ever sustain "
         "because the audience is too small.")),

dict(id="generatedart", professor="Dr. Ostrowski", course="art and technology",
  question=("Systems that generate images were trained on very large collections of existing "
            "artwork, generally without the artists' agreement. Some argue this is comparable to "
            "human learning from influences. Others argue it is commercial use of work that was "
            "never licensed. What is your position?"),
  students=[("Nina", "The analogy with human influence breaks down at scale. A painter studying "
             "Rembrandt spends years and produces one style; a model ingests millions of images "
             "and produces any of them on demand."),
            ("Emil", "Style has never been protected, and for good reason. If it were, most art "
             "movements would have been illegal, since they are built on imitating and extending "
             "one another.")],
  model=("Emil is correct about copyright as it stands, and I think he is right that protecting "
         "style would be a disaster for art generally. But Nina has identified why this case still "
         "feels different, and I believe the difference is real rather than sentimental.\n\nThe "
         "distinction I would draw is between the output and the training. What the model produces "
         "may well be a new work; what was done to build it was a commercial use of specific "
         "files. That is a question about the copying step, not about style, and it can be settled "
         "with licensing rather than with a new right over aesthetics. Several music catalogues "
         "have already been licensed this way, which suggests the market can handle it.")),

dict(id="phonesclass", professor="Dr. Marchetti", course="classroom practice",
  question=("A number of schools have banned mobile phones during the school day, including "
            "breaks. Early reports describe calmer corridors and improved concentration. Others "
            "argue that students must learn to manage the devices they will carry for the rest of "
            "their lives. Which approach would you adopt?"),
  students=[("Iva", "Ban them. Expecting a fourteen-year-old to resist a device engineered by "
             "thousands of people to be irresistible is not teaching self-control, it is setting "
             "them up to fail."),
            ("Samir", "Then they leave school at eighteen having never practised. Self-regulation "
             "is learned by doing it in a supported environment, which is exactly what a school is "
             "supposed to be.")],
  model=("Samir's principle is right in general, and I would normally apply it, but I agree with "
         "Iva about this particular case. Self-regulation is learned gradually, and the reports "
         "from schools that banned phones describe an immediate change in how break times work, "
         "which suggests the device was suppressing the practice rather than providing it.\n\nThe "
         "compromise I would defend is a ban that ends with age. Phones locked away entirely in "
         "the lower years, where the evidence is strongest, and supervised use in the final two "
         "years, with explicit teaching about attention and design. That gives Samir his practice "
         "period while keeping the youngest students out of an environment they have no realistic "
         "chance of managing.")),

dict(id="algofeed", professor="Dr. Okonkwo", course="digital platforms",
  question=("Social platforms rank posts by predicted engagement rather than by time. Supporters "
            "say this surfaces what users actually want. Critics say engagement prediction "
            "systematically favours outrage. Should platforms be required to offer a "
            "chronological alternative?"),
  students=[("Jonas", "Require the option, certainly. It costs nothing to build and it lets anyone "
             "who wants an unsorted feed have one, which at least makes the ranking a choice "
             "rather than a condition."),
            ("Amara", "An option that ninety per cent of users never open is not a remedy. If "
             "ranking is harmful, offering an alternative nobody selects is a way of appearing to "
             "act.")],
  model=("Amara is right about defaults, and the research on organ donation and pension enrolment "
         "shows how completely they determine behaviour. An unused option is close to no remedy at "
         "all.\n\nStill, I would side with Jonas on requiring it, for a reason neither post "
         "mentions. A chronological feed is not only a product choice; it is the only way anyone "
         "outside the company can see what the ranking is doing, by comparing the two. Researchers "
         "and regulators currently have to take the platform's word for it. So I would mandate "
         "the option, require that switching persists rather than resetting, and treat it as an "
         "auditing instrument rather than as the main fix for the harms Amara is describing.")),

dict(id="reviews", professor="Dr. Halloran", course="consumer behaviour",
  question=("Online reviews guide a great deal of purchasing, yet a substantial share are "
            "incentivised, filtered or fabricated. Some argue that platforms should verify that "
            "reviewers bought the product. Others say verification entrenches the largest sellers. "
            "How should this be handled?"),
  students=[("Kofi", "Verified purchase should be mandatory for a review to count. It is a simple "
             "check the platform already performs for refunds, so there is no technical excuse for "
             "not applying it."),
            ("Line", "It also locks in the big platforms. A small shop cannot verify a purchase "
             "made elsewhere, so all the credible reviews end up on the site that already "
             "dominates.")],
  model=("Line's objection is the more interesting one, because it shows how a reasonable remedy "
         "concentrates power. I agree with the concern, but I do not think it defeats Kofi's "
         "proposal.\n\nMy view is that verification should be a visible label rather than a "
         "condition for publication. Show which reviews are tied to a confirmed purchase and let "
         "readers weigh the rest, since an unverified review is evidence of something even if it "
         "is weaker. The deeper problem, which neither post raises, is aggregation: a single "
         "average hides the distribution, and studies of ratings find that the pattern of "
         "complaints predicts satisfaction far better than the mean score does. Showing that "
         "pattern would help more than any filter.")),

dict(id="publiccode", professor="Dr. Vasquez", course="public administration",
  question=("Some governments now require that software developed with public money be released "
            "under an open licence. Supporters say the public paid for it and other agencies "
            "should reuse it. Critics say maintaining a public code base is a cost nobody budgets "
            "for. Would you adopt the rule?"),
  students=[("Bo", "Yes. The same municipal system is bought forty times across a country, each "
             "time from scratch, and the only beneficiary of that arrangement is the "
             "contractor."),
            ("Katarina", "Publishing code is not the same as sharing a system. Without money for "
             "maintenance and support, other agencies find a repository nobody has touched in "
             "three years and start again anyway.")],
  model=("Katarina is describing what usually happens, and I think it explains why so many open "
         "government repositories are abandoned. Publication alone is close to worthless, because "
         "the cost of adopting unsupported code often exceeds the cost of rebuilding.\n\nEven so, "
         "I would adopt the rule Bo wants, with a condition attached. Require publication, but "
         "fund a small shared maintenance team for the handful of systems that several agencies "
         "actually use, which is how the successful examples have worked in practice. The rule "
         "also has a second benefit neither mentions: code that will be published is written and "
         "documented differently, and the procurement conversation changes when the contractor "
         "knows the result will be visible.")),

dict(id="digitising", professor="Dr. Renner", course="archives and preservation",
  question=("Archives must decide how to divide limited budgets between digitising collections for "
            "remote access and conserving fragile originals. Digitisation reaches far more people; "
            "conservation preserves the object itself. Where would you put the marginal money, and "
            "why?"),
  students=[("Halima", "Digitisation, clearly. A manuscript consulted twice a decade in a reading "
             "room becomes available to thousands of researchers, and every consultation of the "
             "original damages it a little."),
            ("Stefan", "A digital copy is a photograph of one interpretation. Scholars return to "
             "originals for the things no scan captures, such as the binding, the paper and what "
             "was erased.")],
  model=("Stefan is right that scans lose information, and I have seen this in practice: a "
         "colleague's argument about a medieval account book turned entirely on ruling lines that "
         "were invisible in the digital surrogate.\n\nEven so, I lean towards Halima's priority "
         "for most collections, because the two aims are less opposed than the question suggests. "
         "Digitisation reduces handling, which is itself conservation, and it identifies which "
         "items are actually in demand and therefore worth conserving properly. I would digitise "
         "broadly at moderate quality, conserve intensively where use or fragility justifies it, "
         "and be honest in the catalogue about what the surrogate cannot show, so that Stefan's "
         "scholars know when to travel.")),
]
