# -*- coding: utf-8 -*-
"""
Seed content for the Reading module. All passages are original.

Complete the Words notation: [stem]rest -- the bracket marks the letters left
visible, everything after it up to the word boundary is what the test taker
types. The builder derives the stem, the answer and the dash count from this,
so they cannot drift apart.
"""

COMPLETE_THE_WORDS = [
dict(
  id="reefs",
  text=(
    "Coral reefs occupy less than one percent of the ocean floor, yet they "
    "shelter a quarter of all marine species. These [ecosys]tems depend on a "
    "[partn]ership between coral animals and tiny [al]gae that live inside "
    "their [tiss]ues. When water [temper]atures rise, the corals expel their "
    "algae and turn [wh]ite, a condition [know]n as bleaching. Repeated "
    "bleaching [even]ts weaken the reef [struc]ture and reduce the [fo]od "
    "available to fish. Scientists now monitor reef health from satellites, "
    "hoping that early warning will give local communities time to act."
  )),
dict(
  id="press",
  text=(
    "The printing press reached Europe in the middle of the fifteenth century. "
    "Within fifty years, [work]shops in more than two hundred cities were "
    "[produ]cing books in large [numb]ers. Texts that once took a [scr]ibe a "
    "year to copy could be [prin]ted in a single [after]noon. Prices fell, "
    "[litera]cy spread beyond the clergy, and ideas moved [acr]oss borders "
    "faster than any [author]ity could [cont]rol them. The consequences reached "
    "far beyond publishing, reshaping religion, science, and politics across "
    "the continent."
  )),
]

DAILY_LIFE = [
dict(
  id="studyroom",
  kind="email",
  subject="Study Room Booking",
  body=[
    "Hi Priya,",
    "Your booking for Study Room 4 on Thursday has been moved to Study Room 7. "
    "Room 4's whiteboard is being replaced and the work will not finish until "
    "Friday. The new room is on the same floor, just past the printers.",
    "Best,",
    "Marcus",
    "Library Services",
  ],
  questions=[
    dict(type="main idea",
         stem="What is the main purpose of the email?",
         options=["To cancel Priya's study room booking",
                  "To inform Priya that her room has changed",
                  "To explain why a whiteboard is being replaced",
                  "To ask Priya to move to a different floor"],
         key=1),
    dict(type="detail",
         stem="Why was the original room unavailable?",
         options=["A printer was being installed",
                  "The booking system had failed",
                  "Equipment in the room was being replaced",
                  "Another group had reserved it"],
         key=2),
  ]),
dict(
  id="laundry",
  kind="notice",
  subject="Notice to all residents: laundry room upgrade",
  body=[
    "The laundry room in Building C will be closed for equipment replacement "
    "from Monday 3 November to Friday 7 November.",
    "During the closure, residents may use the laundry room in Building A at "
    "no additional charge. Building A is open from 7:00 A.M. to 11:00 P.M. "
    "Please note that Building A has eight machines rather than twelve, so "
    "waiting times may be longer than usual, particularly in the evening.",
    "The new machines in Building C will accept card payment as well as coins. "
    "Instructions will be posted on the wall beside the door, and staff will "
    "be available during the first week to answer questions.",
    "Any items left in Building C after Friday 31 October will be moved to the "
    "storage room beside the main office. Residents can collect them by "
    "showing identification at reception.",
  ],
  questions=[
    dict(type="detail",
         stem="What should residents do during the closure?",
         options=["Wash their clothes at a commercial laundry",
                  "Use the laundry room in another building",
                  "Wait until the new machines are installed",
                  "Collect their items from reception"],
         key=1),
    dict(type="negative detail",
         stem="All of the following are stated about the Building A laundry room EXCEPT",
         options=["it is open until 11:00 P.M.",
                  "it can be used at no extra cost",
                  "it has fewer machines than Building C",
                  "it accepts card payment"],
         key=3),
    dict(type="inference",
         stem="What is suggested about evenings during the closure?",
         options=["Building A will close earlier than usual",
                  "Residents may have to wait to use a machine",
                  "Most residents do their laundry in the morning",
                  "Staff will not be available in the evening"],
         key=1),
  ]),
]

ACADEMIC = [
dict(
  id="ice",
  title="Reading the Ice",
  pattern="Old view -> new view",
  paragraphs=[
    "For most of the twentieth century, geologists treated the world's glaciers "
    "as slow, almost static features of the landscape. Measurements taken at a "
    "handful of sites suggested that ice moved a few metres a year, and that any "
    "change in a glacier's length unfolded over centuries rather than decades.",

    "Satellite observation overturned that picture. Beginning in the 1990s, radar "
    "instruments in orbit could measure the surface of an ice sheet to within a "
    "few centimetres, and repeated passes revealed that some outlet glaciers were "
    "accelerating sharply. One Greenland glacier doubled its speed in under five years.",

    "The revised view holds that meltwater is the key variable. Water that collects "
    "on the surface in summer drains through cracks to the base of the ice, where "
    "it acts as a lubricant between the glacier and the bedrock beneath it. The "
    "more meltwater reaches the base, the faster the ice slides toward the sea.",

    "This reinterpretation matters because it changes the timescale of sea-level "
    "projections. If glaciers respond to warming within years rather than centuries, "
    "coastal planning must work with a much shorter horizon than earlier models assumed.",
  ],
  questions=[
    dict(type="vocabulary",
         stem='The word "overturned" in the passage is closest in meaning to',
         highlight="overturned",
         options=["reversed", "confirmed", "delayed", "complicated"],
         key=0),
    dict(type="detail",
         stem="According to the passage, what did radar instruments make possible?",
         options=["Measuring the surface of an ice sheet very precisely",
                  "Predicting the date of a glacier's collapse",
                  "Drilling to the base of an ice sheet",
                  "Mapping the bedrock beneath the ice"],
         key=0),
    dict(type="reference",
         stem='The word "it" in the phrase "the bedrock beneath it" refers to',
         highlight="the bedrock beneath it",
         options=["the glacier", "the meltwater", "the surface", "the sea"],
         key=0),
    dict(type="paragraph relationship",
         stem="What is the relationship between paragraphs 1 and 2?",
         options=["Paragraph 2 presents evidence that contradicts the view described in paragraph 1.",
                  "Paragraph 2 explains why the measurements in paragraph 1 were taken.",
                  "Paragraph 2 gives further support for the view described in paragraph 1.",
                  "Paragraph 2 describes an exception to a rule stated in paragraph 1."],
         key=0),
    dict(type="inference",
         stem="It can be inferred from the passage that earlier sea-level models",
         options=["assumed glaciers change more slowly than they do",
                  "ignored the effect of meltwater entirely",
                  "were based only on satellite measurements",
                  "proved that coastal planning was unnecessary"],
         key=0),
  ]),
]
