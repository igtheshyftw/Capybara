# -*- coding: utf-8 -*-
"""
Write an Email prompts. All original.

Bullet functions come from the task's own taxonomy: purpose, request,
details, thanks. The page uses the function to decide which cues to look
for when it checks whether a bullet was addressed.
"""
EMAILS = [
dict(id="coursefit", to="Dr. Reyes", subject="Question about ANTH 210",
  scenario=("You are choosing modules for next term and you are interested in ANTH 210, which is "
            "taught by Dr. Reyes. The course description mentions fieldwork, but it does not say "
            "how much previous experience students need. You want to know whether the course "
            "would suit you before you register."),
  bullets=[("purpose", "Explain why the course interests you."),
           ("request", "Ask what preparation or background the course expects."),
           ("thanks", "Thank Dr. Reyes for taking the time to respond.")],
  topic=["course", "fieldwork", "module", "register", "term"],
  model=("Dear Dr. Reyes,\n\nI am writing about ANTH 210, which I am hoping to take next term. I "
         "became interested in the subject after a first-year module on kinship, and the fieldwork "
         "component attracts me most, since I would like to base my dissertation on community "
         "research.\n\nBefore I register, could you tell me what background the course assumes? In "
         "particular, I would like to know whether students are expected to have any previous "
         "fieldwork experience, and whether there is reading I should do over the break.\n\nThank "
         "you very much for taking the time to reply.\n\nBest regards,\nMaya Lindqvist")),

dict(id="heater", to="Building Office", subject="Heating not working in Flat 4B",
  scenario=("The heating in your flat has not worked for three days and the weather has turned "
            "cold. You have already reported it once through the online form but have had no "
            "reply. You are at home most mornings this week."),
  bullets=[("purpose", "Describe the problem and say when it started."),
           ("request", "Ask for someone to come and repair it."),
           ("details", "Say when you are available to let an engineer in.")],
  topic=["heating", "flat", "cold", "repair", "engineer"],
  model=("Dear Building Office,\n\nI am writing about the heating in Flat 4B, which stopped working "
         "on Monday evening. The radiators are completely cold, although the hot water still runs "
         "normally. I reported the fault through the online form on Tuesday but have not yet had a "
         "reply.\n\nCould an engineer be sent this week? The temperature has dropped sharply and "
         "the flat is now difficult to work in.\n\nI am at home every morning until one o'clock, "
         "and I can also be there on Friday afternoon if that is easier. Please let me know what "
         "time to expect someone.\n\nThank you for your help.\n\nYours sincerely,\nTomas Beltran")),

dict(id="dinner", to="Professor Okafor", subject="Department dinner on 14 March",
  scenario=("You have been invited to your department's annual dinner, but you will be away at a "
            "family event that weekend. You would like to decline politely and you would also like "
            "to stay involved with the department's social events."),
  bullets=[("thanks", "Thank Professor Okafor for the invitation."),
           ("purpose", "Explain why you cannot attend."),
           ("request", "Ask to be told about future events.")],
  topic=["dinner", "invitation", "attend", "event", "department"],
  model=("Dear Professor Okafor,\n\nThank you very much for inviting me to the department dinner on "
         "14 March. I was glad to be included, and I had been looking forward to meeting the new "
         "research students.\n\nUnfortunately I will not be able to come, because my sister is getting "
         "married that weekend and I will be away from the city from the Thursday until the "
         "following Monday, so there is no way for me to return in time.\n\nI would be grateful if "
         "you could keep me on the list for future events, as I would very much like to attend the "
         "next one.\n\nWith best wishes,\nNadia Haddad")),

dict(id="loan", to="Library Loans Desk", subject="Request to extend a loan",
  scenario=("A book you borrowed is due back on Friday, but you still need it to finish an essay "
            "that is due the following Wednesday. The library website says extensions are possible "
            "but must be requested in writing."),
  bullets=[("purpose", "Explain why you still need the book."),
           ("request", "Ask for the loan to be extended."),
           ("details", "Say how long you need it for.")],
  topic=["book", "loan", "essay", "extend", "library"],
  model=("Dear Loans Desk,\n\nI am writing to ask whether the loan on Patterns of Settlement, which "
         "is due back this Friday, could be extended. I am using it for an essay on rural land use "
         "that must be submitted next Wednesday, and two of the chapters are central to my "
         "argument.\n\nCould the book be renewed until Thursday 20 November? That would give me "
         "time to finish the essay and return it the following morning.\n\nIf the title has been "
         "requested by someone else, I understand that an extension may not be possible, and I "
         "would be happy to return it on time.\n\nThank you for considering this.\n\nYours "
         "faithfully,\nEun-ji Park")),

dict(id="club", to="Sofia Marchetti", subject="Joining the photography society",
  scenario=("You saw a poster for the university photography society and you would like to join. "
            "The poster gives the president's email address but does not say when the society "
            "meets or whether beginners are welcome."),
  bullets=[("purpose", "Explain why you want to join."),
           ("request", "Ask when and where the society meets."),
           ("details", "Mention any experience or equipment you have.")],
  topic=["photography", "society", "join", "meet", "camera"],
  model=("Dear Sofia,\n\nI saw the photography society's poster in the library this morning and I "
         "would very much like to join. I have been taking photographs since school, mostly of "
         "buildings, and I would like to learn from people who work in other styles.\n\nCould you "
         "tell me when and where the society meets, and whether there is a membership fee? I would "
         "also like to know whether complete beginners come along, since one of my flatmates is "
         "interested too.\n\nI own a digital camera and a tripod, and I am happy to bring them to "
         "meetings if that is useful.\n\nThank you, and I hope to hear from you soon.\n\nBest "
         "wishes,\nArun Chatterjee")),

dict(id="shift", to="Mr. Danso", subject="Request to change a shift",
  scenario=("You work part-time in a campus shop. You are scheduled to work on Thursday afternoon, "
            "but an examination has been moved to that time. You would like to change the shift "
            "and you are free at several other times."),
  bullets=[("purpose", "Explain why you cannot work the shift."),
           ("request", "Ask whether the shift can be changed."),
           ("details", "Say when else you could work.")],
  topic=["shift", "work", "examination", "Thursday", "swap"],
  model=("Dear Mr. Danso,\n\nI am writing about my shift on Thursday 12 May, from two until six. "
         "My statistics examination has been rescheduled to that afternoon, so I will not be able "
         "to work.\n\nWould it be possible to move the shift to another day that week? I could "
         "work all day on Wednesday, or on Friday after eleven, and I am also free on the "
         "Saturday morning if the shop needs cover then.\n\nI am sorry for the short notice; the "
         "change to the timetable was only announced yesterday. I am happy to swap with anyone "
         "who would prefer the Thursday.\n\nThank you for your understanding.\n\nBest "
         "regards,\nLeila Amrani")),

dict(id="conference", to="Conference Registration", subject="Dietary requirements",
  scenario=("You have registered for a two-day academic conference. The registration form did not "
            "ask about food, and the programme says lunch is provided on both days. You cannot eat "
            "dairy products."),
  bullets=[("purpose", "Explain your dietary requirement."),
           ("request", "Ask whether suitable food can be arranged."),
           ("thanks", "Thank the organisers for their help.")],
  topic=["conference", "lunch", "dietary", "food", "registration"],
  model=("Dear Registration Team,\n\nI registered last week for the Coastal Systems conference on "
         "8 and 9 June, and I am writing about the lunches provided on both days. I am unable to "
         "eat dairy products of any kind, including butter and cheese, and the registration form "
         "did not include a question about food.\n\nCould a dairy-free option be arranged for me? "
         "If that is difficult, I would be glad simply to know in advance what will be served so "
         "that I can bring something suitable.\n\nMy registration reference is CS-2214.\n\nThank "
         "you very much for your help with this.\n\nYours sincerely,\nHenrik Solberg")),

dict(id="groupmeet", to="Bianca Ferreira", subject="Meeting about the group report",
  scenario=("You are working with three classmates on a group report that is due in two weeks. "
            "Nobody has arranged a meeting yet and you would like to organise one. You are writing "
            "to one member of the group who is coordinating."),
  bullets=[("purpose", "Suggest a time and place to meet."),
           ("request", "Ask whether the others are free then."),
           ("details", "Say what everyone should bring or prepare.")],
  topic=["meeting", "report", "group", "deadline", "prepare"],
  model=("Hi Bianca,\n\nSince the report is due on the 24th and we have not met yet, I thought I "
         "would suggest a time. Would Wednesday at four in the library group room work? I have "
         "booked it provisionally for an hour, and it is easy to cancel.\n\nCould you check with "
         "Marco and Tade whether that suits them? If Wednesday is difficult, I am also free on "
         "Thursday morning before eleven.\n\nIt would help if everyone came with a rough outline "
         "of their own section, even if it is only notes. That way we can see where the gaps and "
         "the overlaps are before we start writing.\n\nThanks, and see you soon.\n\nAmara")),
]
