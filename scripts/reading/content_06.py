# -*- coding: utf-8 -*-
"""Academic passages, batch 1. Six questions each; the page draws five."""
COMPLETE_THE_WORDS = []
DAILY_LIFE = []
ACADEMIC = [
dict(id="seaglow", title="Why the Sea Glows", pattern="Phenomenon -> explanation", paragraphs=[
  "On warm nights the surface of some bays flickers with pale blue light wherever the water is "
  "disturbed. The glow comes from single-celled organisms called dinoflagellates, which drift in "
  "enormous numbers near the coast.",
  "The light is produced by a chemical reaction rather than by heat. A molecule called luciferin "
  "combines with oxygen in the presence of an enzyme, and almost all of the released energy "
  "leaves as light rather than warmth. The reaction is far more efficient than any lamp humans "
  "have built.",
  "Biologists disagree about what the display is for. The leading explanation is that a flash "
  "startles a grazing animal, or draws the attention of a larger predator that will eat the "
  "grazer. Either effect would reduce the number of dinoflagellates consumed.",
  "Because the organisms bloom only when nutrients and temperature align, the displays are "
  "unpredictable. Coastal towns that advertise them have learned to promise nothing."],
  questions=[
    dict(type="main idea", stem="What is the passage mainly about?",
      options=["A natural light display and the explanations offered for it",
               "The chemistry of enzymes in marine organisms",
               "How coastal towns attract visitors",
               "Why dinoflagellates bloom near the coast"], key=0),
    dict(type="vocabulary", stem='The word "startles" in the passage is closest in meaning to',
      highlight="startles", options=["alarms", "attracts", "feeds", "conceals"], key=0),
    dict(type="detail", stem="According to the passage, what happens to most of the energy released by the reaction?",
      options=["It leaves as light", "It is stored in the enzyme",
               "It warms the surrounding water", "It is absorbed by oxygen"], key=0),
    dict(type="reference", stem='The word "them" in the phrase "advertise them" refers to',
      highlight="advertise them",
      options=["the displays", "the organisms", "the nutrients", "the coastal towns"], key=0),
    dict(type="rhetorical purpose", stem="Why does the author compare the reaction with a lamp?",
      highlight="far more efficient than any lamp humans have built",
      options=["To emphasise how little of the energy is lost as heat",
               "To argue that the organisms could replace electric lighting",
               "To explain why the light appears blue",
               "To show that the reaction is difficult to reproduce"], key=0),
    dict(type="inference", stem="It can be inferred that tours advertising the glow",
      options=["may sometimes find no display to see",
               "are held every night of the year",
               "damage the organisms they visit",
               "take place only in warm countries"], key=0)]),

dict(id="urbanheat", title="Cooling the City", pattern="Problem -> solution", paragraphs=[
  "A large city is measurably warmer than the countryside around it, often by four or five "
  "degrees on a summer night. Dark roofs and roads absorb sunlight through the day and release it "
  "slowly after dark, while air conditioning adds still more heat to the street.",
  "The effect is not merely uncomfortable. Hospital admissions rise during heat waves, and the "
  "increase is concentrated among the elderly and among households without cooling. The districts "
  "that heat up most are frequently those with the least tree cover.",
  "Several responses are now in use. Coating roofs with reflective paint can lower the surface "
  "temperature of a building by more than twenty degrees. Planting street trees works more slowly "
  "but cools by shade and by evaporation together, and a mature canopy keeps working at night.",
  "Neither measure removes the problem. Cities that have adopted both report reductions of one or "
  "two degrees, which is enough to shorten a heat wave's toll without ending it."],
  questions=[
    dict(type="main idea", stem="What is the passage mainly about?",
      options=["Why cities are hotter than their surroundings, and what can be done",
               "The design of modern air conditioning",
               "How hospitals prepare for summer",
               "The benefits of planting trees in the countryside"], key=0),
    dict(type="detail", stem="According to the passage, what can reflective paint do?",
      options=["Lower a roof's surface temperature substantially",
               "Cool a building only at night",
               "Replace the need for air conditioning",
               "Reduce a city's temperature by five degrees"], key=0),
    dict(type="negative detail",
      stem="All of the following are mentioned as contributing to urban heat EXCEPT",
      options=["dark roofs", "air conditioning", "roads that absorb sunlight", "exhaust from traffic"], key=3),
    dict(type="vocabulary", stem='The word "toll" in the passage is closest in meaning to',
      highlight="toll", options=["cost", "warning", "delay", "record"], key=0),
    dict(type="inference", stem="It can be inferred about districts with few trees that they",
      options=["are likely to be hotter than districts with many",
               "have more hospitals than other districts",
               "were built more recently than other districts",
               "use less air conditioning than other districts"], key=0),
    dict(type="paragraph relationship", stem="What is the relationship between paragraphs 3 and 4?",
      options=["Paragraph 4 qualifies the measures described in paragraph 3.",
               "Paragraph 4 gives examples of the measures described in paragraph 3.",
               "Paragraph 4 explains why the measures in paragraph 3 were adopted.",
               "Paragraph 4 proposes an alternative to the measures in paragraph 3."], key=0)]),

dict(id="ulcers", title="The Ulcer Reversal", pattern="Old view -> new view", paragraphs=[
  "For most of the twentieth century, stomach ulcers were treated as a disease of temperament. "
  "Physicians attributed them to stress and diet, and the standard advice was rest, bland food "
  "and, in severe cases, surgery.",
  "Two Australian researchers proposed in the early 1980s that a bacterium was responsible. The "
  "claim was poorly received, partly because the stomach was assumed to be too acidic for any "
  "organism to survive in it.",
  "Evidence accumulated from several directions. The bacterium could be cultured from biopsies, "
  "it was present in the great majority of ulcer patients, and a course of antibiotics healed "
  "ulcers that had resisted years of dietary management. The pattern held in study after study, "
  "across several countries.",
  "The reversal changed more than one treatment. It reminded the profession that a condition can "
  "look behavioural simply because its true cause has not yet been found. The two researchers "
  "received a Nobel Prize two decades after their first paper appeared."],
  questions=[
    dict(type="main idea", stem="What is the passage mainly about?",
      options=["A change in how a common illness was explained",
               "The discovery of a new species of bacterium",
               "Advances in stomach surgery",
               "The role of diet in digestive health"], key=0),
    dict(type="detail", stem="According to the passage, why was the bacterial explanation resisted?",
      options=["The stomach was thought too acidic for organisms to live in",
               "The researchers were not physicians",
               "No antibiotics were available at the time",
               "Ulcers were thought to be rare"], key=0),
    dict(type="vocabulary", stem='The word "accumulated" in the passage is closest in meaning to',
      highlight="accumulated", options=["built up", "disappeared", "weakened", "divided"], key=0),
    dict(type="rhetorical purpose", stem="Why does the author mention antibiotics?",
      highlight="a course of antibiotics healed ulcers that had resisted years of dietary management",
      options=["To give evidence that the new explanation was correct",
               "To warn against overusing antibiotics",
               "To explain how the bacterium was first cultured",
               "To show that surgery was still necessary"], key=0),
    dict(type="inference", stem="It can be inferred that before the 1980s many ulcer patients",
      options=["were treated for a cause that was not theirs",
               "refused the treatment they were offered",
               "recovered without any treatment at all",
               "were diagnosed by biopsy"], key=0),
    dict(type="paragraph relationship", stem="What is the relationship between paragraphs 1 and 2?",
      options=["Paragraph 2 introduces a challenge to the view described in paragraph 1.",
               "Paragraph 2 gives further support for the view described in paragraph 1.",
               "Paragraph 2 explains how the treatments in paragraph 1 were developed.",
               "Paragraph 2 describes an exception to the rule stated in paragraph 1."], key=0)]),

dict(id="irrigation", title="Two Ways to Water a Field", pattern="Comparison", paragraphs=[
  "Irrigation systems fall broadly into two families. Surface irrigation floods a field from a "
  "channel and lets gravity carry the water across it. Drip irrigation delivers water through a "
  "network of narrow tubes directly to the base of each plant.",
  "Surface systems are cheap to install and need no pumps, which matters where fuel is expensive "
  "or unreliable. They lose a great deal of water to evaporation and to seepage below the root "
  "zone, and they spread it unevenly across a sloping field.",
  "Drip systems waste far less. Because the water arrives slowly and close to the roots, more of "
  "it is taken up by the crop, and fertiliser can be delivered with it. The tubes clog, however, "
  "and replacing them is a recurring cost that small farms find difficult to meet.",
  "The key difference is therefore not efficiency but what each system demands. One spends water "
  "to save money; the other spends money to save water."],
  questions=[
    dict(type="main idea", stem="What is the passage mainly about?",
      options=["The trade-off between two methods of irrigation",
               "Why drip irrigation is replacing older systems",
               "How gravity is used in farming",
               "The cost of fuel for agricultural pumps"], key=0),
    dict(type="detail", stem="According to the passage, what is an advantage of surface irrigation?",
      options=["It requires no pumps", "It loses little water",
               "It delivers fertiliser evenly", "It suits sloping ground"], key=0),
    dict(type="negative detail",
      stem="All of the following are stated about drip irrigation EXCEPT",
      options=["it delivers water near the roots",
               "fertiliser can be supplied through it",
               "its tubes need replacing",
               "it operates without pumps"], key=3),
    dict(type="vocabulary", stem='The word "seepage" in the passage is closest in meaning to',
      highlight="seepage", options=["leakage", "heating", "freezing", "pressure"], key=0),
    dict(type="rhetorical purpose", stem="Why does the author end with the sentence about spending?",
      highlight="One spends water to save money; the other spends money to save water.",
      options=["To restate the trade-off between the two systems in short form",
               "To recommend surface irrigation to poorer farms",
               "To introduce a third kind of system",
               "To criticise the cost of drip equipment"], key=0),
    dict(type="inference", stem="It can be inferred that drip irrigation is harder for small farms because",
      options=["the running costs are difficult for them to meet",
               "their fields are usually flat",
               "they have no access to fertiliser",
               "their crops need little water"], key=0)]),

dict(id="laketurnover", title="How a Lake Turns Over", pattern="Process / sequence", paragraphs=[
  "A deep temperate lake does not mix continuously. Through the summer it settles into layers, "
  "with warm light water floating on cold dense water and a sharp boundary between them.",
  "As autumn air cools the surface, the upper layer loses heat and becomes denser. When its "
  "density matches the water below, the boundary breaks down and wind can stir the whole lake "
  "from top to bottom.",
  "This turnover carries oxygen down to the lake bed and brings nutrients that have settled there "
  "back to the surface. Both movements matter: the deep water has usually been stripped of oxygen "
  "by decomposition over the summer, and the surface has been stripped of nutrients by algae.",
  "The lake separates into layers again in winter, turns over a second time in spring, and "
  "repeats the cycle. Where warming shortens the mixing period, the deep water stays low in "
  "oxygen for longer each year. Fish that depend on cold, well-oxygenated water are among the "
  "first to feel the change."],
  questions=[
    dict(type="main idea", stem="What is the passage mainly about?",
      options=["A seasonal cycle of mixing in deep lakes",
               "How algae consume nutrients in summer",
               "The effect of wind on lake surfaces",
               "Why lake water freezes in winter"], key=0),
    dict(type="detail", stem="According to the passage, what does turnover carry downward?",
      options=["Oxygen", "Nutrients", "Algae", "Heat"], key=0),
    dict(type="reference", stem='The word "there" in the phrase "settled there" refers to',
      highlight="settled there",
      options=["the lake bed", "the surface", "the boundary", "the upper layer"], key=0),
    dict(type="vocabulary", stem='The word "denser" in the passage is closest in meaning to',
      highlight="denser", options=["heavier", "warmer", "clearer", "saltier"], key=0),
    dict(type="inference", stem="It can be inferred that a shorter mixing period leaves deep-water organisms",
      options=["with less oxygen than before",
               "with more nutrients than before",
               "in warmer water year round",
               "closer to the surface"], key=0),
    dict(type="paragraph relationship", stem="What is the relationship between paragraphs 2 and 3?",
      options=["Paragraph 3 describes the consequences of the process explained in paragraph 2.",
               "Paragraph 3 gives an exception to the process explained in paragraph 2.",
               "Paragraph 3 explains why the process in paragraph 2 begins.",
               "Paragraph 3 compares the process in paragraph 2 with a different one."], key=0)]),

dict(id="feathers", title="The Feathered Dinosaurs", pattern="Old view -> new view", paragraphs=[
  "Dinosaurs were pictured for more than a century as scaly animals, closer in appearance to "
  "modern lizards than to anything with feathers. Museum reconstructions and illustrations "
  "reinforced that image for generations of visitors.",
  "Fossil beds in north-eastern China began yielding a different picture in the 1990s. "
  "Fine-grained lake sediments there preserved not only bone but impressions of soft tissue, and "
  "several small predatory dinosaurs were found surrounded by filaments.",
  "At first the filaments were dismissed as decayed collagen fibres. Closer study found branching "
  "structures like those in modern feathers, and traces of the pigment-bearing bodies that give "
  "feathers their colour. Some of the animals were patterned rather than plain, and the same "
  "structures later turned up in larger species.",
  "Feathers, on this reading, evolved long before flight and probably served insulation or "
  "display. The birds at a garden feeder are not merely related to dinosaurs; they are the "
  "surviving branch of the group. Newer museum displays have been rebuilt to match."],
  questions=[
    dict(type="main idea", stem="What is the passage mainly about?",
      options=["Fossil evidence that changed how dinosaurs are pictured",
               "The geology of north-eastern China",
               "How feathers help birds to fly",
               "Why museums build reconstructions"], key=0),
    dict(type="detail", stem="According to the passage, what did the Chinese sediments preserve?",
      options=["Impressions of soft tissue as well as bone",
               "Complete skeletons of flying birds",
               "Eggs containing unhatched young",
               "Footprints left in soft mud"], key=0),
    dict(type="vocabulary", stem='The word "dismissed" in the passage is closest in meaning to',
      highlight="dismissed", options=["rejected", "examined", "preserved", "measured"], key=0),
    dict(type="negative detail",
      stem="All of the following were found in the Chinese fossils EXCEPT",
      options=["bone", "impressions of soft tissue", "branching filaments", "evidence of flight"], key=3),
    dict(type="rhetorical purpose", stem="Why does the author mention birds at a garden feeder?",
      highlight="The birds at a garden feeder",
      options=["To make the link between birds and dinosaurs concrete",
               "To suggest that garden birds are endangered",
               "To explain how feathers keep birds warm",
               "To contrast small birds with large dinosaurs"], key=0),
    dict(type="inference", stem="It can be inferred that feathers first appeared in animals that",
      options=["did not fly", "lived in water", "had no colour vision", "were larger than birds"], key=0)]),
]
