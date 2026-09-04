---
title: You have no mandate, only an invitation
summary: What to actually do when you join an organization as its first architect, somebody adds you to a project board, and nothing else exists - no principles, no object model, no catalogue, no forum. Why you start with the work in flight rather than the landscape, the ninety days step by step with the output of each phase, what as-is, target, reference and transition architecture each mean and which of them you genuinely need in month two, how to run the integration conversation that hands you the inventory for free, and how to be in the room before you have any authority. With a ninety-day pack, a joining workbook, and a worked artifacts deck.
date: 2024-09-23
time: 09:05
updated: 2026-08-19
cover: /images/pub/joining-as-the-first-architect/cover-v1.png
status: published
---

A project manager adds you to a board. You can suddenly see eleven workstreams, four hundred tickets, and a plan with dates on it. Somebody has written "architecture" next to two of the epics, which is the first evidence that anyone has thought about what you are for.

Nobody has told you what that is.

The first time this happened to me I did the thing that felt professional. I disappeared for six weeks and drew the as-is. It was a good diagram. When I came back with it, three of the decisions I most wanted to influence had already been taken, in week two, in meetings I could have walked into. One of them cost about two years to unwind.

*You do not have a mandate. You have an invitation, and it expires.*

This piece is a situation rather than a topic: you are the first architect, the discipline is a greenfield, and the foundations everything else assumes - principles, an object model, a catalogue, a forum - do not exist yet. What follows is what I now do, in order, with what each step produces. Composited from several missions, details blurred and figures rounded as always.

## Read the invitation correctly

Being added to a board is not an appointment. One person formed a hypothesis that you might be useful, and acted on it in the cheapest way available to them. That is genuinely good news, and it is not a role.

![What the invitation is, the clock attached to it, and the three ways new architects burn it](/images/pub/joining-as-the-first-architect/invitation-v1.png)

**There is a clock.** Not a formal one, and nobody will ever mention it. Within roughly a quarter, the people around you will have settled on what you are: the person who helps, the person who reviews, or the person who slows things down. That settles through accumulated small experiences rather than any decision, and it is much easier to set than to change afterwards.

Three ways the invitation gets burned, all of which I have done.

**Disappearing to draw.** The most respectable failure. You produce a landscape while the landscape is being changed around you by people who did not know you wanted a say.

**Arriving with opinions and no evidence.** You attend, you comment, you are technically right, and you have spent credibility you had not yet earned. In a practice with no principles behind you, an opinion is only ever a personal preference, and people treat it accordingly.

**Installing governance on day one.** A board, a template, a gate, in month one. It reads as a claim to authority nobody granted, and it produces the exact reflex you cannot afford: people routing around you before they have any reason to want you there.

## The inversion: start with the work, not the landscape

Here is the part that seems to contradict something I have written elsewhere, so let me deal with it directly.

I have argued at length that you should [walk the landscape first](/publications/landscape-due-diligence) - that you cannot plan a transformation across a landscape nobody has counted. I still think that is right. It is right **when you have a mandate and a programme**, when somebody has asked for the count and will act on it.

That is not this situation. Here you have an invitation from one project manager. Nobody has asked for a landscape, nobody is waiting for one, and producing one unasked is how you spend your first quarter being invisible.

![Two ways to enter an organization, and what each one produces](/images/pub/joining-as-the-first-architect/two-entries-v1.png)

So the order inverts. You start with the work already in flight, for three reasons.

**Decisions are being taken this week.** Whatever exists today was decided years ago and you cannot change it. What is being decided in the current sprint you can still influence, and it will be part of the landscape for a decade.

**It is the only place you can be useful without authority.** Nobody needs your permission to accept help. They very much need to grant you the right to review, and they have not.

**It hands you the as-is in order of importance.** A survey gives you four hundred applications alphabetically. Following the work gives you the thirty that people are actively spending money on, which is a far better first thirty.

The landscape walk still happens. It happens in month four, with a mandate you earned by being useful in months one to three.

## The first ninety days, step by step

Six phases. Each has one output, and each has something you deliberately do not do.

![The first ninety days - the output of each phase, and the thing not to do in it](/images/pub/joining-as-the-first-architect/ninety-days-v1.png)

### Days 1 to 5: read, do not produce

Read the board properly. Every workstream title, every epic, and - this is the part people skip - **the last thirty days of comments**. Ticket comments are where the real constraints live: the vendor who cannot deliver until March, the market that refused the standard process, the integration that only one person understands. None of that is in any document.

