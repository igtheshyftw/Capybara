# -*- coding: utf-8 -*-
"""
Write an Email prompts, set 5: travel, purchases and people you know.
All original. Same standards as set 1 (see scripts/build_writing.py).
"""
EMAILS = [
dict(id="flightchange", to="Anselm Air Customer Service", subject="Changing a flight date",
  scenario=("You booked a flight home for 18 December, but your last examination has been moved to "
            "the 19th. The fare rules mention a change fee but not how to make the change, and the "
            "booking page will not let you edit the date."),
  bullets=[("purpose", "Explain why you need to change the flight."),
           ("request", "Ask how to move the booking."),
           ("details", "Give the booking reference and the dates involved.")],
  topic=["flight", "booking", "December", "date", "fee"],
  model=("Dear Customer Service,\n\nI am writing about booking AN-77320, a flight from Vienna to "
         "Dublin on 18 December. My last university examination has been moved to the 19th, so I "
         "am no longer able to travel on that date.\n\nCould you tell me how to move the booking "
         "to the 21st or 22nd, and what the change would cost? The booking page shows the dates "
         "but will not let me edit them.\n\nI would rather change the existing ticket than cancel "
         "and rebook, but if that is not possible please tell me what the alternative is.\n\nThank "
         "you for your help.\n\nYours faithfully,\nSofia Halvorsen")),

dict(id="earlycheckin", to="Hotel Verano Reception", subject="Arriving early on 3 May",
  scenario=("You have booked two nights at a hotel for a conference. Your train arrives at seven "
            "in the morning but check-in is at three in the afternoon. You are presenting at the "
            "conference at eleven and will be carrying a suitcase."),
  bullets=[("purpose", "Explain when you will arrive."),
           ("request", "Ask about early check-in or leaving luggage."),
           ("details", "Give your booking details and what you need.")],
  topic=["check-in", "luggage", "arrival", "booking", "conference"],
  model=("Dear Reception,\n\nI am writing about my booking for 3 and 4 May under the name Okonjo. "
         "My train reaches the city at seven in the morning, some eight hours before check-in "
         "opens.\n\nWould it be possible to check in early, even at a small charge? If no room is "
         "free that morning, could I leave a suitcase with you until the afternoon "
         "instead?\n\nI am presenting at a conference at eleven that day, so I would like to "
         "arrive there without luggage and, if possible, to change beforehand.\n\nPlease let me "
         "know what is possible, and thank you for your help.\n\nBest regards,\nChidi Okonjo")),

dict(id="visaletter", to="International Student Office", subject="Letter for a visa appointment",
  scenario=("You have a visa appointment at a consulate in three weeks. The consulate requires a "
            "letter from your university confirming that you are enrolled and that your course "
            "continues next year. The letter must be signed and on headed paper."),
  bullets=[("purpose", "Explain what the consulate requires."),
           ("request", "Ask for the letter to be prepared."),
           ("details", "Give the appointment date and what the letter must say.")],
  topic=["letter", "visa", "enrolment", "consulate", "appointment"],
  model=("Dear International Student Office,\n\nI am writing because I have a visa appointment at "
         "the consulate on 28 November, and the consulate requires a letter from the university "
         "for it.\n\nCould the office prepare one for me? The letter has to be on headed paper "
         "and signed, and it must confirm that I am enrolled full time, that my course runs until "
         "June 2027, and that my fees for this year have been paid.\n\nMy student number is "
         "24-6019 and I am on the MSc in civil engineering. I can collect the letter in person "
         "whenever it is ready.\n\nThank you very much for your help.\n\nYours sincerely,\nArjun "
         "Mehta")),

dict(id="carpool", to="Ines Almeida", subject="Getting to the field trip",
  scenario=("Your geography class has a field trip to a coastal site on Saturday. There is no "
            "public transport that arrives before the start time. You have a car with three free "
            "seats and you are writing to a classmate who lives nearby."),
  bullets=[("purpose", "Explain what you are offering."),
           ("request", "Ask whether she wants a lift and who else needs one."),
           ("details", "Give the time, the meeting place and what to bring.")],
  topic=["field trip", "lift", "Saturday", "car", "meet"],
  model=("Hi Ines,\n\nI am writing about Saturday's field trip, because the first bus does not "
         "reach the coast until after we are supposed to start. I am driving and I have three "
         "free seats.\n\nWould you like a lift? Could you also ask around the seminar group and "
         "tell me whether anyone else needs one, so that I know whether the car is "
         "full?\n\nI plan to leave from the car park behind the science building at half past six, "
         "which should get us there by eight. Bring boots and something waterproof; the site is "
         "exposed and we will be outside all morning.\n\nThanks, and see you "
         "Saturday.\n\nLeonie")),

dict(id="faultycharger", to="Voltz Electronics Support", subject="Faulty laptop charger",
  scenario=("A laptop charger you bought online seven weeks ago has stopped working. It only "
            "charges when the cable is held at an angle, and now not at all. The product came with "
            "a two-year guarantee and you still have the order confirmation."),
  bullets=[("purpose", "Describe the fault."),
           ("request", "Ask for a replacement or refund."),
           ("details", "Give the order number, the date and the guarantee.")],
  topic=["charger", "fault", "guarantee", "order", "replacement"],
  model=("Dear Voltz Support,\n\nI am writing about a laptop charger, order VZ-880214, which I "
         "bought on 9 August. It began charging only when the cable was held at an angle, and "
         "since Tuesday it has not worked at all. The laptop charges normally with a borrowed "
         "cable, so the fault is in the charger itself.\n\nCould you send a replacement, or refund "
         "the purchase? The product page states a two-year guarantee, and I still have the order "
         "confirmation.\n\nPlease tell me whether you need the faulty unit returned first, and "
         "whether you provide a label.\n\nThank you for your help.\n\nYours sincerely,\nNils "
         "Eriksson")),

dict(id="lateorder", to="Pagebound Books", subject="Order that has not arrived",
  scenario=("You ordered three books online twelve days ago with five-day delivery. The tracking "
            "page has said 'preparing for dispatch' the whole time and the money has been taken. "
            "One of the books is for a seminar next week."),
  bullets=[("purpose", "Explain that the order has not arrived."),
           ("request", "Ask when it will be sent, or for a refund."),
           ("details", "Give the order number, the date and what it contains.")],
  topic=["order", "delivery", "books", "dispatch", "refund"],
  model=("Dear Pagebound Books,\n\nI am writing about order PB-51103, placed on 6 October with "
         "five-day delivery. Twelve days later the tracking page still says 'preparing for "
         "dispatch', although the payment of 46 pounds was taken at the time.\n\nCould you tell me "
         "when the parcel will be sent? If it cannot be dispatched this week, I would prefer a "
         "refund so that I can buy the books elsewhere.\n\nThe order contains three titles, and "
         "one of them is set reading for a seminar on 24 October, which is why I am "
         "asking.\n\nThank you for your help with this.\n\nBest regards,\nYara Nasser")),

dict(id="groupbooking", to="Lakeside Museum Bookings", subject="Group visit for a student society",
  scenario=("Your architecture society would like to visit a museum together. There are about "
            "twenty-five of you and you would like a guided tour if one is available. The website "
            "lists individual ticket prices only."),
  bullets=[("purpose", "Explain who you are and what you would like to arrange."),
           ("request", "Ask about group rates and guided tours."),
           ("details", "Give numbers, possible dates and how long you would stay.")],
  topic=["group", "tour", "museum", "tickets", "visit"],
  model=("Dear Bookings Team,\n\nI am writing on behalf of the university architecture society. We "
         "would like to visit the museum together this term, mainly for the model collection on "
         "the upper floor.\n\nCould you tell me whether you offer a group rate, and whether a "
         "guided tour can be booked? I would also like to know how far in advance a group has to "
         "reserve.\n\nThere would be about twenty-five of us, all students, and we would stay for "
         "two or three hours. A Wednesday or Friday afternoon in March would suit us best, but we "
         "are flexible.\n\nThank you very much.\n\nBest wishes,\nAntoine Girard")),

dict(id="railcard", to="Northern Rail Customer Care", subject="Student discount not applied",
  scenario=("You bought a monthly season ticket online and the student discount was not applied, "
            "although your railcard is registered to the account and was valid on the day. The "
            "difference is about thirty pounds."),
  bullets=[("purpose", "Explain what went wrong."),
           ("request", "Ask for the difference to be refunded."),
           ("details", "Give the ticket, the date and your railcard details.")],
  topic=["railcard", "discount", "ticket", "refund", "season"],
  model=("Dear Customer Care,\n\nI am writing because the student discount was not applied to a "
         "season ticket I bought on your website on 1 March. The monthly ticket between Ashfield "
         "and Central cost 128 pounds, whereas the discounted fare is 96.\n\nCould the difference "
         "of 32 pounds be refunded? My railcard, number SR-4471, is registered to the account and "
         "was valid on the day of purchase; I checked before buying.\n\nI have kept the "
         "confirmation email and can forward it, along with a photograph of the railcard, if that "
         "helps.\n\nThank you for looking into this.\n\nYours faithfully,\nDamir Kovac")),

dict(id="exchangead", to="Paulo Ramires", subject="Language exchange",
  scenario=("You saw a notice on a department board from a student looking for a language exchange "
            "partner: an hour of Portuguese for an hour of English each week. You are learning "
            "Portuguese and would like to reply."),
  bullets=[("purpose", "Say why you are writing."),
           ("request", "Ask whether the arrangement is still available."),
           ("details", "Give your level, your availability and where you could meet.")],
  topic=["exchange", "Portuguese", "English", "hour", "meet"],
  model=("Hi Paulo,\n\nI saw your notice on the languages noticeboard about a language exchange, "
         "and I am writing because I would like to take part. I have been learning Portuguese for "
         "a year and a half and I can read reasonably well, but I get very little "
         "practice.\n\nCould you tell me whether the arrangement is still available? If it "
         "is, the hour-for-hour format you described would suit me well.\n\nI am free on "
         "Tuesday and Thursday afternoons, and the café in the library building is quiet "
         "enough to talk in. I am a native English speaker, so the other hour should be "
         "straightforward.\n\nThanks, and I hope to hear from "
         "you.\n\nRuth Sanderson")),

dict(id="borrownotes", to="Kasper Lund", subject="Notes from Tuesday's lecture",
  scenario=("You missed a lecture because of a medical appointment. The slides are online but the "
            "lecturer said the worked example in class would not be posted. You sit near Kasper "
            "and he always takes careful notes."),
  bullets=[("purpose", "Explain why you missed the class."),
           ("request", "Ask whether you can see his notes."),
           ("details", "Say which lecture it was and what you are missing.")],
  topic=["notes", "lecture", "Tuesday", "example", "slides"],
  model=("Hi Kasper,\n\nI missed Tuesday's thermodynamics lecture because I had a hospital "
         "appointment that could not be moved, and I am trying to catch up before the problem set "
         "is due.\n\nCould I borrow your notes, or take a photograph of the pages? The slides are "
         "on the site, but Dr. Bergen said the worked example on entropy would not be posted, and "
         "that is exactly the part I cannot follow from the reading.\n\nI am on campus all day "
         "Thursday, and I could copy them in ten minutes at the library, and I would happily "
         "buy the coffee in return.\n\nThanks,\nOliver")),

dict(id="thankhost", to="Mrs. Bergström", subject="Thank you for a wonderful month",
  scenario=("You spent a month living with a host family during a language course and returned "
            "home last week. They made you welcome, took you to the coast one weekend and helped "
            "you practise every evening at dinner."),
  bullets=[("thanks", "Thank the family for having you."),
           ("purpose", "Say what the stay meant for you."),
           ("details", "Mention something specific you remember.")],
  topic=["stay", "family", "Swedish", "dinner", "coast"],
  model=("Dear Mrs. Bergström,\n\nThank you very much for having me in your home last month. I "
         "arrived able to read Swedish and barely able to say anything, and I left holding a whole "
         "conversation at dinner, which I did not expect at the start.\n\nI am writing because I "
         "wanted you to know how much the stay meant to me. The evenings at the table, when "
         "everyone slowed down so that I could join in, taught me more than the classes "
         "did.\n\nI often think about the Saturday we drove to the coast and ate outside in the "
         "wind, and about Erik's patience with my pronunciation.\n\nWith best wishes and thanks "
         "again,\nMarco Bianchi")),

dict(id="catering", to="Campus Catering Manager", subject="Vegetarian options in the main canteen",
  scenario=("The main canteen offers one vegetarian dish a day and it is often the same one. You "
            "and several friends eat there daily. You want to raise this constructively rather "
            "than complain, and you have a few practical suggestions."),
  bullets=[("purpose", "Explain the problem you have noticed."),
           ("request", "Ask whether the choice could be widened."),
           ("details", "Give examples and say how many students are affected.")],
  topic=["canteen", "vegetarian", "menu", "dish", "choice"],
  model=("Dear Catering Manager,\n\nI am writing about the vegetarian choice in the main canteen. "
         "There is one vegetarian dish each day, and for the past three weeks it has been the same "
         "pasta bake on four days out of five, which is why I am raising it.\n\nCould the choice "
         "be widened, even by one dish? A second hot option, or a filled roll at the counter, "
         "would make a noticeable difference.\n\nAbout a dozen people in my year eat there daily "
         "and several have started bringing food from home instead. We would gladly fill in a "
         "short survey if that would be useful.\n\nThank you for considering this.\n\nBest "
         "regards,\nPriya Raghavan")),

dict(id="bookclub", to="Reading Group", subject="A new time for the reading group",
  scenario=("You organise a small reading group of eight people. Three members now have a class on "
            "Tuesday evening, when the group has always met, and attendance has dropped. You want "
            "to propose a change and check that it suits everyone."),
  bullets=[("purpose", "Explain why the time needs to change."),
           ("request", "Ask which of two new times people prefer."),
           ("details", "Give the options and say what happens next.")],
  topic=["reading group", "Tuesday", "meet", "time", "book"],
  model=("Hi everyone,\n\nI am writing about the reading group, because three of us now have a "
         "class on Tuesday evening and we have been four or five rather than eight for the last "
         "month.\n\nCould you tell me which of two alternatives suits you better: Thursday at "
         "seven in the same room, or Sunday at four in the café on Mill Street? I will go with "
         "whichever suits more people.\n\nPlease reply by Friday so that I can confirm the "
         "room. We will still finish the current book first, so the next meeting is unchanged "
         "either way.\n\nThanks,\nHelena")),
]
