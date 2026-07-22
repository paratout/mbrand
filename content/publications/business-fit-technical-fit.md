---
title: One application, two verdicts - rating business fit and technical fit
summary: Why business fit and technical fit must be scored separately, who owns each verdict, a four-level scale with anchor questions, and the portfolio matrix that turns two honest ratings into invest, tolerate, migrate, or eliminate. With a two-slide assessment guide to download.
date: 2026-07-22
cover: /images/pub/business-fit-technical-fit/cover-v1.png
status: published
---

Sooner or later, every application portfolio review produces the sentence "this application is bad." Half the room nods, and the other half gets defensive, and both halves are right. The finance team loves the tool that runs on a database version two years out of support. The beautifully engineered platform three teams built last year has a few dozen logins a month. "Bad" compresses two different judgments into one word, and the compression destroys exactly the information you need to act.

*Business fit and technical fit are different questions, asked of different people, failing in different ways - the moment you average them, you lose both.*

What follows is drawn from my own experience running portfolio assessments on landscapes of several hundred applications, usually mid-transformation. Figures are rounded, details deliberately blurred, and examples are composites; the mechanics are the point.

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

## The two slides to steal

I have condensed the whole method into a two-slide assessment guide - one slide per fit, each with the four-level scale, the anchor questions, the accountable rater, and the prerequisites. It is in the [library](/library), free to use and adapt; put your own words on the levels, but keep the anchors and keep the single rater per scale.

## What I would tell you to steal

1. Never average the two fits into one score - the average of a wrong answer and a healthy stack is noise.
2. Give each rating exactly one accountable owner: business owner for business fit, IT owner for technical fit.
3. Use four levels with no neutral middle, and anchor every level to a question, not an adjective.
4. Write the tie-breaker down before the first workshop: the domain architect decides, against principles, not volume.
5. Attach "what moves it one level up" to every sub-top rating, and harvest the answers as your remediation backlog.
6. Rate in domain batches - about ninety minutes for fifteen to twenty applications - and re-rate on triggers, not on anniversaries.
7. Let the matrix set the default action and business criticality set the urgency; never let either do the other's job.

One blended number lets everyone stay comfortable: the business cannot see its process gaps, IT cannot show its debt, and the portfolio review stays a conversation about feelings. Two verdicts, two owners, one written tie-breaker - the argument is the method, and the argument is worth having.
