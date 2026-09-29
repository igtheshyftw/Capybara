# -*- coding: utf-8 -*-
"""
Write an Email prompts, set 3: housing, services and daily life.
All original. Same standards as set 1 (see scripts/build_writing.py).
"""
EMAILS = [
dict(id="deposit", to="Kerrow Property Management", subject="Return of my deposit",
  scenario=("You moved out of a rented flat six weeks ago. The tenancy agreement says the deposit "
            "is returned within thirty days, but nothing has arrived and nobody has told you of "
            "any deductions. The flat was inspected on the day you left and no damage was noted."),
  bullets=[("purpose", "Explain that the deposit has not been returned."),
           ("request", "Ask when it will be paid or why it has been withheld."),
           ("details", "Give the address, the date you left and the amount.")],
  topic=["deposit", "tenancy", "inspection", "flat", "amount"],
  model=("Dear Kerrow Property Management,\n\nI am writing about the deposit for 12 Hartley Road, "
         "Flat 3, which I left on 30 June. The tenancy agreement states that deposits are returned "
         "within thirty days, but six weeks have now passed and the 850 pounds has not "
         "arrived.\n\nCould you tell me when the payment will be made, or, if something is being "
         "deducted, what it is for? The inspection on the day I moved out recorded no damage, and "
         "I have a copy of the report.\n\nMy bank details are unchanged from the standing order.\n\n"
         "Thank you for your attention to this.\n\nYours faithfully,\nMarta Nowak")),

dict(id="noise", to="Building Manager", subject="Noise at night from Flat 12",
  scenario=("Loud music from the flat above has woken you after midnight three times in the past "
            "two weeks. You have not spoken to the neighbours directly because you do not know "
            "them. You have an early start every weekday and the building has quiet hours."),
  bullets=[("purpose", "Describe the problem and when it happens."),
           ("request", "Ask the manager to raise it with the neighbours."),
           ("details", "Say which flat and which nights were affected.")],
  topic=["noise", "flat", "night", "music", "quiet hours"],
  model=("Dear Building Manager,\n\nI am writing about noise from Flat 12, which is directly above "
         "mine. Loud music has woken me after midnight three times in the past fortnight, most "
         "recently on Thursday and Saturday, and it continued for well over an hour on each "
         "occasion.\n\nCould you raise this with the residents there? I would rather the office "
         "did it than approach them myself, since I do not know them and I would like to keep "
         "things friendly.\n\nThe building's quiet hours begin at eleven, and I start work at six "
         "every weekday.\n\nThank you for looking into it.\n\nBest regards,\nDaniel Hjelm")),

dict(id="parcel", to="Northgate Deliveries", subject="Parcel delivered to the wrong address",
  scenario=("A parcel you ordered was marked as delivered yesterday, but it never reached you. The "
            "photograph in the tracking system shows a green door, and every door in your building "
            "is grey. The parcel contains a textbook you need this week."),
  bullets=[("purpose", "Explain what has happened."),
           ("request", "Ask for the parcel to be traced or redelivered."),
           ("details", "Give the tracking number and describe the evidence.")],
  topic=["parcel", "delivery", "tracking", "address", "photograph"],
  model=("Dear Northgate Deliveries,\n\nI am writing about parcel NG-44190387, which your tracking "
         "system marked as delivered at 14:20 yesterday. It did not reach me. The photograph "
         "attached to the delivery shows a green front door, and every door in my building is "
         "grey, so I believe it was left at the wrong address.\n\nCould the parcel be traced and "
         "redelivered, or collected from wherever it was left? It contains a textbook that I need "
         "for a class on Friday.\n\nMy address is 8 Ellery Court, and there is a buzzer for flat "
         "2B.\n\nThank you for your help.\n\nYours sincerely,\nPetra Vogel")),

dict(id="gymfreeze", to="Riverside Gym", subject="Pausing my membership",
  scenario=("You are going abroad for a three-month exchange and will not be able to use your gym "
            "membership. A friend told you that memberships can be paused rather than cancelled, "
            "but the website says nothing about it."),
  bullets=[("purpose", "Explain why you want to pause the membership."),
           ("request", "Ask whether pausing is possible and how to arrange it."),
           ("details", "Give the dates you will be away.")],
  topic=["membership", "pause", "exchange", "months", "payment"],
  model=("Dear Riverside Gym,\n\nI am writing because I will be abroad on a university exchange "
         "from 1 February until 30 April, and I will not be able to use my membership during "
         "those three months.\n\nCould the membership be paused rather than cancelled? I would "
         "like to know whether that is possible, what it costs, and whether the monthly payment "
         "stops while the account is frozen.\n\nIf pausing is not offered, I would rather cancel "
         "before February and rejoin in May than pay for months I cannot use. My membership "
         "number is R-5528.\n\nThank you very much.\n\nBest wishes,\nAdam Christou")),

dict(id="cardabroad", to="Meridian Bank", subject="Card declined abroad",
  scenario=("You arrived in another country yesterday and your bank card has been refused at three "
            "shops and a cash machine. You told the bank about your travel dates through the app "
            "before you left. You have very little cash with you."),
  bullets=[("purpose", "Explain what is happening."),
           ("request", "Ask for the card to be unblocked."),
           ("details", "Say where you are, since when, and what you have already tried.")],
  topic=["card", "abroad", "declined", "travel", "cash machine"],
  model=("Dear Meridian Bank,\n\nI am writing because my debit card has been declined repeatedly "
         "since I arrived in Portugal yesterday. It was refused at three shops and at a cash "
         "machine at the airport, although there is money in the account.\n\nCould the card be "
         "unblocked, or could you tell me what is stopping the payments? I registered my travel "
         "dates in the app on 2 September, a week before leaving, and I have tried both the chip "
         "and the contactless reader.\n\nI have very little cash with me, so this is urgent. My "
         "account ends 7741.\n\nThank you for your help.\n\nYours faithfully,\nSeo-yeon Lim")),

dict(id="bikeshare", to="CityCycle Support", subject="Charged for a bike I could not use",
  scenario=("You unlocked a shared bike on Sunday, found that the back brake did not work and "
            "returned it to the same dock two minutes later. You have been charged for a full "
            "hour. You reported the fault in the app at the time."),
  bullets=[("purpose", "Explain what happened with the bike."),
           ("request", "Ask for the charge to be refunded."),
           ("details", "Give the time, the dock and the fault you reported.")],
  topic=["bike", "brake", "dock", "charge", "refund"],
  model=("Dear CityCycle Support,\n\nI am writing about a charge on my account from Sunday "
         "morning. I unlocked bike 2287 at the Meadow Lane dock at about ten past nine, found that "
         "the back brake did not grip at all, and returned it to the same dock within two "
         "minutes. I reported the fault in the app before I walked away.\n\nCould the charge of "
         "four pounds fifty for a full hour be refunded? I did not ride the bike further than the "
         "end of the street.\n\nMy account is under this address.\n\nThank you very much.\n\nBest "
         "regards,\nTomasz Bielecki")),

dict(id="broadband", to="Lumen Broadband", subject="Slow connection since Monday",
  scenario=("Your home internet has been very slow since Monday evening. You have restarted the "
            "router twice and tested it with a cable as the help page suggests, with no "
            "improvement. You study online three evenings a week and video calls keep dropping."),
  bullets=[("purpose", "Describe the problem and when it started."),
           ("request", "Ask for an engineer or a fix."),
           ("details", "Say what you have already tried and when you are available.")],
  topic=["internet", "router", "connection", "engineer", "evening"],
  model=("Dear Lumen Broadband,\n\nI am writing because my connection has been extremely slow "
         "since Monday evening. Pages take a minute to load and video calls drop every few "
         "minutes, although the router shows a normal green light.\n\nCould an engineer be sent, "
         "or the line tested from your end? I have already restarted the router twice, moved it "
         "away from the television and tested it with a cable rather than wireless, as the help "
         "page suggests, and none of that changed anything.\n\nI am at home on Tuesday and "
         "Thursday mornings. My account number is LB-71204.\n\nThank you for your help.\n\nYours "
         "sincerely,\nAisha Rahman")),

dict(id="phonebill", to="Volta Mobile Billing", subject="Unexpected charge on my bill",
  scenario=("Your monthly phone bill is usually eighteen euros, but this month it is forty-three. "
            "The itemised bill shows a data charge for a day when you were at home using wireless "
            "internet. Your plan includes more data than you normally use."),
  bullets=[("purpose", "Explain the problem with the bill."),
           ("request", "Ask for the charge to be explained or removed."),
           ("details", "Give the amounts, the date and your usual usage.")],
  topic=["bill", "charge", "data", "plan", "euros"],
  model=("Dear Volta Mobile,\n\nI am writing about my bill for October, which came to forty-three "
         "euros rather than the eighteen I usually pay. The itemised list shows a data charge of "
         "twenty-five euros on 14 October.\n\nCould you explain this charge, and remove it if it "
         "is an error? I was at home all that day using my own wireless network, and my plan "
         "includes ten gigabytes, of which I have never used more than four in a month.\n\nMy "
         "account number is VM-30928, and I am happy to send a screenshot of my usage "
         "history.\n\nThank you for looking into it.\n\nBest regards,\nFelipe Duarte")),

dict(id="keycollect", to="Residence Office", subject="Arriving on Sunday evening",
  scenario=("You are moving into university accommodation next week. The letter says keys are "
            "collected from the residence office between nine and five on weekdays, but your "
            "train arrives on Sunday at eight in the evening and cannot be changed."),
  bullets=[("purpose", "Explain when you will arrive."),
           ("request", "Ask how to collect your key outside office hours."),
           ("details", "Give your arrival time and your room details.")],
  topic=["key", "arrival", "residence", "Sunday", "room"],
  model=("Dear Residence Office,\n\nI am writing about collecting the key for room 214 in Marlowe "
         "House. My train arrives on Sunday 15 September at eight in the evening, which is outside "
         "the collection hours given in my letter, and the booking cannot be changed.\n\nCould you "
         "tell me how to collect the key that evening? I would like to know whether the night "
         "porter holds keys, or whether there is a safe box I could be given a code for.\n\nIf "
         "neither is possible, I would be grateful for any advice about where students usually "
         "stay on a Sunday night.\n\nThank you very much.\n\nBest wishes,\nMiriam Cohen")),

dict(id="recycling", to="City Waste Services", subject="Recycling not collected on Elm Street",
  scenario=("The recycling bins on your street have not been emptied for three weeks, although the "
            "ordinary rubbish is collected every Tuesday. Bags are now piling up beside the bins "
            "and neighbours have started putting recycling into the general waste."),
  bullets=[("purpose", "Report what has not been happening."),
           ("request", "Ask for a collection and an explanation."),
           ("details", "Give the street, how long it has been and what the effect is.")],
  topic=["recycling", "collection", "bins", "street", "waste"],
  model=("Dear City Waste Services,\n\nI am writing to report that the recycling bins on Elm "
         "Street have not been emptied for three weeks. The general waste is still collected every "
         "Tuesday as normal, so it appears to be the recycling round alone that has "
         "stopped.\n\nCould a collection be arranged this week, and could you tell me whether the "
         "schedule has changed? Bags are piling up beside the bins, and several neighbours have "
         "given up and started putting glass and card into the ordinary rubbish.\n\nThe bins in "
         "question are the blue ones outside numbers 40 to 58.\n\nThank you for your help.\n\n"
         "Yours faithfully,\nEmeka Nwosu")),

dict(id="dentist", to="Ash Grove Dental", subject="Changing my appointment",
  scenario=("You have a dental check-up booked for Thursday at eleven, but you have just been told "
            "that a compulsory laboratory session has been moved to that morning. The practice "
            "asks for at least twenty-four hours' notice of any change."),
  bullets=[("purpose", "Explain why you cannot keep the appointment."),
           ("request", "Ask to move it to another time."),
           ("details", "Say when you could come instead.")],
  topic=["appointment", "check-up", "Thursday", "laboratory", "reschedule"],
  model=("Dear Ash Grove Dental,\n\nI am writing about my check-up on Thursday 6 March at eleven "
         "o'clock. A compulsory laboratory session has been moved to that morning, so I will not "
         "be able to come, and I am giving notice as early as I can.\n\nCould the appointment be "
         "moved to another day? I can come any afternoon after two, and I am free all day on "
         "Friday the following week.\n\nIf there is a cancellation before then, I would be glad to "
         "take it at short notice; my phone is the number on my record.\n\nThank you for your "
         "help.\n\nBest regards,\nVictor Andrade")),

dict(id="healthplan", to="Student Insurance Office", subject="What the student plan covers",
  scenario=("You need physiotherapy after an injury and you do not know whether the student health "
            "plan pays for it. The booklet you were given lists what is excluded but says nothing "
            "about physiotherapy either way. Treatment would start next month."),
  bullets=[("purpose", "Explain what you need to know and why."),
           ("request", "Ask whether the treatment is covered."),
           ("thanks", "Thank the office for their help.")],
  topic=["insurance", "physiotherapy", "cover", "treatment", "plan"],
  model=("Dear Insurance Office,\n\nI am writing because I have been advised to have "
         "physiotherapy for a knee injury, and I cannot tell from the booklet whether the student "
         "plan covers it. The list of exclusions does not mention physiotherapy, but neither does "
         "the list of treatments included.\n\nCould you tell me whether a course of ten sessions "
         "would be covered, and whether I need a referral from the university health centre "
         "first? I would also like to know whether I pay and claim back, or whether the clinic "
         "bills you directly.\n\nTreatment would begin in November.\n\nThank you very much for "
         "your help.\n\nYours sincerely,\nNoor Haddadi")),

dict(id="laundry", to="Accommodation Services", subject="Broken washing machines in Beech House",
  scenario=("Two of the three washing machines in your residence have been out of order for over a "
            "week. Notices were put on them but nothing has been repaired. Around sixty students "
            "share the laundry room and queues now run late into the evening."),
  bullets=[("purpose", "Report the problem."),
           ("request", "Ask for the machines to be repaired."),
           ("details", "Say how many machines, how long, and how many students are affected.")],
  topic=["washing machines", "laundry", "repair", "residence", "queue"],
  model=("Dear Accommodation Services,\n\nI am writing about the laundry room in Beech House. Two "
         "of the three washing machines have been out of order since last Monday. Notices were "
         "taped to them at the time, but nothing has been repaired since.\n\nCould an engineer be "
         "arranged this week? About sixty of us share the room, and with one working machine the "
         "queue now runs past eleven at night, which is difficult for anyone with early "
         "classes.\n\nThe faulty machines are numbers 2 and 3; number 1 still works but makes a "
         "loud knocking sound during the spin cycle.\n\nThank you for your help.\n\nBest "
         "wishes,\nIngrid Solheim")),
]
