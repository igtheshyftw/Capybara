import type { Passage } from "@/lib/types";

export const passages: Passage[] = [
  {
    id: "p-tide",
    title: "The Tide Pool Census",
    attribution: "Adapted from a 2019 field study on intertidal biodiversity",
    genre: "Science",
    paragraphs: [
      "For eleven summers, Marisol Vega counted animals in the same forty tide pools along the northern coast. The work was unglamorous. She arrived before dawn, knelt on wet rock, and recorded every anemone, limpet, and crab in a waterproof notebook whose pages curled permanently at the corners. Colleagues occasionally suggested that automated cameras could do the same job in a fraction of the time.",
      "Vega disagreed, though not for the reason her colleagues assumed. She did not doubt that a camera could identify a limpet. She doubted that a camera would notice the year the limpets began appearing three centimetres higher on the rock face than they had the summer before. That shift was not a data point she had set out to collect; it was a pattern she recognised only because she had spent enough hours in the same pools to feel when something had changed.",
      "The upward migration turned out to be measurable, and once Vega knew to look for it, it was everywhere in her old notebooks — faint, unremarked, and consistent across nine of the eleven years. Her published analysis credited the finding to the long record rather than to any single observation. What the record provided, she wrote, was not more information but a baseline against which small deviations became legible.",
      "The census continues. Vega has since trained four graduate students, each of whom she requires to spend a full season recording data by hand before touching the automated systems the lab now also operates. The requirement is not nostalgia. It is, she argues, the only reliable way to learn what the instruments are not asking.",
    ],
  },
  {
    id: "p-library",
    title: "The Reading Room",
    attribution: "Adapted from a contemporary novel",
    genre: "Literary Narrative",
    paragraphs: [
      "Nadia had been coming to the third-floor reading room for six weeks before she understood that the man at the corner table was not studying. He arrived at nine, opened the same grey folder, and turned its pages at intervals so regular that she began, without meaning to, to keep time by them. He never wrote anything down.",
      "She constructed explanations for him the way she constructed explanations for everything: quickly, confidently, and with a certain pleasure in her own cleverness. He was a retired professor. He was waiting for someone. He was memorising something. Each theory lasted about a day, until some detail — the way he flinched at the radiator's clanking, the untouched coffee going cold at his elbow — refused to fit inside it.",
      "What unsettled her was not the mystery. It was the discovery that she had spent six weeks in the same room as a person and had learned nothing about him except the rhythm of turning paper. She had, she realised, been reading him the way she read her assigned novels: skimming for a thesis, impatient with anything that did not confirm it.",
      "On the seventh Thursday she sat down across from him and asked what he was reading. He looked up with an expression she could not have predicted from any of her theories, and said that it was a list of names.",
    ],
  },
  {
    id: "p-transit",
    title: "Buses, Trains, and the Cost of Waiting",
    attribution: "Adapted from an urban policy review",
    genre: "Social Science",
    paragraphs: [
      "Transit planners have long measured a system's quality by the total time a trip takes. Yet a growing body of research suggests that riders do not experience all minutes equally. A minute spent waiting at a stop is perceived as roughly twice as long as a minute spent moving, and a minute spent waiting without knowing when the vehicle will arrive is perceived as longer still.",
      "The implication is uncomfortable for agencies with fixed budgets. Adding a bus to a route reduces average wait time, but so does installing a sign that displays accurate arrival predictions — and the sign is dramatically cheaper. In a 2016 study of a mid-sized system, riders at stops with countdown displays reported wait times close to the true value, while riders at stops without them overestimated their waits by an average of 68 percent.",
      "Critics argue that this line of reasoning risks substituting the management of perception for the delivery of service. A rider who correctly perceives an eighteen-minute wait is still waiting eighteen minutes. The counterargument is not that information replaces frequency but that agencies which ignore perception will systematically misjudge which improvements riders actually value.",
      "Both positions accept the underlying finding. What they dispute is what an agency owes its riders: the shortest possible trip, or the most honest possible account of the trip they are about to take.",
    ],
  },
];

export const passageById = Object.fromEntries(passages.map((p) => [p.id, p]));