Then have one proper conversation with the project manager who invited you. Not "what do you need from me", which invites them to invent a job for you. Ask instead: **what are you worried about?** People answer that question honestly and it tells you where the risk actually sits.

**Output:** nothing published. A private list of the five decisions currently in flight, who is taking each, and roughly when.

**Do not:** offer an opinion in your first week, however obvious the problem seems. You do not yet know which of the obvious problems are already known, already accepted, or already being fixed.

### Days 6 to 15: the first useful artifact, and it is not a diagram

From your list of five, pick the one with the nearest irreversible decision. Usually that is a contract, a data migration, or a mastership choice that will be extremely expensive to revisit.

Produce one page. Not a review, not an assessment, not a recommendation. An **impact note**: what this touches, who else is affected, what breaks if it goes ahead as drawn, and what you would want to know before deciding. Written in the language of the project, not of architecture.

The framing matters more than the content. This is a gift, not a gate. You are handing the team something that makes their decision safer, at a moment when nobody asked you to and nobody can be annoyed that you did.

Here is one that worked, compressed. The project was replacing a market's warehouse system and had reached shortlist.

> **What this touches.** Four applications beyond the warehouse system itself: the core (stock movements), the transport tool (dispatch), the data platform (reporting), and the market's own labelling tool, which is not on the project's list.
>
> **Who else is affected.** Two markets that consume the same stock feed, neither of whom is represented in this workstream. Named the two people who own those feeds.
>
> **What breaks if it goes ahead as drawn.** The current stock feed is a nightly file with no schema. Both shortlisted products expect an event stream. Whoever wins, somebody rebuilds that feed, and it is not in either quote.
>
> **What I would want to know before deciding.** Whether either product can consume a file on the existing schedule during a transition, because that determines whether the feed rebuild is on the critical path or can follow in a later wave.
>
> I have no authority here and no view on which vendor is better. Do with this what you like.

Four short sections, no recommendation, no verdict on the vendors. It surfaced a cost neither bid contained, which is the sort of thing project managers remember. The following month I was invited to the requirements session for a different workstream, which is the only outcome that actually mattered.

**Output:** one page, sent to the project manager and the workstream lead, with a sentence saying you have no authority here and wanted to be useful.

**Do not:** copy anyone senior. The moment this note goes to a sponsor, it stops being a gift and becomes a report, and the team will never speak freely to you again.

### Days 16 to 30: the integration conversation

Go and find the integration team. In every organization I have joined, they hold the only honest inventory in the building, and almost nobody asks them for it.

Ask for the interface list. Not the architecture, not the documentation, not a diagram - the actual list of what talks to what, which usually exists as a spreadsheet somebody maintains out of self-defence.

![What the interface list gives you, none of which you had to survey for](/images/pub/joining-as-the-first-architect/interfaces-v1.png)

That list is four things at once. It is an **application inventory**, because every interface has two endpoints and both are real systems that are genuinely in use. It is an **object list** in disguise, because [anything two systems exchange is a domain object](/publications/data-strategy-object-model) whether or not anybody has named it. It is an **ownership map**, because every interface has somebody who gets called when it breaks. And it is a **pain map**, because the team can tell you instantly which ones fail most often, which is the truest quality signal in the building.

Five questions worth asking, in this order:

- What talks to what, and is there a list?
- Which of these break most often?
- Which one would you rebuild first if somebody gave you the time?
- What are people asking you to build right now?
- What do people keep asking for that you keep refusing, and why?

That last question is the one that pays. The refusals are where the undocumented principles already live, held informally by the people doing the work.

**And you have to trade.** Come back within a fortnight with something they can use: the impact note that stopped a bad interface being commissioned, or simply the fact that you told a project team what the integration team had been saying for a year, and this time it landed. A relationship where you only extract does not survive month three.

**Output:** a first landscape sketch derived from interfaces rather than from a survey. Rough, incomplete, and correct about the parts that matter.

**Do not:** ask them to fill in a template. You are not collecting yet.

### Days 31 to 45: the as-is, assembled sideways

Now you can build an as-is, and it is nothing like the one I wasted six weeks on.

**Scope rule: only what the work in flight touches, plus one ring out.** If the current projects touch eighteen applications, your as-is has those eighteen plus whatever they exchange data with. Perhaps thirty. Not four hundred.

This is not a compromise. An as-is scoped to live work is *more* useful than a complete one, because it is right where somebody is about to spend money, and because you can keep it true. A complete as-is built by one person in month two is wrong within a quarter and nobody notices, which is worse than not having one.

