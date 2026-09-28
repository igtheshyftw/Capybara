#!/usr/bin/env python3
"""
Calibration reference: 35 real items decoded from the 连词成句 practice set
(#2318-#2492), transcribed in the same notation the bank uses.

These are third-party items. They are held here ONLY to measure the shape of
the task -- blank counts, bank sizes, how often extra words appear, where
fixed text sits, how chunks are cut. They are never emitted into the question
bank or served to anyone; build_bank.py imports this file to print how far our
own items sit from the real distribution.
"""
import re
from collections import Counter

BRACKET = re.compile(r"\[([^\]]+)\]")

# (context, reply with the chunks bracketed, extra words offered but unused)
REAL = [
 ("I signed up for a psychology class this semester.", "Is [it] [being] [held online] [or in person]?", []),
 ("Did you attend the class picnic last weekend?", "[I] [wasn't] [able] [to] [make] [it].", []),
 ("Who designed the university's new website?", "[I don't] [remember] [who] [handled] the [web] [design].", []),
 ("We received the shipment of school supplies today.", "Do [you know] [if the] [new] [textbooks] [were included]?", []),
 ("Did you attend the university's workshop on digital marketing?", "[no, I] [missed] [it] because [of] [a] [class].", []),
 ("Did everyone agree with the new study session time?", "[no] [one] raised [any] [objections].", []),
 ("I'm preparing for my presentation on Friday.", "[did] you [practice] [your] [speech]?", []),
 ("When are you planning to leave for the club fair?", "I'm [still trying] [to] [decide] [what] [time would] [be best].", []),
 ("Would you like to attend the advanced photography workshop?", "Can [you] [tell] [me whether] [it covers] [picture editing]?", []),
 ("Why did you choose that book to read?", "[it's] [the] [one recommended] [by] [my] [English professor].", []),
 ("Which city did you visit during your school break?", "[the city] [that has] [the most] [cultural attractions] [was my] [first] [choice].", []),
 ("Why were you so late for class?", "I was [stuck in] [a traffic jam] [that lasted] [for] [an] [hour].", []),
 ("Which laptop are you planning to buy?", "[the one] [that] [has] [the fastest] [processor will fit] [my needs] perfectly.", []),
 ("I signed up for the school's coding workshop next month.", "Can [you] [tell] [me whether] [it's suitable] [for beginners]?", []),
 ("What did Williams say about the project?", "He [doesn't] [know] [when] [it] [is] [supposed] [to begin].", ["we"]),
 ("Why aren't you joining us for lunch?", "[I'm] [trying] [to] [finish] [a report] [before] [the deadline].", []),
 ("Are you going to the class picnic?", "Unfortunately, I [will] [not] [be] [able] [to] [make] [it] this year.", []),
 ("Did you hear back from the interview you had for the job at the student center?", "[no,] [they] [haven't] [contacted] [me] yet.", []),
 ("Are you attending the networking event tonight?", "[I] [do] [not] usually [go] [to] [those] [events].", ["am"]),
 ("Why didn't you call me back after class?", "[my phone battery] [died and] [I] [couldn't] [find] [my] [charger].", []),
 ("I'm going to watch a movie tonight with some friends after class.", "[what] [movie] are [you] [going] [to] [see]?", []),
 ("Did you finish reading that book?", "[have] [I told] [you] [the reason] [why] I have no time [for reading anymore]?", []),
 ("Why didn't you go to the choral concert at the university?", "[I] was feeling [unwell] [and] [decided] [to] [stay] [home].", []),
 ("Why did you miss marching band practice yesterday?", "I had [another] [appointment] [that] [I] [couldn't] [reschedule].", []),
 ("Are you going to attend the workshop hosted by the drama department?", "[I] [don't think I] [can] [make it] [this] time.", []),
 ("I'm planning to visit the new museum exhibit during semester break.", "[is] it [free] [to] [enter]?", []),
 ("What did you discuss with the professor?", "She [wanted] [to know] [when] [I plan] [to complete] [my] [assignment].", ["as"]),
 ("Why haven't you been to the new recreational center on campus?", "[I've been] [too] [busy] [to] [try] [it] [out].", []),
 ("Are you free for lunch tomorrow?", "[no,] [I] [have] [an important class] [scheduled at] [that] [time].", []),
 ("Are you planning to join the university's new fitness club?", "[no,] [I] [prefer] [my] [current] [gym].", []),
 ("What did you have to eat after class?", "I had [a sandwich] [that] [was] [filled] [with] [vegetables].", []),
 ("Are you going to the class dinner tonight?", "I'm sorry, but [I] [do] [not] [have] [time] [to attend].", ["none"]),
 ("Why aren't you attending the seminar today?", "[the topic] [they are] [discussing is] [not relevant] [to] [my] research.", []),
 ("Did you enjoy the student film festival?", "[none of] [the] [movies] [were] [of interest] [to] me.", []),
 ("There's a career fair in the auditorium tomorrow.", "[is it] [going to] [start] [in the] [morning or] afternoon?", []),
]


def shape(sent, extras):
    answer = BRACKET.findall(sent)
    frame = re.sub(r"_(?=[^\s])", "_ ", BRACKET.sub("_", sent))
    toks = frame.split()
    return {
        "blanks": len(answer),
        "bank": len(answer) + len(extras),
        "extras": len(extras),
        "opens_on_blank": toks[0] == "_",
        "fixed_words": sum(1 for t in toks if t != "_"),
        "multiword": sum(1 for a in answer if " " in a),
    }


def profile(rows):
    """rows: iterable of (blanks, bank, extras, opens_on_blank, fixed_words, multiword)"""
    n = len(rows)
    b = Counter(r["blanks"] for r in rows)
    return {
        "n": n,
        "blanks": {k: round(100 * v / n) for k, v in sorted(b.items())},
        "pct_with_extras": round(100 * sum(1 for r in rows if r["extras"]) / n),
        "pct_opening_on_blank": round(100 * sum(1 for r in rows if r["opens_on_blank"]) / n),
        "pct_no_fixed_text": round(100 * sum(1 for r in rows if r["fixed_words"] <= 1) / n),
        "pct_multiword_chunks": round(100 * sum(r["multiword"] for r in rows) / sum(r["blanks"] for r in rows)),
    }


REFERENCE = profile([shape(s, x) for _, s, x in REAL])

if __name__ == "__main__":
    for k, v in REFERENCE.items():
        print(f"{k:24s} {v}")
