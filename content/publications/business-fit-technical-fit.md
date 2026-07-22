---
title: Business fit and technical fit are not the same question
summary: An application can be the wrong answer implemented beautifully. On separating the business verdict from the technical one - who rates what, on what scale, and what two honest ratings buy you at portfolio level. Includes a two-slide assessment guide.
date: 2026-07-07
time: 14:05
cover: /images/pub/business-fit-technical-fit/cover-v2.png
status: published
---

Sooner or later, every application portfolio review produces the sentence "this application is bad." Half the room nods, and the other half gets defensive, and both halves are right. The finance team loves the tool that runs on a database version two years out of support. The beautifully engineered platform three teams built last year has a few dozen logins a month. "Bad" compresses two different judgments into one word, and the compression destroys exactly the information you need to act.

*Business fit and technical fit are different questions, asked of different people, failing in different ways - the moment you average them, you lose both.*

As usual, this comes from my own missions on portfolios of several hundred applications, with figures rounded and the identifying details sanded off. The examples are composites. The mechanics are real.

## Two questions, not one

Business fit asks: does this application do what the business process needs it to do, today? Not whether it is well built - whether the people running assortment, or payroll, or store operations get their end-to-end process through it without fighting it.

Technical fit asks: is the thing healthy underneath? Current and supported stack, integrable through standard patterns, securable, operable without heroics. Not whether anyone loves it - whether it will still be standing, patchable, and connectable in three years.

The reason to keep them separate is architectural, not bureaucratic. A business need is an abstract thing; the solution serving it is a concrete thing, and the two never map one-to-one. One system can serve several needs; one need can be split across several systems. When you rate "the application" with a single number, you are pretending the need and the answer are the same object. They are not. An application can be a perfect answer to yesterday's process, or the wrong answer implemented beautifully - and those two failures call for opposite treatments.

## Who gets to answer

Each question has exactly one natural owner, and it is not the architect.

The **business owner** - the person accountable for the value and usage of the application - rates business fit, along with business criticality. They are the only one who knows whether the process actually flows or whether a spreadsheet is quietly doing half the work next to the system of record.

The **IT owner** - typically the solution architect, tech lead, or technical custodian of the system - rates technical fit. They are the only one who knows what the stack really looks like under the demo.

The architecture team rates neither. Its job is the frame: define the scale, train the raters, challenge the outliers, and arbitrate. I have come to describe the model as crowdsourced maintenance with centralized governance - the accuracy belongs to the people closest to the system, the consistency belongs to the center. A central team that fills in ratings on behalf of others becomes both the bottleneck and the single point of wrongness.

And the two owners will disagree. In a first assessment round, expect an argument on a meaningful share of the portfolio - which is not a failure of the method but its main output. Write the tie-breaker rule down before the first workshop: when business owner and IT owner cannot agree on a rating, the domain architect decides, referencing the architecture principles and the domain roadmap - not whoever escalates loudest. Written down early, the rule converts fights into agenda items.

One prerequisite, learned the hard way: fit ratings are only as good as the inventory under them. If the underlying components are unmapped and lifecycle dates are guesses, a technical fit rating is fiction with a straight face. Sequence the work - [get the inventory honest first](/publications/application-portfolio-data-quality), rate fits second.

## A scale people can actually use

Four levels, no middle. A neutral midpoint is where ratings go to hide; with four levels, every rater has to lean. The exact words matter less than the anchor questions attached to them - a rating without an anchor question is just a mood.

![Two four-level scales side by side: business fit from unreasonable to perfect and technical fit from inappropriate to fully appropriate, each level with its anchor question, and one accountable rater per scale](/images/pub/business-fit-technical-fit/two-scales-v1.png)

For business fit: level four means the process runs end to end in the system and users would choose it again; three means it does the job with accepted workarounds; two means core gaps exist and shadow tools are filling them; one means the application actively obstructs the process it claims to support. For technical fit: four means a current, supported, standard-pattern stack; three means aging but supported, nothing blocking; two means components approaching end of support and integration debt accumulating; one means out-of-support technology, security exposure, or a vendor that no longer exists.

One rule turns the assessment from a snapshot into a plan: every rating below the top level must answer a second question - *what would move this one level up?* The answers, collected across a domain, are a remediation backlog you got for free.

Operationally, rate in domain batches: a moderated session of about ninety minutes covers fifteen to twenty applications once the owners arrive prepared. Then stop re-running big-bang assessments. Re-rate on triggers - a major version change, a process redesign, a go-live - and confirm the rest through the same periodic attestation that keeps the inventory itself honest.

> A fit rating nobody argued about is not a measurement. It is a mood with a number on it.

## The matrix that pays for the discipline

Two honest ratings per application buy you the portfolio view that one blended score never can: a two-by-two of business fit against technical fit, with a default action per quadrant.

![Portfolio matrix: business fit against technical fit giving four default actions - invest, migrate, tolerate, eliminate - each weighted afterwards by business criticality](/images/pub/business-fit-technical-fit/fit-matrix-v1.png)

High on both: **invest** - this is where enhancement budget belongs. High business fit on poor technology: **migrate** - keep the function, replace the platform, and do it before the platform chooses the date for you. Poor business fit on healthy technology: **tolerate** - or reposition, but stop enhancing a system the business has already routed around. Poor on both: **eliminate**, with a successor and a date.

The matrix proposes; criticality disposes. An "eliminate" verdict on a business-critical application is not a contradiction - it is a migration with a deadline. That is why the business owner rates criticality alongside business fit: the quadrant gives you the default action, criticality sets the urgency and the risk appetite. Reviewed once a year per domain, the matrix stops portfolio strategy from being a debate about adjectives and turns it into a queue of dated moves.

## The two slides

I condensed the scales, the anchor questions, the raters, and the tie-breaker rule into a two-slide guide you can drop into your next portfolio workshop - it is in the [library](/library), free to use and adapt. Change the words on the levels if they clash with your house vocabulary. Keep one rater per scale, though. That part is load-bearing.

If you only have the energy for one change this quarter, make it this: stop publishing a single application score. Give the business owner their own rating, give the IT owner theirs, and let the domain architect referee when they collide. Everything else - the four levels, the follow-up question, the quadrant - can come later. I ran a version of this for two quarters before the matrix existed at all, and the separated ratings alone had already changed what people argued about in the room.

Because that is what a blended number is really for: letting everyone stay comfortable. The business never has to see its process gaps in writing, IT never gets to show its debt, and the portfolio review stays a conversation about feelings. It took me longer than I would like to admit to notice that the arguing was the point. Start the argument.