Keep it in a [spreadsheet with stable IDs](/publications/architecture-without-a-tool). You will want to grow it later, and the only expensive mistake at this stage is inventing identifiers you cannot keep.

**Output:** roughly thirty applications with owners, the interfaces between them, and the two or three places where something is obviously duplicated.

**Do not:** publish it as "the architecture". Call it what it is - the part of the landscape the current work touches.

### Days 46 to 60: the first target, and it is small

By now somebody will have asked you where something is heading. That is your opening.

Write a target for **one area**, at a horizon that matches a decision somebody actually has to take. Half a page. Three to five statements about direction, each with a reason. Not a diagram of the estate in 2029.

**Output:** a one-page target direction for a single domain, agreed with the person who owns that area, not published unilaterally.

**Do not:** produce a target for the whole organization. You do not yet know the constraints, and a target written without them is fiction that people will quote back at you for years.

### Days 61 to 75: start writing decisions down

Open a [decision log](/publications/decision-records) and seed it with what has *already* been decided in the projects you touched. Most of it will be reconstruction - dated today, marked as such, naming who you asked.

Eight to ten records is enough to start. Each one: what was chosen, what was rejected, why, and what it costs.

This is the seed of everything that comes later. [Principles are derived by mining a log for repetition](/publications/architecture-principles), which means you cannot write meaningful principles until the log exists. Anyone who writes principles first is copying them from somewhere, and it shows.

**Output:** eight to ten decision records, most of them reconstructions.

**Do not:** announce a decision-record process. Just write them and refer to them by number in conversation. People adopt formats they see being used, not formats they are told about.

### Days 76 to 90: one mechanism, not a framework

Add exactly one thing to a process that already exists. Not a new process.

The highest-yield candidate: **one question on the project intake form** - does this create, change or copy something another team owns? That single field is what later grows into [giving every project an address](/publications/every-project-needs-an-address), and it costs the PMO nothing to add.

An alternative if there is no intake form worth the name: one standing agenda item at the end of the weekly project call - what did we just decide, and who is writing it down.

**Output:** one field, or one agenda line, owned by somebody who is not you.

**Do not:** stand up an architecture board. There is not yet enough crossing your desk to fill an agenda, and an empty board is the fastest way to become decorative.

## One joining, in twelve weeks

Composited, compressed, and close enough to several real ones.

**Week 1.** Eleven workstreams on the board. Reading the comments turns up three things no document mentions: a vendor slipping to March, a market that has quietly stopped using the group planning tool, and an integration that one contractor understands. Coffee with the project manager. The question "what are you worried about" produces a forty-minute answer about the warehouse replacement, which was not what I expected.

**Week 2.** Five decisions in flight, listed privately. Two are irreversible within eight weeks: the warehouse shortlist and a customer data migration.

**Week 3.** The warehouse impact note. Four sections, one page. It lands because it names a cost neither bid contained.

**Week 4.** The project manager forwards it to the workstream lead, who asks a follow-up question. First time anybody has initiated a conversation with me.

**Week 5.** The integration team. They have a spreadsheet with a hundred and forty interfaces, maintained by one person, which nobody has asked for in three years. It takes ninety minutes and a promise to come back with something useful.

**Week 6.** I come back with something useful: the impact note, plus the observation that the project team had not known about their objection to the nightly file, and this time it was heard.

**Weeks 7 to 8.** A scoped as-is. Thirty-one applications, drawn from the interface list rather than a survey, with owners against twenty-two of them. Two obvious duplicates fall out without anyone looking for them.

**Week 9.** Somebody asks where stock data is heading. Half a page of target direction for logistics, written with the head of supply chain rather than at him.

**Weeks 10 to 11.** The decision log opens with nine entries, seven of them reconstructions of things decided before I arrived. One of them - which system masters supplier - turns out to have been decided three separate times in two years, which is the first evidence of a missing principle.

**Week 12.** One question added to the intake form, owned by the PMO. No board, no framework, no policy.

Nothing on that list is impressive in isolation. Together they are the reason that in month five I was in the room for the customer migration design *before* it was designed, which is where the actual value was.

## Four variations on the situation

The clean case above is rarer than the messy ones. Four that come up constantly.

### You are a consultant or a contractor

The clock is shorter and the suspicion is higher, because people assume you are here to produce a report and leave.

**What changes:** say your end date out loud, early and unprompted. Then make the first artifact something that outlives you - the interface-derived as-is in their spreadsheet, in their drive, with their naming. The fastest way to be trusted as an external is to build things that obviously do not need you.

