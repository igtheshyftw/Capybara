# -*- coding: utf-8 -*-
"""
Write an Email prompts, set 2: university study and administration.
All original. Same standards as set 1 (see scripts/build_writing.py).
"""
EMAILS = [
dict(id="labslot", to="Lab Coordinator", subject="Request to change lab section",
  scenario=("You are registered for the Tuesday afternoon chemistry lab, but you have just been "
            "given a weekly clinical placement at the same time. The Thursday lab covers the same "
            "material and the department website says changes are possible in the first two weeks."),
  bullets=[("purpose", "Explain why you cannot attend your current section."),
           ("request", "Ask to be moved to the Thursday section."),
           ("details", "Say which sections you are talking about.")],
  topic=["lab", "Tuesday", "Thursday", "section", "placement"],
  model=("Dear Lab Coordinator,\n\nI am writing about my chemistry lab section. I am registered "
         "for the Tuesday afternoon group, but I have just been given a clinical placement that "
         "runs at exactly the same hour every week, so I will not be able to attend.\n\nCould I be "
         "moved to the Thursday section instead? I understand that it covers the same experiments "
         "in the same order, and Thursday afternoons are completely free in my timetable.\n\nMy "
         "student number is 41-8820, and I am happy to take whichever Thursday group has room. "
         "Please let me know if anything else is needed from me.\n\nBest regards,\nIvan Petrovic")),

dict(id="transcript", to="Registry Office", subject="Transcript for a scholarship application",
  scenario=("You are applying for a scholarship and the awarding body needs an official transcript "
            "sent directly by your university. The deadline is in ten days. The registry website "
            "explains how to order a transcript but not how to have one sent to a third party."),
  bullets=[("purpose", "Explain what you need and why."),
           ("request", "Ask how to have the transcript sent directly."),
           ("details", "Give the deadline and the name of the awarding body.")],
  topic=["transcript", "scholarship", "deadline", "registry", "application"],
  model=("Dear Registry Office,\n\nI am writing to ask for help with an official transcript. I am "
         "applying for the Halloran Foundation scholarship, and the foundation will only accept a "
         "transcript that is sent to it directly by the university rather than forwarded by the "
         "student.\n\nCould you tell me how to arrange this, and whether there is a form I should "
         "complete? I would also like to know how long the process usually takes.\n\nThe "
         "application deadline is 30 April, so the transcript would need to leave the office "
         "before then. My student number is 22-1094.\n\nThank you for your help.\n\nYours "
         "sincerely,\nRosa Delgado")),

dict(id="extension", to="Dr. Halvorsen", subject="Extension request for the ECON 240 essay",
  scenario=("You were ill for most of last week and could not work on an essay that is due on "
            "Monday. You have a note from the university health centre. The module handbook says "
            "extensions must be requested before the deadline, not afterwards."),
  bullets=[("purpose", "Explain why you are behind with the essay."),
           ("request", "Ask for a short extension."),
           ("details", "Say how much extra time you need and what evidence you can provide.")],
  topic=["essay", "extension", "deadline", "illness", "health centre"],
  model=("Dear Dr. Halvorsen,\n\nI am writing about the ECON 240 essay, which is due on Monday. I "
         "was ill for most of last week and spent three days unable to read or write anything, so "
         "I have lost almost all of my drafting time.\n\nCould the deadline be extended for me? "
         "Four extra days would be enough; that would let me finish the analysis section properly "
         "rather than submitting something unfinished.\n\nI saw a doctor at the university health "
         "centre on Wednesday and I can send the note she gave me straight away if that is "
         "required.\n\nThank you for considering this.\n\nBest regards,\nYusuf Baran")),

dict(id="advisor", to="Dr. Whitmore", subject="Meeting about changing my major",
  scenario=("You are in your second year and you are seriously considering changing your major "
            "from biology to environmental science. You want to talk it through with your academic "
            "advisor before the deadline for changes at the end of the month."),
  bullets=[("purpose", "Explain what you want to discuss."),
           ("request", "Ask for a meeting."),
           ("details", "Say when you are free and mention the deadline.")],
  topic=["major", "meeting", "deadline", "biology", "environmental"],
  model=("Dear Dr. Whitmore,\n\nI am writing because I am thinking about changing my major from "
         "biology to environmental science, and I would like your advice before I decide. Two of "
         "my second-year modules have pushed me towards fieldwork, and I am no longer sure that "
         "the biology pathway is the right one for me.\n\nCould we meet for half an hour in the "
         "next two weeks? The deadline for changes is 31 October, so I would rather not leave it "
         "late.\n\nI am free on Monday and Wednesday mornings and after three on Friday. I will "
         "bring my transcript.\n\nThank you very much.\n\nBest wishes,\nHanna Kowalczyk")),

dict(id="reference", to="Professor Ortega", subject="Request for a reference",
  scenario=("You are applying for a summer research programme and you need one academic reference. "
            "Professor Ortega taught you a module last year in which you did well, and supervised "
            "your project. References are submitted through an online form."),
  bullets=[("purpose", "Explain what you are applying for."),
           ("request", "Ask whether Professor Ortega would write the reference."),
           ("details", "Say how the reference is submitted and when it is due.")],
  topic=["reference", "research", "programme", "form", "deadline"],
  model=("Dear Professor Ortega,\n\nI am applying for the Kestrel summer research programme in "
         "marine ecology, and the application asks for one academic reference. I am writing to ask "
         "whether you would be willing to write it for me. You supervised my second-year project "
         "on tidal species, which is the closest work I have done to what the programme "
         "involves.\n\nThe reference is submitted through an online form; the organisers send you "
         "a link once I name you, and it is due on 15 February.\n\nI can send you my statement and "
         "my transcript if that would help.\n\nThank you for considering this.\n\nYours "
         "sincerely,\nDiego Marchetti")),

dict(id="examclash", to="Examinations Office", subject="Two examinations at the same time",
  scenario=("The provisional examination timetable has been published and two of your papers are "
            "scheduled for the same morning. You have checked the timetable twice and it is not a "
            "mistake on your part. The office asks students to report clashes within a week."),
  bullets=[("purpose", "Report the clash clearly."),
           ("request", "Ask what will be done about it."),
           ("details", "Give the two papers, the date and your student number.")],
  topic=["examination", "timetable", "clash", "paper", "student number"],
  model=("Dear Examinations Office,\n\nI am writing to report a clash in the provisional "
         "examination timetable. Two of my papers, STAT 210 and GEOG 205, are both scheduled for "
         "the morning of 12 May at nine o'clock, so I cannot sit them as timetabled. My student "
         "number is 30-7741.\n\nCould you tell me how the office deals with this, and whether one "
         "paper will be moved or supervised separately? I would like to know as early as possible, "
         "because my revision plan depends on the order of the examinations.\n\nI have checked the "
         "timetable carefully and both entries are under my own registration.\n\nThank you for "
         "your help.\n\nYours faithfully,\nAmina Sow")),

dict(id="audit", to="Dr. Feldman", subject="Sitting in on PHIL 330",
  scenario=("You would like to attend a philosophy course that is not part of your degree and for "
            "which you will not receive credit. Your own timetable leaves the hour free. You do "
            "not want to take up a place that a registered student needs."),
  bullets=[("purpose", "Explain why the course interests you."),
           ("request", "Ask whether you may attend without taking it for credit."),
           ("thanks", "Thank Dr. Feldman for considering it.")],
  topic=["course", "credit", "attend", "lecture", "seminar"],
  model=("Dear Dr. Feldman,\n\nI am a third-year statistics student, and I am interested in PHIL "
         "330 because the reading list overlaps with the work I am doing on decision theory. The "
         "course is not part of my degree and I am not able to take it for credit.\n\nWould it be "
         "possible for me to sit in on the lectures this term? I would not need marking, feedback "
         "or a seminar place, and I would give up the seat immediately if a registered student "
         "needed it.\n\nThank you for considering this; I understand entirely if the room is "
         "already full.\n\nBest regards,\nOlu Adeyemi")),

dict(id="printcard", to="IT Service Desk", subject="Printing credit not showing",
  scenario=("You paid ten pounds of printing credit onto your student card three days ago. The "
            "payment has left your bank account but the credit has not appeared, and the printers "
            "still refuse your card. You need to print a dissertation chapter this week."),
  bullets=[("purpose", "Describe the problem."),
           ("request", "Ask for the credit to be added."),
           ("details", "Give the amount, the date and what the printer does.")],
  topic=["printing", "credit", "card", "payment", "printer"],
  model=("Dear Service Desk,\n\nI am writing about printing credit that has not appeared on my "
         "student card. I paid ten pounds through the online portal on Monday 4 March. The "
         "payment has left my bank account, but my balance still shows zero and every printer in "
         "the library rejects the card with the message 'insufficient funds'.\n\nCould the credit "
         "be added to my account, or the payment refunded if it cannot be traced? My student "
         "number is 27-3356 and I can forward the bank confirmation.\n\nI need to print a "
         "dissertation chapter by Friday, so a quick reply would help a great deal.\n\nThank "
         "you,\nGrace Mbeki")),

dict(id="studyroom", to="Library Bookings", subject="Booking a group study room",
  scenario=("You and three classmates need a room with a screen for a series of project meetings. "
            "The online booking system only allows one hour at a time and no more than a week "
            "ahead, which is not enough for a project that runs until December."),
  bullets=[("purpose", "Explain what you need the room for."),
           ("request", "Ask whether a longer or repeating booking is possible."),
           ("details", "Say how many people, how long and how often.")],
  topic=["room", "booking", "group", "project", "screen"],
  model=("Dear Library Bookings,\n\nI am writing about the group study rooms on the third floor. "
         "Four of us are working on a design project that runs until December, and we need a room "
         "with a screen so that we can share drawings while we talk.\n\nWould it be possible to "
         "make a repeating booking rather than a single hour? We would like two hours every "
         "Wednesday afternoon until the end of term.\n\nIf a standing booking is not allowed, "
         "could you tell me whether there is a longer slot we could reserve each week instead? "
         "Four seats would be enough.\n\nThank you for your help.\n\nBest wishes,\nSanjay Rao")),

dict(id="lostcard", to="Campus Services", subject="Lost student card",
  scenario=("You lost your student card somewhere on campus yesterday. It opens the residence "
            "building and the library gates, so you cannot get in without it. You have already "
            "checked the lost property box in the main hall."),
  bullets=[("purpose", "Report that the card is lost."),
           ("request", "Ask how to get a replacement."),
           ("details", "Say where and when you lost it and what it gives access to.")],
  topic=["card", "replacement", "residence", "library", "campus"],
  model=("Dear Campus Services,\n\nI am writing to report that I have lost my student card. I last "
         "used it at the library gates on Tuesday afternoon, and I think it fell out of my bag "
         "somewhere between the library and the sports centre. I checked the lost property box in "
         "the main hall this morning and it is not there.\n\nCould you tell me how to obtain a "
         "replacement, and whether there is a fee? I would also like to know whether the old card "
         "can be cancelled, since it opens my residence building.\n\nMy student number is "
         "19-4402.\n\nThank you very much.\n\nBest regards,\nClara Oyelaran")),

dict(id="orientation", to="Student Union Office", subject="Volunteering for orientation week",
  scenario=("You saw a notice asking for students to help new arrivals during orientation week in "
            "September. You have helped with campus tours before and you speak three languages. "
            "The notice does not say how many hours volunteers are expected to give."),
  bullets=[("purpose", "Say why you want to volunteer."),
           ("request", "Ask what the role involves and how many hours are expected."),
           ("details", "Mention relevant experience or skills.")],
  topic=["orientation", "volunteer", "tours", "languages", "September"],
  model=("Dear Student Union Office,\n\nI saw the notice asking for orientation week volunteers "
         "and I would like to take part, because my own first week here was confusing and the "
         "students who showed me around made a real difference.\n\nCould you tell me what the role "
         "involves and how many hours volunteers are expected to give? I would also like to know "
         "whether there is any training beforehand.\n\nI led campus tours for open days last year, "
         "and I speak Portuguese and Mandarin as well as English, which may be useful in "
         "September.\n\nI look forward to hearing from you.\n\nBest wishes,\nJoana Ribeiro")),

dict(id="feedback", to="Ms. Ahlberg", subject="Question about my essay feedback",
  scenario=("You received a mark for an essay along with three short comments. You are not "
            "disputing the mark, but you cannot tell from the comments what you should do "
            "differently next time. Another essay for the same module is due in a month."),
  bullets=[("purpose", "Explain what you would like to understand better."),
           ("request", "Ask for a short conversation or fuller comments."),
           ("thanks", "Thank Ms. Ahlberg for marking the work.")],
  topic=["essay", "feedback", "comments", "mark", "module"],
  model=("Dear Ms. Ahlberg,\n\nThank you for marking my essay on housing policy and for returning "
         "it so quickly. I am not writing to question the mark; I would like to understand the "
         "comments better so that the next essay is stronger.\n\nThe note about my argument being "
         "'under-evidenced in the middle section' is the one I am least sure about. Could we speak "
         "for ten minutes after a seminar, or would you be able to point me to a paragraph that "
         "shows what you mean?\n\nThe next essay is due on 8 December, so there is time for me to "
         "work on it.\n\nWith thanks,\nNikola Petkov")),

dict(id="stipend", to="Financial Aid Office", subject="Missing stipend payment",
  scenario=("Your monthly stipend is normally paid on the first working day of the month. It is "
            "now the eighth and nothing has arrived. Your rent is due in a week and your bank "
            "details have not changed since the last payment."),
  bullets=[("purpose", "Explain that the payment has not arrived."),
           ("request", "Ask what has happened and when it will be paid."),
           ("details", "Give the amount, the usual date and your reference.")],
  topic=["stipend", "payment", "rent", "account", "reference"],
  model=("Dear Financial Aid Office,\n\nI am writing because my monthly stipend has not arrived. "
         "The payment of 620 euros is normally made on the first working day of the month, but "
         "nothing has reached my account and today is the eighth. My bank details have not changed "
         "since the payment in September.\n\nCould you check what has happened and tell me when "
         "the money will be sent? My award reference is FA-2207.\n\nMy rent is due on the "
         "fifteenth, so I would be grateful for an answer this week, even if the payment itself "
         "takes longer.\n\nThank you for your help.\n\nYours sincerely,\nLeo Fitzgerald")),
]
