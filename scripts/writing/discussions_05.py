# -*- coding: utf-8 -*-
"""
Academic Discussion prompts, set 5: environment, health and the city.
All original. Same standards as set 1 (see scripts/build_writing.py).
"""
DISCUSSIONS = [
dict(id="nuclear", professor="Dr. Ardent", course="energy policy",
  question=("Countries building low-carbon electricity systems disagree about nuclear power. "
            "Supporters point to steady output that does not depend on weather. Critics point to "
            "construction costs and timescales that have repeatedly overrun. Would you include new "
            "nuclear plants in a national plan?"),
  students=[("Wiktor", "Include them. Wind and solar need something firm behind them, and the "
             "alternative firm sources are gas or enormous quantities of storage that nobody has "
             "yet built at national scale."),
            ("Delphine", "Include them and you spend fifteen years and triple the budget on one "
             "plant. The same money in renewables and grid connections delivers carbon reductions "
             "this decade.")],
  model=("Delphine's argument about timing is the one that persuades me most, because the "
         "emissions that matter are cumulative and a plant finished in 2042 does nothing for the "
         "budget between now and then. The recent European projects support her: each ran roughly "
         "three times over both cost and schedule.\n\nWiktor's technical point still stands, "
         "however. A system dominated by wind needs something for the long, still, cold weeks, and "
         "storage at that duration is expensive. My view is to build renewables and transmission "
         "as fast as possible, extend the life of existing reactors, which is cheap and immediate, "
         "and keep a small new-build programme as insurance rather than as the centre of the "
         "plan.")),

dict(id="meatpolicy", professor="Dr. Bergqvist", course="food systems",
  question=("Reducing meat consumption would lower agricultural emissions substantially. "
            "Governments could tax meat, subsidise alternatives, or change what public canteens "
            "serve. Taxes are effective but unpopular and fall hardest on poorer households. Which "
            "instrument would you choose?"),
  students=[("Julien", "A tax is the honest instrument. It puts the environmental cost into the "
             "price, which is how every other pollutant is handled, and the revenue can compensate "
             "low-income households directly."),
            ("Maya", "Public procurement is quieter and more effective. Schools, hospitals and "
             "army canteens buy enormous volumes, and changing those menus changes demand without "
             "any household choosing anything.")],
  model=("I would start where Maya suggests, because procurement avoids the political failure mode "
         "that has killed meat taxes in every country that has proposed one. Public kitchens serve "
         "millions of meals, and a shift there also moves what suppliers grow and what "
         "manufacturers develop.\n\nThat said, Julien is right that procurement alone cannot reach "
         "most consumption. My own view is that the sequence matters more than the choice: change "
         "canteens first, which normalises the food and builds the supply chain, then introduce "
         "pricing once acceptable alternatives are familiar and cheap. Doing it in the opposite "
         "order produces a tax on a product people cannot easily substitute, which is both "
         "regressive and, as the evidence shows, quickly repealed.")),

dict(id="plastics", professor="Dr. Eriksen", course="environmental management",
  question=("Bans on single-use plastic items are now common. Supporters say they remove visible "
            "waste and shift habits quickly. Critics say the replacements can carry a larger "
            "overall footprint and that the bans target a small share of plastic use. Are such "
            "bans worthwhile?"),
  students=[("Rosa", "They are worth it for the signal alone. A ban makes an abstract problem "
             "concrete every time someone picks up a cup, and public support for larger measures "
             "follows visible ones."),
            ("Tor", "Signals are not reductions. A cotton bag has to be used hundreds of times to "
             "beat the plastic one it replaced, and most of them are not.")],
  model=("Tor is citing the life-cycle studies correctly, and I think anyone defending these bans "
         "has to concede the point: on a footprint basis, several popular substitutions are worse "
         "than what they replaced.\n\nI still lean towards Rosa's conclusion, but for a narrower "
         "reason than the signal. Single-use items are the fraction of plastic that most reliably "
         "escapes collection and ends up in rivers, and that damage is not captured in a carbon "
         "comparison at all. So the case for the ban is about leakage rather than emissions. If "
         "that is the justification, the policy should follow it: ban the items that leak, require "
         "reusables that are actually returned, and stop claiming a climate benefit the evidence "
         "does not support.")),

dict(id="rewilding", professor="Dr. Cahill", course="conservation policy",
  question=("Rewilding schemes take farmland out of production and allow woodland, wetland and "
            "large herbivores to return. Supporters cite recovering species and flood control. "
            "Critics say the land was producing food and supporting rural employment. How should a "
            "government weigh these claims?"),
  students=[("Eilidh", "On marginal upland the arithmetic is straightforward. That land produces "
             "very little food, survives on subsidy, and delivers far more as woodland holding "
             "water back from towns downstream."),
            ("Bram", "Which is an argument made by people who do not live there. Farming is the "
             "reason those communities exist at all, and a wetland does not employ anyone or keep "
             "a school open.")],
  model=("Bram is raising the objection that decides whether these schemes survive politically, "
         "and I think it is usually answered too glibly. A landscape is not only an ecosystem; it "
         "is a set of households.\n\nEven so, I find Eilidh's case convincing for marginal land "
         "specifically, because the flood protection has a measurable value that is currently paid "
         "for downstream in insurance and repairs. The condition I would attach is that the money "
         "follows the same families: pay for water retention and carbon as a continuing income to "
         "the landholders, rather than buying the farm once and letting the community empty. "
         "Framed that way it is a change in what the land is paid to produce, not the end of "
         "working the land.")),

dict(id="waterpricing", professor="Dr. Mansouri", course="resource economics",
  question=("In dry regions, water can be allocated by price or by quota. Pricing encourages "
            "efficiency and directs water to its most valuable use. Quotas guarantee a minimum to "
            "every household regardless of income. Which mechanism would you recommend, and how "
            "would you address its weakness?"),
  students=[("Sara", "Price it. Where water is nearly free it is used on lawns during a drought, "
             "and no amount of advertising changes that as quickly as a bill does."),
            ("Nikolai", "Price it and the poorest household pays the same rate as a swimming pool. "
             "Water is not an ordinary commodity, and treating it as one has predictable "
             "results.")],
  model=("Both of these are right, and I think the standard answer combines them better than "
         "either alone. A block tariff gives every household a first allocation at a very low "
         "price, sufficient for drinking, cooking and washing, and then raises the rate steeply "
         "for consumption above it.\n\nThat design answers Nikolai, because nobody is priced out "
         "of essential use, while keeping the incentive Sara wants exactly where the discretionary "
         "consumption is. My own city moved to this structure after a drought and domestic use "
         "fell by about a fifth without any measurable hardship. The harder problem is "
         "agriculture, which uses most of the water in dry regions and is usually exempt from the "
         "whole discussion.")),

dict(id="bikelanes", professor="Dr. Lindgren", course="transport planning",
  question=("Building protected cycle lanes on main streets usually means removing parking or a "
            "traffic lane. Supporters cite increases in cycling and reductions in injuries. Local "
            "businesses often object that they will lose customers. How should a city decide?"),
  students=[("Yara", "Build them. Surveys of shopkeepers consistently overestimate how many "
             "customers arrive by car, often by a factor of three, and measured spending after "
             "installation usually holds or rises."),
            ("Milan", "Averages hide a lot. A hardware shop selling heavy goods is not a café, and "
             "telling the owner that the aggregate figures are fine does not help him.")],
  model=("Yara is describing findings I find convincing, and the gap between what retailers "
         "believe about their customers and what counts show is one of the most consistent results "
         "in transport research.\n\nMilan's qualification is fair, though, and I think it changes "
         "the implementation rather than the decision. Some businesses genuinely depend on vehicle "
         "access, so the design should keep loading bays and short-stay spaces even where general "
         "parking goes. I would also measure before and after and publish it, because the strongest "
         "argument for the next scheme is a local one rather than a study from another country. "
         "Where cities have done this, opposition to later phases has been noticeably smaller.")),

dict(id="buildingheight", professor="Dr. Tanaka", course="housing policy",
  question=("Cities facing housing shortages can build tall towers on a few sites or add moderate "
            "density across many neighbourhoods. Towers concentrate opposition in one place; "
            "widespread change spreads it thinly but touches far more residents. Which strategy "
            "would you pursue?"),
  students=[("Cecilia", "Moderate density everywhere. Six-storey streets house a great many people "
             "at a human scale, and they are far cheaper per unit than towers, which need lifts, "
             "fire systems and steel."),
            ("Rafael", "Towers get built, though. One negotiation with one landowner delivers a "
             "thousand homes, while rezoning a whole city means a thousand arguments and a decade "
             "of delay.")],
  model=("Rafael is describing the political economy accurately, and it explains why so many "
         "cities end up with clusters of towers despite the cost. Concentrated projects are simply "
         "easier to deliver.\n\nEven so, I agree with Cecilia on the substance, because the "
         "construction economics are not close: above roughly ten storeys the cost per square "
         "metre rises sharply, so towers deliver fewer homes per unit of investment. The way "
         "through Rafael's objection is to remove the negotiation rather than to win it, by "
         "permitting moderate density as of right instead of case by case. Several cities have "
         "done exactly that recently, and the permits granted rose quickly once each project no "
         "longer needed its own hearing.")),

dict(id="overtourism", professor="Dr. Pereira", course="tourism and heritage",
  question=("Historic cities under pressure from visitor numbers have tried entry charges, caps on "
            "short-term rentals and limits on cruise arrivals. Each measure protects residents but "
            "reduces income for local businesses. What combination would you recommend to a city "
            "council?"),
  students=[("Ottavia", "Start with short-term rentals. The number of visitors is not the real "
             "problem; the loss of housing that turns a neighbourhood into an empty stage set "
             "is."),
            ("Georg", "The cruise ships are the clearer target. Thousands of passengers arrive for "
             "six hours, spend very little and leave, which is the highest crowding for the lowest "
             "return.")],
  model=("I agree with Ottavia that rentals should come first, because the damage she describes is "
         "the only one that is effectively irreversible. Once housing has converted and residents "
         "have gone, the shops, schools and clinics that depend on them close too, and a city "
         "cannot easily rebuild that.\n\nGeorg's point is well taken on crowding, and the day-visit "
         "economics really are poor, so I would cap arrivals as a second step. What I would avoid "
         "is the entry charge, which raises modest revenue, deters nobody who has already paid for "
         "a flight, and lets a council appear to act while the housing conversion continues. "
         "Measures that change what buildings are used for matter more than measures that price a "
         "day out.")),

dict(id="schoolstart", professor="Dr. Ferrell", course="public health",
  question=("Research on adolescent sleep suggests that later school start times improve "
            "attendance and attainment. Schools that have tried it report benefits, but also "
            "difficulties with transport schedules, sports fixtures and parents' working hours. "
            "Should school days start later?"),
  students=[("Bianca", "Yes. The biological evidence on adolescent sleep timing is about as solid "
             "as anything in the field, and we are currently running schools against it for the "
             "convenience of bus timetables."),
            ("Karl", "The trials also shift the whole day later, which pushes sport, jobs and "
             "family time into the evening. Parents who leave for work at seven simply have "
             "nowhere to put their children.")],
  model=("Bianca is right about the underlying science, and I would act on it. The shift in sleep "
         "timing during adolescence is physiological rather than a matter of discipline, and "
         "schools that moved their start report better attendance and fewer late arrivals within a "
         "term.\n\nKarl's objection is about implementation, and it is the reason several of these "
         "changes have been reversed. In my view it argues for a smaller shift than enthusiasts "
         "want: moving from eight to half past nine creates every problem he lists, while moving "
         "to half past eight captures much of the benefit at a fraction of the disruption. Opening "
         "the building early for supervised study would also cover the families whose working day "
         "cannot move.")),

dict(id="greenspace", professor="Dr. Varga", course="urban design",
  question=("A city owns a large derelict site near the centre. It can be developed as housing, "
            "which the city badly needs, or turned into a park in a district with very little "
            "green space. Both uses are defensible. How would you decide?"),
  students=[("Lotte", "Housing. A park is a wonderful thing, but people without homes are living "
             "an hour away and commuting in, which costs them far more than the absence of a lawn "
             "costs anyone."),
            ("Mahmoud", "Once a site is built on it is gone for a century. Parks are the only "
             "part of a city that cannot be retrofitted later, which is why every generation "
             "regrets not making more of them.")],
  model=("Mahmoud's argument about irreversibility is the strongest thing said here, and it is why "
         "I would not treat this as a simple comparison of needs. Housing can be added in many "
         "places; central open space cannot.\n\nBut I believe the framing is a false choice, "
         "because the densities involved do not require the whole site. Perimeter blocks of six "
         "storeys around a genuine public park would deliver most of the homes Lotte wants while "
         "keeping the green space, and the housing that faces a park is worth more, which helps "
         "fund it. The examples I know of in Copenhagen and Hamburg were built this way. What I "
         "would resist is a token strip of grass described as a park in order to build over the "
         "rest.")),
]