**What does not change:** everything else. The order is identical, just compressed.

### There is already a solution architect

Frequently there is somebody doing part of the job, usually well, without the title. Treating them as an obstacle is the single most common unforced error.

**What changes:** find them in week one and ask what they wish somebody would take off their plate. It is almost always the cross-project work they have no time for, which is exactly your job. Draw the line explicitly and out loud: they own designs inside projects, you own what happens between them.

**What does not change:** you still start with the work in flight. You just do it alongside somebody who already knows where the bodies are, which is a considerable advantage.

### The programme is already mid-flight

You have arrived at month fourteen of a two-year replacement. Half the decisions you would want to influence are behind you.

**What changes:** shift the emphasis from the impact note to the decision log, and backfill aggressively for the decisions that are still being argued about. In a mid-flight programme the most valuable thing an architect can do in month one is stop the same argument being had a fourth time, and that only needs a written record with the reasons in it.

**What does not change:** do not reopen settled decisions to demonstrate value. It is the most expensive first impression available.

### The sponsor wants a strategy deck by week three

Somebody senior has hired the idea of architecture and expects a document.

**What changes:** give them something, on time, and make it honest. One page: what you have found so far, the five decisions in flight, the three risks you can already name, and what you propose to do in the next sixty days. That is a real deliverable and it takes an afternoon.

**What does not change:** do not produce the estate-wide target they think they want. A target written in week three is a guess with a letterhead, and you will spend a year being held to it. Say plainly that the direction will be worth writing once you have walked two or three real decisions, and offer a date.

## As-is, target, reference, transition

Four words that get used interchangeably, and the confusion is expensive because they have different owners and different lifetimes.

![Four architecture artifacts compared - what each is, what it is not, and when you actually need it](/images/pub/joining-as-the-first-architect/four-artifacts-v1.png)

**As-is.** What exists now, at a stated scope. Perishable - it starts decaying the day you finish it. Built incidentally, from the work you touch, rather than as a project.

**Target.** Where *this* organization intends to be, for a named scope, at a horizon, agreed with somebody who owns that scope. It has a **date** and an **owner**. It is specific to you and it expires.

**Reference architecture.** The worked-out shape for a recurring *class* of problem - how we do integration with a market system, how we build a customer-facing service. It has a **version**, not a date. It is applied repeatedly rather than reached once, and it is the thing that stops the fourth team solving the same problem differently.

**Transition architecture.** A deliberate intermediate state you will operate on purpose while something lands. Naming it is what stops churn being mistaken for bad architecture.

The test that separates the two people confuse most:

> A target has a date and an owner. A reference architecture has a version and a set of instances. If you are asking "when will we be there", it is a target. If you are asking "how do we do this whenever it comes up", it is a reference architecture.

**And which of these do you need in month two?** Honestly, a scoped as-is and one half-page target. That is all.

A reference architecture written before you have two real instances is a guess dressed as a standard, and you will be stuck defending it. Wait until the same problem arrives a second time - the [second-occurrence rule](/publications/architecture-patterns) applies here exactly as it does to patterns. A transition architecture matters when a programme starts, not before.

## Working without principles, objects or a catalogue

This is the part that makes people freeze, so let me be blunt about it.

**You do not need principles to make a good decision.** You need principles to make the *same* decision consistently, across people and across time. In month two there is one of you, and consistency is not yet your problem. Make individual decisions, on the merits, and write down why.

![The order things actually arrive in, versus the order people try to install them](/images/pub/joining-as-the-first-architect/order-v1.png)

The order that works is bottom-up, and every attempt I have seen to run it top-down has stalled:

**Decisions** accumulate. **Repetition** appears in the log - the same argument three times. That repetition becomes a **principle**, which is now evidence-based rather than borrowed. Recurring solutions harden into **patterns**. Patterns that admit no design freedom become **standards**.

Run that in reverse and you get a principles page nobody cites, a pattern library with no users, and standards enforced by a person rather than by agreement.

**The same goes for the object model.** You do not need one to notice that two systems both write customer. Record the finding as a decision or an observation, attach it to the two applications, and move on. The [object model](/publications/data-strategy-object-model) comes when you have enough findings that a model is cheaper than the findings.

**And the catalogue.** The interface list is your catalogue. It is worse than a real one in every respect except the one that matters: it exists, and somebody keeps it current because their weekend depends on it.

## How to be in the room

The part of the question that gets asked least and matters most. You are joining rooms that were working fine without you.

![What to say and what not to say, in five recurring moments](/images/pub/joining-as-the-first-architect/in-the-room-v1.png)

