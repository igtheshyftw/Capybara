# -*- coding: utf-8 -*-
"""
Write an Email prompts, set 4: work, volunteering and student organisations.
All original. Same standards as set 1 (see scripts/build_writing.py).
"""
EMAILS = [
dict(id="internship", to="Ms. Cardoso", subject="Summer internship application",
  scenario=("You applied for a summer internship five weeks ago. The advertisement said candidates "
            "would hear back within three weeks. You have another offer that you must answer by "
            "the end of next week, and you would prefer the internship."),
  bullets=[("purpose", "Explain why you are writing now."),
           ("request", "Ask about the state of your application."),
           ("details", "Give the role, the date you applied and your deadline.")],
  topic=["internship", "application", "offer", "deadline", "role"],
  model=("Dear Ms. Cardoso,\n\nI am writing about my application for the summer data internship, "
         "which I submitted on 3 February. The advertisement said that candidates would hear "
         "within three weeks, and as five have now passed I wanted to check that my application "
         "had arrived.\n\nCould you tell me whether a decision has been made, or when one is "
         "expected? I ask because I have been offered another position and must reply by Friday "
         "the 21st, although this internship is my first choice.\n\nI am glad to send any further "
         "information you need.\n\nThank you for your time.\n\nYours sincerely,\nRafael Duarte")),

dict(id="museumvol", to="Volunteer Coordinator", subject="Offering to volunteer at the museum",
  scenario=("You would like to volunteer at the city museum on Saturdays. You are studying history "
            "and you have worked at an information desk before. The museum's page mentions "
            "volunteers but gives no details about how to apply."),
  bullets=[("purpose", "Say why you want to volunteer there."),
           ("request", "Ask how to apply and what roles exist."),
           ("details", "Mention your availability and relevant experience.")],
  topic=["museum", "volunteer", "Saturday", "history", "experience"],
  model=("Dear Volunteer Coordinator,\n\nI am writing because I would like to volunteer at the "
         "city museum. I am a second-year history student, and the Roman collection is the "
         "reason I chose to study here, so I would value the chance to help visitors use "
         "it.\n\nCould you tell me how to apply, and what kinds of role volunteers take? I would "
         "also like to know whether there is a minimum commitment.\n\nI am free every Saturday "
         "and on Thursday afternoons, and I spent last summer on the information desk at a "
         "regional library, so I am used to answering questions from the public.\n\nThank you very "
         "much.\n\nBest wishes,\nElena Marchetti")),

dict(id="waitlist", to="Workshop Registration", subject="Place on the field methods workshop",
  scenario=("A two-day field methods workshop you want to attend is shown as full. You have been "
            "told that places sometimes become free in the last week. The workshop would be "
            "directly useful for a project you start in the spring."),
  bullets=[("purpose", "Explain why the workshop matters to you."),
           ("request", "Ask to be put on a waiting list."),
           ("details", "Say how quickly you could take a place if one came up.")],
  topic=["workshop", "waiting list", "place", "project", "field"],
  model=("Dear Workshop Registration,\n\nI am writing about the field methods workshop on 4 and 5 "
         "April, which the booking page shows as full. I am interested because I begin a survey "
         "project in the spring and the sampling sessions cover exactly the techniques I will "
         "need.\n\nCould I be added to a waiting list? I would like to know whether places "
         "usually become free, and how much notice I would have if one did.\n\nI live ten minutes "
         "from the department and could take a place at a day's notice, including a cancellation "
         "on the morning itself.\n\nThank you for considering this.\n\nBest regards,\nHugo "
         "Lindgren")),

dict(id="tutoroffer", to="Learning Support Centre", subject="Offering to tutor first-year statistics",
  scenario=("The learning support centre employs student tutors. You did well in first-year "
            "statistics and you have helped classmates informally for two terms. The centre's "
            "notice says tutors are recruited each September but does not say how."),
  bullets=[("purpose", "Explain what you would like to do."),
           ("request", "Ask how tutors are recruited."),
           ("details", "Give your background and when you could work.")],
  topic=["tutor", "statistics", "centre", "hours", "recruit"],
  model=("Dear Learning Support Centre,\n\nI am writing because I would like to work as a student "
         "tutor for first-year statistics. I took the module in my first year and finished with a "
         "distinction, and I have spent two terms helping classmates with the weekly problem sets, "
         "which I enjoy more than I expected.\n\nCould you tell me how tutors are recruited, and "
         "whether applications are open now? I would also like to know whether any training is "
         "provided.\n\nI could work up to six hours a week, ideally on Monday and Wednesday "
         "afternoons.\n\nThank you for your time.\n\nYours sincerely,\nBeatriz Silva")),

dict(id="clubkit", to="Club Treasurer", subject="Replacing the club's rowing equipment",
  scenario=("You are the equipment officer of a small rowing club. Two sets of oars are cracked "
            "and cannot safely be used. There is money in the equipment budget, but purchases over "
            "two hundred pounds need the treasurer's approval."),
  bullets=[("purpose", "Explain what needs replacing and why."),
           ("request", "Ask for approval to buy replacements."),
           ("details", "Give the cost and what is affected if you wait.")],
  topic=["oars", "equipment", "budget", "approval", "cost"],
  model=("Dear Treasurer,\n\nI am writing about the club's equipment. Two sets of oars have "
         "cracked along the shaft and our coach has taken them out of use, which leaves us four "
         "short for a full outing.\n\nCould you approve the purchase of replacements? The supplier "
         "we have used before quotes 340 pounds for two sets including delivery, which is within "
         "the equipment budget for this year.\n\nIf the order goes in this week the oars arrive "
         "before the regatta on the 18th; if we wait until the next committee meeting, the novice "
         "crews will lose three sessions.\n\nThank you for looking at this.\n\nBest "
         "regards,\nSiobhan Kelly")),

dict(id="venue", to="Events Office", subject="Room for a society film night",
  scenario=("Your film society wants to hold a screening for about forty people one Friday "
            "evening. You need a room with a projector and the ability to darken the windows. "
            "Bookings for evening events go through the events office."),
  bullets=[("purpose", "Say what the event is."),
           ("request", "Ask whether a suitable room is available."),
           ("details", "Give the date, the numbers and what equipment you need.")],
  topic=["room", "projector", "screening", "Friday", "society"],
  model=("Dear Events Office,\n\nI am writing on behalf of the film society. We would like to hold "
         "a screening and short discussion on Friday 22 November, from seven until about ten in "
         "the evening.\n\nCould you tell me whether a suitable room is free that evening? We "
         "expect around forty people, and we need a projector, speakers and windows that can be "
         "darkened; a flat floor would be better than a steep lecture theatre so that we can "
         "arrange chairs.\n\nI would also like to know whether a technician has to be present.\n\n"
         "Thank you for your help.\n\nBest wishes,\nKarim Belhaj")),

dict(id="speaker", to="Dr. Moreau", subject="Invitation to speak to our society",
  scenario=("You help run a student economics society. You would like to invite a researcher whose "
            "recent work on regional inequality you have read. The society meets on Wednesday "
            "evenings and can cover travel costs but cannot pay a fee."),
  bullets=[("purpose", "Explain who you are and why you are writing."),
           ("request", "Invite Dr. Moreau to speak."),
           ("details", "Give the format, the dates and what you can offer.")],
  topic=["talk", "society", "Wednesday", "travel", "audience"],
  model=("Dear Dr. Moreau,\n\nI am writing on behalf of the student economics society, which meets "
         "on Wednesday evenings. Several of us read your paper on regional inequality in the "
         "spring, and it produced the longest discussion we had all term.\n\nWould you be willing "
         "to come and speak to us? The format is a talk of about thirty minutes followed by "
         "questions, with an audience of roughly fifty students.\n\nWe have dates free on 12 and "
         "26 February. We are able to cover travel and a meal afterwards, although as a student "
         "society we cannot offer a fee.\n\nThank you for considering this.\n\nYours "
         "sincerely,\nPeter Ivanov")),

dict(id="sponsor", to="Mr. Alvarez", subject="Sponsorship for our spring tournament",
  scenario=("Your badminton club is organising a tournament and is looking for small local "
            "sponsors. A sports shop near campus has supported student events before. You can "
            "offer publicity but you have never approached a business in writing."),
  bullets=[("purpose", "Introduce the event and why you are writing."),
           ("request", "Ask whether the shop would sponsor it."),
           ("details", "Say what you would offer in return.")],
  topic=["tournament", "sponsor", "club", "publicity", "event"],
  model=("Dear Mr. Alvarez,\n\nI am writing on behalf of the university badminton club. We are "
         "organising a spring tournament on 9 March, with twelve teams and around two hundred "
         "spectators expected across the day.\n\nWould your shop be willing to sponsor the event? "
         "We are looking for contributions of around a hundred pounds, or equipment of similar "
         "value, to cover shuttlecocks and the hire of the hall.\n\nIn return we would print your "
         "name on the posters and the programme, put a banner in the hall, and thank you in the "
         "announcements and on our social media.\n\nThank you for considering this.\n\nBest "
         "regards,\nJun-ho Kang")),

dict(id="rota", to="Shelter Volunteer Rota", subject="Swapping a volunteering shift",
  scenario=("You volunteer at a night shelter every other Sunday. Your next shift falls on the "
            "same day as a family celebration. Volunteers are asked to arrange swaps themselves "
            "and then tell the coordinator."),
  bullets=[("purpose", "Explain why you cannot do the shift."),
           ("request", "Ask for help finding a swap."),
           ("details", "Say which shift it is and what you can offer in exchange.")],
  topic=["shift", "swap", "Sunday", "shelter", "rota"],
  model=("Dear Rota Team,\n\nI am writing about my shift at the shelter on Sunday 7 December, from "
         "six until eleven. My grandmother's eightieth birthday falls on the same evening and the "
         "whole family will be there, so I cannot come.\n\nCould you help me find someone to swap "
         "with, or circulate the shift to the group? I have already asked the two volunteers I "
         "know best and neither is free that night.\n\nI am happy to take any Sunday in January in "
         "exchange, and I could also cover a weekday evening at short notice if that is more "
         "useful.\n\nThank you for your help.\n\nBest wishes,\nAnneke de Vries")),

dict(id="ticketrefund", to="Harbour Theatre Box Office", subject="Refund for a cancelled performance",
  scenario=("A play you booked for was cancelled and moved to a date when you will be abroad. The "
            "theatre's message offered new tickets but did not mention refunds. You paid for two "
            "seats by card six weeks ago."),
  bullets=[("purpose", "Explain why the new date does not work."),
           ("request", "Ask for a refund rather than new tickets."),
           ("details", "Give the booking reference, the seats and the amount.")],
  topic=["tickets", "refund", "performance", "booking", "seats"],
  model=("Dear Box Office,\n\nI am writing about booking HT-20417 for Friday 11 October, which was "
         "cancelled and has been moved to 29 November. I will be abroad for the whole of that "
         "week, so the new date is unfortunately no use to me.\n\nCould the tickets be refunded "
         "instead? The booking was for two seats in row H at 27 pounds each, paid by card on 2 "
         "September.\n\nI would rather have the refund than a credit note, since I do not expect "
         "to be back in the city before the spring.\n\nThank you for your help with this.\n\nYours "
         "faithfully,\nLucia Ferraro")),

dict(id="certificate", to="Programme Office", subject="Certificate for a summer course",
  scenario=("You completed a four-week summer course in June. Your employer will reimburse the fee "
            "only if you can show a certificate of completion, which you were told would be "
            "emailed but never received."),
  bullets=[("purpose", "Explain what you need and why."),
           ("request", "Ask for the certificate to be sent."),
           ("details", "Give the course, the dates and your details.")],
  topic=["certificate", "course", "June", "employer", "completion"],
  model=("Dear Programme Office,\n\nI am writing to ask for a certificate of completion. I took "
         "the four-week summer course in project management from 3 to 28 June, and I was told at "
         "the closing session that certificates would be emailed within a month. Nothing has "
         "arrived, and I have checked my spam folder.\n\nCould the certificate be sent to me, "
         "either by email or by post? My employer will only reimburse the course fee if I can "
         "show it, and their claims window closes at the end of September.\n\nMy registration "
         "number is SP-1180.\n\nThank you very much.\n\nBest regards,\nOmar Haddad")),

dict(id="referee", to="Ms. Lindqvist", subject="Would you act as my referee?",
  scenario=("You worked in a bookshop for two summers and Ms. Lindqvist was your manager. You are "
            "now applying for a graduate job that asks for one employment reference. You have not "
            "been in touch with her since last September."),
  bullets=[("purpose", "Explain what you are applying for."),
           ("request", "Ask whether she would act as your referee."),
           ("details", "Say what the reference involves and when it is needed.")],
  topic=["reference", "referee", "bookshop", "application", "form"],
  model=("Dear Ms. Lindqvist,\n\nI hope you are well. I am applying for a graduate trainee post "
         "with a publishing company, and the application asks for one reference from an employer. "
         "I am writing to ask whether you would be willing to act as my referee.\n\nYou would "
         "receive a short online form asking about my reliability and how I worked with customers, "
         "and it should take no more than ten minutes. References are due by 14 "
         "January.\n\nI worked on the counter and in the stockroom for the summers of 2023 and "
         "2024, if that helps you place me.\n\nThank you very much.\n\nBest wishes,\nMei Tanaka")),

dict(id="resign", to="Mr. Osei", subject="Notice of leaving the café",
  scenario=("You have worked part-time in a café for over a year and you are leaving because your "
            "final-year timetable has changed and your dissertation starts in January. Your "
            "contract asks for four weeks' notice. You want to leave on good terms."),
  bullets=[("purpose", "Say that you are leaving and why."),
           ("request", "Ask to agree a final working day."),
           ("thanks", "Thank Mr. Osei for the past year.")],
  topic=["notice", "shifts", "café", "final", "dissertation"],
  model=("Dear Mr. Osei,\n\nI am writing to give notice that I will be leaving the café. My "
         "final-year timetable has changed and my dissertation begins in January, and I do not "
         "think I can keep up my shifts and do either of them properly.\n\nMy contract asks for "
         "four weeks, so could we agree on Sunday 15 December as my last day? I am happy to work "
         "extra shifts over the busy period before then, and to show the new starter how the "
         "morning opening works.\n\nThank you for a good year; I have learned a great deal "
         "here.\n\nBest wishes,\nDaniela Rusu")),
]
