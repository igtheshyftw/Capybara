# -*- coding: utf-8 -*-
"""Read in Daily Life, batch 1. kinds: email, notice, memo, poster, message, schedule."""
COMPLETE_THE_WORDS = []
ACADEMIC = []
DAILY_LIFE = [
dict(id="labinduction", kind="email", subject="Lab induction - Thursday", body=[
  "Hi Daniel,",
  "You are booked for the lab induction on Thursday at 10:00 in Room S12. Please bring your "
  "student card and wear closed shoes; anyone in sandals will be asked to come back another day.",
  "The session lasts about forty minutes. You cannot book bench time until you have completed it.",
  "Regards,", "Amara Osei", "Lab Technician"],
  questions=[
    dict(type="main idea", stem="What is the main purpose of the email?",
      options=["To confirm an appointment and explain its requirements",
               "To reschedule an induction session",
               "To warn Daniel that he has missed a session",
               "To explain how to apply for a student card"], key=0),
    dict(type="inference", stem="What is suggested about students who arrive in sandals?",
      options=["They will be given protective footwear",
               "They will not complete the induction that day",
               "They will have to pay a fee",
               "They will be reported to the department"], key=1)]),

dict(id="libraryhours", kind="notice", subject="Library opening hours: winter break", body=[
  "The main library will close at 6:00 P.M. from Monday 16 December and will not open at all "
  "between 24 and 26 December.",
  "The 24-hour study space on the ground floor stays open throughout the break, including on "
  "public holidays. Access is by student card only; visitors cannot be signed in during this period.",
  "Books due between 16 December and 2 January have been renewed automatically. Nothing needs to "
  "be returned until term begins, and no fines will be charged over the break.",
  "Staff will answer enquiries by email, but the help desk will not be staffed."],
  questions=[
    dict(type="detail", stem="What is available throughout the break?",
      options=["The help desk", "The ground-floor study space",
               "Visitor sign-in", "Book returns"], key=1),
    dict(type="negative detail",
      stem="All of the following are stated about the break EXCEPT",
      options=["loans have been extended automatically",
               "no fines will apply",
               "the study space requires a student card",
               "the main library will open at a later hour"], key=3),
    dict(type="inference", stem="What is suggested about students who have a question during the break?",
      options=["They should visit the help desk in person",
               "They should send their question by email",
               "They will get no help until term begins",
               "They should ask a different library"], key=1)]),

dict(id="printermove", kind="memo",
  meta=[["To", "All staff"], ["From", "Facilities"], ["Re", "Printer relocation"]], body=[
  "The third-floor printer will move to the corridor outside Room 304 on Friday. The move takes "
  "about two hours, during which the machine will be offline.",
  "Print jobs sent while it is offline will be held and released automatically once it is running "
  "again. There is no need to resend them."],
  questions=[
    dict(type="detail", stem="What will happen to print jobs sent during the move?",
      options=["They will be cancelled", "They will be held and printed later",
               "They will go to another floor", "They must be sent again"], key=1),
    dict(type="main idea", stem="What is the memo mainly about?",
      options=["A change in printing costs", "A temporary interruption to a service",
               "A new printer being purchased", "A change to room numbers"], key=1)]),

dict(id="cinema", kind="message", body=[
  "Yuki: Are we still on for the 3:15 showing?",
  "Sam: The 3:15 sold out while I was in class. I got two for 6:40 instead.",
  "Yuki: That works. Should we eat first, then?",
  "Sam: Let's meet at the noodle place at 5. It fills up after 5:30."],
  questions=[
    dict(type="detail", stem="Why did Sam buy tickets for a later showing?",
      options=["The earlier one was sold out", "Yuki had a class until five",
               "The restaurant was busy", "The earlier showing was cancelled"], key=0),
    dict(type="inference", stem="Why does Sam suggest meeting at five?",
      options=["The film starts at five",
               "To get a table before the restaurant is busy",
               "Because the noodle place closes at 5:30",
               "Because Yuki finishes class at five"], key=1)]),

dict(id="langexchange", kind="poster", subject="Language Exchange Evening", body=[
  "Every Wednesday, 7:00 to 9:00 P.M., Student Union Room 2.",
  "Half the evening is in English and half in another language chosen by the group that week. "
  "Bring nothing but yourself; tea and biscuits are provided.",
  "All levels are welcome. You do not need to register, but the room holds forty people and we "
  "have turned people away twice this term.",
  "Organised by the Modern Languages Society."],
  questions=[
    dict(type="main idea", stem="What is the main purpose of the poster?",
      options=["To advertise a weekly event", "To recruit members for a society",
               "To announce a change of room", "To ask students to register in advance"], key=0),
    dict(type="detail", stem="What do participants need to bring?",
      options=["Their own refreshments", "Nothing",
               "A registration form", "A language textbook"], key=1),
    dict(type="inference", stem="What is suggested about arriving late?",
      options=["The event may already have finished", "There may be no space left",
               "The language may have changed", "Tea will no longer be available"], key=1)]),

dict(id="shuttle", kind="schedule", subject="Campus shuttle: weekday timetable",
  head=["Stop", "Service 1", "Service 2", "Service 3"],
  rows=[["North Gate", "07:40", "08:40", "09:40"],
        ["Library", "07:52", "08:52", "09:52"],
        ["Science Park", "08:05", "09:05", "10:05"],
        ["Sports Centre", "08:15", "09:15", "10:15"]],
  body=["The shuttle does not run at weekends. Journeys take longer in wet weather."],
  questions=[
    dict(type="detail", stem="How long does the trip from North Gate to Science Park usually take?",
      options=["About ten minutes", "About twenty-five minutes",
               "About thirty-five minutes", "About an hour"], key=1),
    dict(type="inference", stem="What should a passenger expect on a rainy Tuesday?",
      options=["The shuttle will not run",
               "The trip may take longer than the timetable shows",
               "The shuttle will start earlier", "The Library stop will be skipped"], key=1)]),

dict(id="internship", kind="email", subject="Your application: next steps", body=[
  "Dear Ms Adeyemi,",
  "Thank you for your application for the summer analytics internship. We received more than "
  "three hundred applications this year.",
  "Your application has been shortlisted. The next stage is a one-hour online task, which you may "
  "take at any point before Friday 14 March. A link will reach you within two working days.",
  "Please note that the task cannot be paused once started. We suggest setting aside a quiet hour.",
  "If you have not received the link by Wednesday, write to us rather than waiting.",
  "Best wishes,", "Recruitment Team"],
  questions=[
    dict(type="main idea", stem="What is the main purpose of the email?",
      options=["To offer Ms Adeyemi a position",
               "To explain the next stage of a selection process",
               "To reject an application politely",
               "To ask for additional documents"], key=1),
    dict(type="detail", stem="What is the applicant told about the online task?",
      options=["It must be completed in one sitting", "It lasts three hours",
               "It can be taken after 14 March", "It is marked by a panel"], key=0),
    dict(type="inference", stem="What should the applicant do if Wednesday passes with no link?",
      options=["Reapply for the internship", "Contact the recruitment team",
               "Take the task without a link", "Wait until Friday"], key=1)]),

dict(id="bikeracks", kind="notice", subject="Bicycle parking: east campus", body=[
  "The racks beside the east entrance will be removed on 4 May to make room for a ramp. "
  "Replacement racks with twice the capacity will be installed behind the sports hall the "
  "following week.",
  "Bicycles left at the east entrance after 3 May will be moved to the compound at the rear of "
  "Building F. Owners can collect them free of charge for thirty days."],
  questions=[
    dict(type="detail", stem="Where will the new racks be?",
      options=["At the east entrance", "Behind the sports hall",
               "Inside Building F", "Beside the ramp"], key=1),
    dict(type="negative detail",
      stem="All of the following are stated about the change EXCEPT",
      options=["the new racks will hold more bicycles",
               "bicycles left behind will be moved",
               "collection will be free for a month",
               "the work will be finished by 4 May"], key=3)]),

dict(id="fieldtrip", kind="email", subject="Field trip refund", body=[
  "Hi all,",
  "Saturday's field trip to the wetland centre has been cancelled because the access road is "
  "flooded. The centre cannot say when it will reopen, so we are not setting a new date this term.",
  "Everyone who paid will be refunded to the original card within ten working days. You do not "
  "need to fill in anything.",
  "If your card has since expired, reply to this message and we will arrange a transfer.",
  "Dr Vasquez"],
  questions=[
    dict(type="detail", stem="Why was the trip cancelled?",
      options=["The centre closed permanently", "The road to the centre is flooded",
               "Too few students signed up", "The staff member is unavailable"], key=1),
    dict(type="inference", stem="Who needs to reply to the email?",
      options=["Everyone who paid", "Students whose card is no longer valid",
               "Students who want a new date", "Nobody"], key=1)]),

dict(id="expenses", kind="memo",
  meta=[["To", "All department staff"], ["From", "Finance Office"],
        ["Re", "Expense claims from 1 July"]], body=[
  "From 1 July, expense claims must be submitted through the online portal. Paper forms will no "
  "longer be accepted.",
  "Receipts must be uploaded as images at the time of claiming. Claims without a receipt will be "
  "returned, with one exception: travel by bus or tram under fifteen pounds may be claimed "
  "without one.",
  "Claims should reach us within sixty days of the expense. Late claims need a written "
  "explanation from a head of department, and approval is not automatic.",
  "The portal opens on 24 June so that staff can try it before the change."],
  questions=[
    dict(type="main idea", stem="What is the memo mainly about?",
      options=["A change to how expenses are claimed", "An increase in travel allowances",
               "The closure of the finance office", "A new department head"], key=0),
    dict(type="detail", stem="When may a claim be made without a receipt?",
      options=["For any claim under sixty pounds", "For short bus or tram journeys",
               "When the portal is unavailable", "When a head of department approves it"], key=1),
    dict(type="inference", stem="Why does the portal open on 24 June?",
      options=["So that late claims can be cleared",
               "So that staff can practise before the rules change",
               "Because paper forms run out that week",
               "Because the financial year begins then"], key=1)]),

dict(id="filmsociety", kind="poster", subject="Film Society: Thursday screenings", body=[
  "This term: five films about cities, each introduced by a member of the Geography department.",
  "Screenings start at 7:30 in Lecture Theatre 1 and finish before 10. Entry is two pounds for "
  "members and four for everyone else; membership for the whole term costs five.",
  "Latecomers are admitted only between films, not during them."],
  questions=[
    dict(type="inference", stem="Who would save money by joining the society?",
      options=["Someone attending one screening",
               "Someone attending three or more screenings",
               "Someone who comes only for the introductions",
               "Nobody, since the prices are the same"], key=1),
    dict(type="detail", stem="What is the rule about arriving late?",
      options=["Latecomers are not admitted at all",
               "Latecomers may enter between films",
               "Latecomers pay a higher price",
               "Latecomers must sit at the back"], key=1)]),

dict(id="groupproject", kind="message", body=[
  "Priya: I've put the draft in the shared folder. Section 3 is still just notes.",
  "Tom: Looks good. I can turn Section 3 into prose tonight if nobody else has started it.",
  "Priya: Nobody has. Go ahead.",
  "Tom: One thing, though. The brief says 2,000 words and we're at 2,600.",
  "Priya: Let's cut the background. It repeats what's in the lecture anyway."],
  questions=[
    dict(type="detail", stem="What problem do they identify with the draft?",
      options=["Section 3 is missing entirely", "It is longer than allowed",
               "It has not been shared", "The brief has changed"], key=1),
    dict(type="inference", stem="What will Tom most likely do tonight?",
      options=["Cut the background section", "Write up Section 3",
               "Rewrite the whole draft", "Check the word limit with the tutor"], key=1),
    dict(type="detail", stem="Why does Priya suggest cutting the background?",
      options=["It is the weakest writing", "It duplicates material from the lecture",
               "Tom has not finished it", "It is not mentioned in the brief"], key=1)]),
]