**Ask questions you can state a purpose for.** "Why did you choose that?" reads as a challenge. "I am trying to understand what constraints you were working within - what drove that?" reads as curiosity, and gets a much better answer.

**Never review something you were not asked to review.** Offer instead. "Would it help if I mapped what this touches?" gives them the option to decline, which is what makes it a gift rather than an inspection.

**Bring the impact list, not the opinion.** A list of what a change touches is a fact. An opinion about whether the change is wise is a fact only if you have authority, and you do not.

**The sentence that works**, more or less verbatim: *"I have no authority here, and I would like to be useful. Here is what I noticed - do with it what you like."* Saying the first half out loud costs nothing and disarms almost everybody, because the fear in the room is that you are there to judge them.

**Do not say governance for six months.** The word arrives, in most organizations, attached to memories of things that slowed people down. Say "write it down", "who decides", "let us not decide that twice". Same content, none of the reflex.

**Give the credit away.** Anything that goes right in your first quarter should be credited to the team that did it. You are not accumulating a record; you are accumulating people who will invite you next time.

## What you will be tempted to do, and should not

**The complete as-is.** Six weeks, four hundred applications, obsolete on delivery, and you were absent while the decisions were made.

**The principles workshop in month one.** You will produce framework principles because you have no evidence of your own. They will be true, agreed, and inert.

**The tool business case in month two.** You cannot yet articulate what it would hold or who would maintain it. [Year one does not need a tool.](/publications/architecture-without-a-tool)

**The architecture board before there is anything to decide.** An empty agenda is worse than no forum, because it teaches everyone that your meetings are optional.

**The estate-wide target.** Written before you know the constraints, and quoted back at you for years.

**The unrequested review.** The single fastest way to convert an invitation into a closed door.

## How you know it worked

One signal matters more than all the others, and it is unmistakable when it arrives.

**Somebody invites you before the decision instead of after.** Not to review something finished, but to sit in while it is still shapeless. That is the moment the invitation has become a mandate, and it usually happens somewhere between month three and month five.

![The signals that an invitation has turned into a mandate](/images/pub/joining-as-the-first-architect/signals-v1.png)

Some smaller markers along the way. Somebody refers to a decision by its number without you prompting. A second project manager adds you to their board, unprompted, because the first one mentioned you. The integration team forwards you a request rather than just refusing it. Somebody uses your as-is in a slide and does not tell you, which is the highest compliment this work receives.

And the negative signal worth watching for: three months in, if every conversation you are in was initiated by you, the invitation did not convert. That is recoverable, and the fix is almost always that you have been reviewing rather than helping.

## Where this goes next

Ninety days in, you have a scoped as-is, one target direction, a decision log with ten entries, a working relationship with the integration team, and one field on somebody else's form. It looks like very little. It is, in fact, the foundation for everything else: a [repository](/publications/architecture-without-a-tool) grows out of that spreadsheet, [principles](/publications/architecture-principles) out of that log, and the first [forum](/publications/two-gate-architecture-review) out of the moment more decisions arrive than one person can hold.

The full arc from here - what to ship each quarter, when to open a forum, when to federate, when to hire - is laid out in [the first twelve quarters](/publications/first-twelve-quarters). This piece is quarter zero, the part that happens before anybody has decided the function exists.

## The kit

Three files in the [library](/library), free to use and adapt.

The **ninety-day pack** (document) holds the board reading checklist, the questions for the first project manager conversation, the impact note template with a worked example, the integration interview script, the as-is scoping rules, the one-page target template, the decision backfill triage, the phrases that work in the room, and the anti-patterns with what to do instead.

The **joining workbook** (spreadsheet) holds seven sheets, filled with a worked example throughout: a decisions-in-flight tracker, a workstream map, the interface list, a landscape derived from it by formula rather than by survey, a log of the impact notes you send and what each one led to, a backfilled decision log, and the ninety-day plan with the signals above attached to it.

The **worked artifacts deck** (slides) shows each output in full: the impact note that landed, the five questions and what the interface list gives you, the scoped as-is, the one-page target, the four artifacts side by side, and two backfilled decision records including a contested one.

Start with the impact note. It takes an afternoon, it costs you nothing if it is ignored, and it is the only artifact on this list that can turn an invitation into a second invitation.

The six weeks I spent drawing that first as-is were not wasted because the diagram was bad. It was a good diagram. They were wasted because I had confused producing architecture with practising it, and because the room I needed to be in was three floors away, deciding something, while I was colouring in boxes.

