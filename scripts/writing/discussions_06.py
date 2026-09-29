# -*- coding: utf-8 -*-
"""
Academic Discussion prompts, set 6: culture, society and public life.
All original. Same standards as set 1 (see scripts/build_writing.py).
"""
DISCUSSIONS = [
dict(id="votingage", professor="Dr. Kristensen", course="comparative politics",
  question=("Several countries have lowered the voting age to sixteen in some elections. "
            "Supporters say habits formed early last a lifetime and that sixteen-year-olds are "
            "affected by policy. Critics doubt that most are ready to weigh competing claims. "
            "Would you lower it?"),
  students=[("Ilse", "Lower it. Turnout research consistently finds that voting is habit-forming, "
             "and eighteen-year-olds are often moving house or starting work, which is the worst "
             "possible moment to register for the first time."),
            ("Bastian", "Readiness is not evenly distributed at sixteen, and a first vote cast "
             "without much understanding is not obviously better than a later one cast with "
             "some.")],
  model=("Ilse's argument is the one supported by data, and I find it persuasive. The countries "
         "that lowered the age report that first-time turnout at sixteen exceeds first-time "
         "turnout at eighteen, and the gap persists into later elections, which is what a "
         "habit-formation story predicts.\n\nBastian's objection would carry more weight if the "
         "alternative were an informed electorate of adults, but the evidence on political "
         "knowledge does not show a sharp change at eighteen. What does seem to matter is whether "
         "the first vote is cast while someone is still in a stable setting with civic teaching "
         "around them. That argues for lowering the age and pairing it with the curriculum, "
         "rather than for waiting until people have dispersed.")),

dict(id="freemuseums", professor="Dr. Winters", course="cultural policy",
  question=("Some countries fund free entry to national museums from taxation; others charge "
            "admission and use the revenue for exhibitions and conservation. Free entry raises "
            "visitor numbers considerably, though the composition of visitors changes less than "
            "expected. Which model would you support?"),
  students=[("Sinead", "Free entry, on principle. These collections were assembled with public "
             "money and in many cases taken from elsewhere; charging people to see what already "
             "belongs to them is hard to defend."),
            ("Anton", "The numbers rise but the audience stays much the same, and meanwhile the "
             "money has to come from somewhere. Charging visitors who can easily pay funds the "
             "outreach that actually changes who comes.")],
  model=("Anton is describing a real finding, and I think supporters of free entry too often skip "
         "past it: attendance rises sharply while the social profile of the audience moves very "
         "little. Free entry mostly subsidises frequent visitors.\n\nEven so, I agree with Sinead, "
         "for a reason that is about behaviour rather than principle. A charge changes how a "
         "museum is used, because a ticket turns a passing impulse into a planned event. When "
         "entry is free, people drop in for twenty minutes to see one room, and that casual "
         "habit is what eventually produces a regular visitor.\n\nI would keep free entry to "
         "the permanent collection, "
         "charge for temporary exhibitions, and fund outreach explicitly rather than hoping ticket "
         "revenue reaches it.")),

dict(id="sportfunding", professor="Dr. Bjornson", course="sport and public policy",
  question=("Public sports budgets can be concentrated on elite athletes who may win international "
            "medals, or spread across community facilities such as pools and pitches. Medals are "
            "said to inspire participation, though the evidence for that effect is contested. How "
            "would you divide the budget?"),
  students=[("Rina", "Community facilities. The inspiration argument has been tested repeatedly "
             "and participation barely moves after a successful games, while a closed pool removes "
             "swimming from a whole district."),
            ("Emeka", "Elite programmes are also how a country develops coaches and sports "
             "science, and those people end up working in clubs. The two budgets are less separate "
             "than they look.")],
  model=("Rina is right about the evidence, and I would weight the budget heavily towards "
         "facilities. Studies after major games consistently fail to find a lasting participation "
         "effect, while access is a strong and well-established predictor: people swim when there "
         "is a pool they can reach.\n\nEmeka's point about expertise is the part I would preserve, "
         "though. Coaching knowledge does move from elite programmes into clubs, so I would keep "
         "elite funding tied to that transfer rather than to medals alone, requiring national "
         "squads to contribute coaching hours locally. What I would stop funding is the pursuit of "
         "medals in sports with very few participants, which is the clearest case of public money "
         "buying a result that benefits almost nobody.")),

dict(id="libraries", professor="Dr. Achterberg", course="public services",
  question=("Public libraries lend fewer books than they once did, yet many now function as warm "
            "spaces, study rooms and places to get help with official forms. Some argue this "
            "mission creep dilutes the institution; others call it a necessary adaptation. What is "
            "your view?"),
  students=[("Nora", "It is adaptation, and a successful one. The buildings are now the last "
             "public indoor space you can sit in without buying anything, which is more valuable "
             "in a city than another shelf of novels."),
            ("Pieter", "Valuable, but it is also how libraries end up doing social work with a "
             "library budget and no trained staff. Councils are quietly closing services and "
             "calling the library the replacement.")],
  model=("Pieter is identifying something I think is genuinely happening, and it deserves more "
         "attention than it usually gets. Library staff are increasingly asked to help with "
         "benefit applications and immigration forms without the training or the mandate, because "
         "the office that used to do it has closed.\n\nBut I agree with Nora about the direction. "
         "The lending figures understate what the buildings do, and the case for funding them is "
         "stronger now than when they were only book stores. The honest position is to accept the "
         "wider role and fund it properly: pay for the advice workers rather than letting the "
         "duty fall on librarians, and stop pretending that the transfer of work was a change in "
         "the library's mission rather than a cut somewhere else.")),

dict(id="minoritylang", professor="Dr. Callaghan", course="sociolinguistics",
  question=("Governments can spend substantial sums supporting minority languages through "
            "schooling, broadcasting and official use. Supporters describe language as the carrier "
            "of a community's knowledge. Critics say resources should go to speakers' economic "
            "prospects instead. How would you justify a position?"),
  students=[("Aoibhinn", "The two are not opposed. Bilingual schooling produces good outcomes in "
             "the majority language as well, so the economic objection assumes a trade-off that "
             "the research does not find."),
            ("Miguel", "Support has to be honest about what it can achieve. A language kept alive "
             "only in classrooms and official signage is being documented rather than spoken, and "
             "that is a different goal.")],
  model=("Miguel is making the distinction I find most useful here, and it should shape where the "
         "money goes. A language survives through domains where it is the easiest choice, not "
         "through symbolic recognition, and policies that fund signage and certificates rarely "
         "create those domains.\n\nI agree with Aoibhinn that the economic objection is weak, "
         "since the evidence on bilingual education is largely positive for both languages. My own "
         "view is that the strongest instruments are the ones that build everyday use: early years "
         "provision, local media that people would choose anyway, and employment where the "
         "language is genuinely working rather than ceremonial. That is also how the Welsh and "
         "Basque revivals differed from efforts that produced qualifications and very few "
         "speakers.")),

dict(id="spacefunding", professor="Dr. Ferrante", course="science policy",
  question=("Governments spend heavily on space exploration while facing urgent needs at home. "
            "Supporters cite scientific returns, technological spillovers and the practical value "
            "of satellites. Critics call crewed exploration in particular a costly symbol. How "
            "would you defend a level of spending?"),
  students=[("Lian", "Most of the budget is not exploration at all. Earth observation, navigation "
             "and climate monitoring are infrastructure, and they would be worth the money even if "
             "nobody ever left the atmosphere."),
            ("Oscar", "That is a defence of satellites, not of crewed missions. The human "
             "programmes cost an order of magnitude more and return far less science per pound "
             "than robotic ones.")],
  model=("Oscar's comparison is accurate on the science, and I would not defend crewed missions on "
         "that basis; robotic probes have returned far more per unit of spending for decades.\n\n"
         "I agree with Lian about where the argument really lies, though. The observation and "
         "navigation systems are infrastructure, since agriculture, shipping and climate policy "
         "already depend on, and they are cheap relative to the value. My view is to fund that "
         "generously, fund robotic science on its merits, and treat crewed exploration as what it "
         "is: an expensive cultural and political project that should be argued for honestly "
         "rather than justified by spillovers. Judged that way it may still be worth some money, "
         "but not at the cost of the rest.")),

dict(id="servicerequirement", professor="Dr. Isaksson", course="civic education",
  question=("Some countries require secondary students to complete a period of community service "
            "before graduating. Supporters say it builds civic habits and brings young people into "
            "contact with unfamiliar lives. Critics say compulsory volunteering is a contradiction "
            "that produces resentment. What would you recommend?"),
  students=[("Tessa", "Require it. Left optional, it is done by the students who were already "
             "joining things, which means the programme reaches exactly the people who need it "
             "least."),
            ("Jorge", "Compulsion changes the activity. A placement someone resents teaches them "
             "that service is a box to tick, and the organisation receiving them often spends more "
             "supervising than it gains.")],
  model=("Jorge's warning about supervision is one I have seen play out, and any serious scheme has "
         "to budget for it rather than assuming charities can absorb the work.\n\nEven so, I think "
         "Tessa's argument is decisive, because the selection problem with voluntary schemes is "
         "severe: participation correlates strongly with parental education, so the optional "
         "version widens the gap it was meant to close. My view is to require the hours but make "
         "the choice of placement genuinely wide, including paid-adjacent roles in libraries, "
         "clinics and environmental work, and to give schools time to place students properly. "
         "Where that has been done well, the resentment Jorge describes shows up mainly in "
         "programmes that assigned students without asking them anything.")),

dict(id="cashless", professor="Dr. Montoya", course="financial inclusion",
  question=("Some cities are close to cashless, and many shops no longer accept notes. Card "
            "payment is cheaper to handle and harder to steal. Others argue that cash is essential "
            "for people without bank accounts and for privacy. Should businesses be required to "
            "accept cash?"),
  students=[("Runa", "Require it. Refusing cash excludes the elderly, the undocumented and anyone "
             "whose account has been frozen, and those groups have no way to make their exclusion "
             "visible."),
            ("Dmitri", "Handling cash costs small shops real money in time, insurance and trips to "
             "the bank. A mandate makes them subsidise a payment method almost nobody there "
             "uses.")],
  model=("Dmitri is right that the costs fall unevenly, and I would not impose a blanket mandate "
         "on every business. But I agree with Runa about the underlying problem, and I think it is "
         "more serious than the convenience framing suggests.\n\nThe distinction I would draw is "
         "by function rather than by size. Where a service is effectively unavoidable — public "
         "transport, pharmacies, utility payments, government offices — cash should be accepted, "
         "because being unable to use them is exclusion rather than inconvenience. Elsewhere I "
         "would let shops choose. The more durable answer is a free, accessible basic account, "
         "since most of the people Runa is describing would use a card if they could get one, and "
         "several countries now guarantee this by law.")),

dict(id="megaevents", professor="Dr. Delacroix", course="urban economics",
  question=("Cities compete to host large international events, promising regeneration and global "
            "attention. Studies of past hosts often find costs well above forecast and venues that "
            "go unused. Supporters say the deadline delivers infrastructure that would otherwise "
            "take decades. Should a city bid?"),
  students=[("Ayesha", "Almost never. The cost overruns are not occasional accidents; they are the "
             "normal outcome, and the benefits are concentrated among contractors while the debt "
             "is public."),
            ("Kenji", "The deadline is the real product. Cities have built transport links in four "
             "years that had been discussed for thirty, because an immovable date defeats the "
             "usual objections.")],
  model=("Kenji's point about deadlines is the strongest argument for hosting, and I have seen it "
         "work: the transport spine built for a games in my own region had been proposed three "
         "times and shelved.\n\nEven so, I agree with Ayesha, because the deadline that delivers "
         "the railway also destroys the negotiating position of the city. Every contract is signed "
         "under time pressure against a fixed date, which is precisely why the overruns are so "
         "consistent. My view is that a city should bid only where the venues already exist and "
         "the plan uses them, so that the event is an occupancy question rather than a "
         "construction programme. Where a bid requires building most of what it needs, the "
         "historical record is clear enough to decline.")),

dict(id="monuments", professor="Dr. Serrano", course="public history",
  question=("Cities must decide what to do with monuments to historical figures whose actions are "
            "now widely condemned. The options include removal, relocation to a museum, and "
            "leaving the statue in place with added explanation. Which approach best serves public "
            "understanding?"),
  students=[("Agnes", "Move them to a museum. A statue on a plinth in a square is an honour, not a "
             "history lesson, and the same object in a gallery can be explained properly and "
             "argued with."),
            ("Felix", "Removal ends the conversation. A monument with a frank inscription beside "
             "it teaches passers-by something about the city that an empty plinth never "
             "will.")],
  model=("Felix is describing something valuable, and I would keep it where it can work: an added "
         "inscription does reach people who would never enter a museum, and the contrast between "
         "the original claim and the correction is itself instructive.\n\nBut I agree with Agnes "
         "in most cases, because the added-plaque approach depends on conditions that rarely hold. "
         "The explanation has to be as prominent as the monument, which it almost never is, and "
         "the honour conveyed by scale and position is not undone by a paragraph at eye level. "
         "What I would resist is treating this as one decision for all cases: a statue outside a "
         "courthouse where someone still seeks justice is a different question from one in a park, "
         "and the site should decide.")),
]
