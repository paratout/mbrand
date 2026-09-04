---
title: The decision you did not write down will be made again
summary: What a decision record actually is, and why it is not only for design choices - classification calls, fit ratings, mastership moves, fit-gap dispositions, vendor selections and deliberate deferrals are all decisions somebody will re-litigate. One record shape, six kinds, and the register chosen by what the decision binds and for how long. With six fully worked records from different situations, the filing rules, how it changes what delivery and procurement can do, and how every register across the practice is the same object. Includes a record pack, a register workbook, and a scenarios deck.
date: 2026-04-20
time: 08:45
updated: 2026-08-18
cover: /images/pub/decision-records/cover-v1.png
status: published
---

I once spent six weeks re-running an evaluation that had already been run. Two years earlier a different team had compared the same three products, for the same purpose, in the same company. What survived was a slide deck with a recommendation on the final page and no reasons anywhere in it.

So we did it again, properly, and reached the same conclusion. Being right the second time is the most expensive way to be right.

What was missing was not documentation. There was a great deal of documentation. There were requirements, a scoring sheet, minutes, and a signed approval. What was missing was the one artifact nobody had produced: a short statement of what was chosen, what was rejected, why, and what the organization was accepting in exchange.

*A decision record is not documentation. It is the mechanism that stops an organization paying twice for the same argument.*

This piece is the one I get asked about most, usually in the form "we tried ADRs and they died". They die for a small number of predictable reasons, most of which are about scope and filing rather than about writing. What follows is what a record actually is, why it is not only for design choices, the six kinds that exist under different names, six worked examples from genuinely different situations, how to file them, and what changes for delivery and procurement once they exist. Composited from several missions, details blurred and figures rounded as always.

## What a decision record actually is

A dated, numbered statement of a choice, written by the person who made it, at the moment it was made.

![The anatomy of a decision record - the four fields that carry the value, and the test that tells you whether it is finished](/images/pub/decision-records/anatomy-v1.png)

The full shape has eight fields, and four of them do almost all of the work.

**What we chose.** One sentence, in the past tense, stating the decision rather than the topic. "We will master supplier in the core" and not "supplier mastership".

**What we rejected.** The alternatives that were genuinely considered, named. This is the field most often skipped and the one that pays back hardest, because without it the next person cannot tell whether their bright idea was already examined and dismissed, or never occurred to anybody. Both are common. They call for completely different conversations.

**Why.** The reason as it existed at the time, including the constraints that were true then. Not the justification you would give today.

**What it now costs us.** The consequence being accepted. A decision with no stated cost was not a decision, it was a preference.

The remaining four are administrative and take a minute: an ID, a date, the decider by name, and a status.

The test for whether a record is finished is not length. It is this: **could somebody who was not in the room reconstruct the reasoning well enough to disagree with it on the merits?** If they can only accept it or resent it, the record has failed, and it will be resented on a roughly eighteen-month cycle.

Two things a decision record is not. It is not a design document - the design says what was built, the record says why that shape rather than another. And it is not an approval. An approval says somebody with authority agreed; a record says what was agreed and on what basis. Organizations that conflate the two end up with signature blocks and no reasoning, which is the failure mode I opened with.

The term comes from software engineering, where the unit of decision was a choice inside one codebase, and it arrived with a lightweight template that has aged very well. What has not travelled is the scope. At enterprise scale the same shape covers far more ground than the technique's origins suggest, and that mismatch is where most of the confusion lives.

## No, it is not only for design choices

The most common misconception, and it comes honestly: the technique was born describing choices like "we will use this queue rather than that one", so people file it mentally under diagrams and stacks.

Here is the test that replaces the misconception.

> If two competent people with the same information could have decided differently, it is a decision and it needs a record. If there was only one possible answer, it is a fact, and it belongs in a field.

Run that test across a normal architecture practice and the surface is much wider than the design layer.

![Where decisions actually get made across a practice, and which ones usually go unrecorded](/images/pub/decision-records/decision-surface-v1.png)

**Inventory classification.** Whether the reporting layer is an application or an [IT component](/publications/application-vs-it-component). Two competent people genuinely differ, the answer changes counts and ownership and budgets for years, and almost nobody writes down which way it went or why.

**Mastership.** Which system owns an [object](/publications/data-strategy-object-model). The single most consequential class of decision in any landscape, and frequently recorded nowhere except in the behaviour of the systems themselves.

**Assessment.** A [business fit of 2](/publications/business-fit-technical-fit) rather than 3. A judgement, made by a named person, against a published anchor. Disputed constantly and recorded almost never.

**Lifecycle.** Setting a sunset date. Moving something to phase-out. A date somebody chose, which somebody else will want explained.

**Fit-gap disposition.** What we will do about a market's requirement: standard, [localization layer](/publications/clean-core-integration), side-by-side, or the fit-gap list.

**Selection.** Which vendor, and equally which vendors were excluded and on what evidence.

**Pattern and principle changes.** Revising a [pattern](/publications/architecture-patterns) to version two. Retiring a [principle](/publications/architecture-principles) because the behaviour it corrected became normal.

**Boundaries.** Where a domain ends and which side of a [seam](/publications/every-project-needs-an-address) leads.

**And the one people never think of: deciding not to decide.** A deferral with a trigger is a real decision with real consequences, and writing it down is what stops the same question arriving monthly for a year.

None of these are design choices. All of them get re-litigated. That is the whole argument.

## One shape, six kinds, several registers

So is it one thing or many things under different names? Both, and the distinction is worth being precise about, because getting it wrong produces either a single unusable register or a dozen incompatible ones.

**The shape is always the same.** Chose, rejected, why, cost, plus the four administrative fields. If two registers use different shapes, nobody can read across them, and reading across them is where the value compounds.

**What varies is what the decision binds, and for how long.** Those two properties determine where it is filed, who can overturn it, and when it gets reviewed. Six kinds fall out.

![Six kinds of decision record - what each one binds, how long it lives, where it is filed, and who can overturn it](/images/pub/decision-records/six-kinds-v1.png)

**Direction.** Binds future designs. Lives until superseded. Filed in the decision log. Decided by the [board or the design forum](/publications/architecture-board-forum-system). This is the classic one.

**Exception.** Binds a permitted violation of a rule. Lives until its expiry date. Filed in the exception register. Decided by the body that set the rule, never by the team that wants the exception.

**Classification.** Binds a value in the repository. Lives until the underlying fact changes. Filed on the record itself, in a rationale field, with a change log. Decided by the record's owner.

**Assessment.** Binds a judgement at a point in time. Lives until the next assessment cycle. Filed on the record, with the rater and the date. Decided by the named rater.

**Disposition.** Binds what we will do about a gap or a request. Lives until done, or until its review date. Filed in whichever register owns that flow - fit-gap list, extension register, remediation backlog. Decided by the domain architect.

**Selection.** Binds a purchase, and therefore a contract. Lives for the contract term. Filed in the decision log and in the procurement file, in both places on purpose. Decided by the steering body on architecture's evidence.

Two questions follow immediately, and both have the same answer.

**Why not one register for all of them?** Because their clocks differ. Exceptions expire, assessments refresh on a cycle, directions run until superseded, selections run to a contract end date. A register whose entries expire on four different clocks cannot be reviewed as one thing, and a review you cannot run is a register that rots.

**Why not a separate template for each?** Because then nobody can mine them. The single highest-return use of a decision log is reading a year of it looking for the same argument arriving three times, which tells you which [principle you are missing](/publications/architecture-principles). That only works if the entries are comparable.

One shape, six kinds, filed by clock. That is the whole taxonomy.

## Six worked records

Different situations, different kinds, real texture. These are compressed but the structure is exactly what I use.

### A classification call

The dull one, and the one with the longest tail.

> **CLS-014** &nbsp;2026-02-11 &nbsp;Decided by: portfolio owner
> **Chose:** the group reporting layer is recorded as one application, not as three IT components.
> **Rejected:** recording the query engine, the semantic layer and the scheduler separately as components under a notional parent.
> **Why:** business users interact with it directly to do their work, which is the line we apply everywhere. The three parts have no independent lifecycle and no separate owner.
> **Cost:** we lose the ability to report end-of-support dates per part; those move to a note on the record until the components model is extended.
> **Status:** active. Review when the semantic layer is replaced.

Small decision, and it changes the application count, who receives the attestation, whose budget carries it, and how it appears in every [quality report](/publications/portfolio-quality-report) from now on. Written in four minutes.

### A mastership move, which is two records

The subtlety worth naming: one event frequently produces two records on two different clocks.

![One event, two records - a permanent direction and a time-boxed exception, on different clocks](/images/pub/decision-records/two-records-v1.png)

> **ADR-092** &nbsp;2026-06-09 &nbsp;Decided by: architecture board
> **Chose:** price becomes mastered by the side-by-side pricing service from the Q4 cutover.
> **Rejected:** keeping mastership in the core and extending the condition technique; a third option of mastering price in the commerce platform was raised and dismissed because commerce is a consumer in every other object.
> **Why:** the pricing rules the business needs cannot be expressed in the standard condition technique without a core modification, and we are counting those down rather than up.
> **Cost:** an eight-week period in which two systems write price, and a reconciliation process nobody wants to run.
> **Status:** accepted. Supersedes ADR-041.

And separately:

> **EXC-11** &nbsp;2026-06-09 &nbsp;Approved by: architecture board
> **Deviates from:** one system of record per object (P-01).
> **Why:** the cutover requires dual write for eight weeks.
> **Expiry:** 2026-12-24. **Owner:** named architect.
> **Closure condition:** old write path off, confirmed by the object owner.

The direction runs until somebody supersedes it. The exception runs to a date, and appears on a quarterly review agenda until it closes. Filing them together in one entry would mean either the direction expires, which is wrong, or the dual-write window never expires, which is how a three-week arrangement once ran for two years.

### An assessment somebody disputed

> **ASM-2026-Q2-APP-118** &nbsp;2026-05-04 &nbsp;Rated by: head of procurement operations
> **Chose:** business fit 2.
> **Rejected:** 3, which the sponsoring market argued for.
> **Why:** anchor for 3 requires "does the job with accepted workarounds". Two of the four core steps are done outside the system, in a spreadsheet maintained by one person. That is a core gap being filled by a shadow tool, which is the published anchor for 2.
> **Cost:** the market reads this as criticism of their team. Mitigation: the record names the anchor rather than an opinion, and the rating is revisited next cycle.
> **Status:** current. Next assessment Q4.

This record exists to make a political argument into a technical one. The sponsor can still disagree, but now they have to disagree with the anchor, and anchors are published in advance for exactly that reason.

### A vendor selection

> **SEL-07** &nbsp;2026-03-18 &nbsp;Decided by: steering committee
> **Chose:** vendor B.
> **Rejected:** vendor A, excluded on mandatory criterion M-1 (cannot operate against externally mastered customer data, demonstrated live on our instance, not asserted). Vendor C withdrew at shortlist.
> **Why:** B met all three mandatory criteria and scored 3.3 against A's 4.05 on the weighted architecture criteria; the commercial gap was decisive at steering level and the architecture gap was judged recoverable through configuration.
> **Cost:** B's event publication is polling-based. We accept latency on stock updates and have written the interface expectation into the contract.
> **Status:** accepted. Contract signed 2026-04-02. Review at renewal.

Look at what that record does in year three. When somebody asks why not A, the answer is a demonstrated fact rather than a memory. When the account manager proposes the module that would have closed the gap, the accepted cost is on the page. And when the exit clause is questioned, the reason it was negotiated is attached.

### An exception that should have closed

> **EXC-09** &nbsp;raised 2024-09-30 &nbsp;renewed twice
> **Deviates from:** no local supplier stores outside the core and the two registered market registers.
> **History:** raised as a six-month workaround pending the onboarding service. Renewed 2025-04 (service delayed), renewed 2025-11 (no new reason recorded).
> **Closing:** PRJ-0418 extends the onboarding service to this market. Closure confirmed at project close.
> **Status:** closed 2026-07-12.

The second renewal is the tell. An extension without a new reason is a rejection with better manners, and a register that shows renewals with no reasons attached is telling you the quarterly review has stopped happening.

### A decision not to decide

The underrated one.

> **ADR-088** &nbsp;2026-01-27 &nbsp;Decided by: design forum
> **Chose:** defer the choice of event broker until the second producer exists.
> **Rejected:** choosing now on the strength of one producer and a proof of concept.
> **Why:** a single producer does not exercise the properties we would be selecting on. Choosing now means choosing on a demonstration rather than on load, replay and operability.
> **Cost:** the first producer ships on the existing queue and will migrate. Roughly two weeks of rework, accepted knowingly.
> **Trigger:** revisit when a second producer is funded, or by 2026-09-30, whichever is first.
> **Status:** accepted.

A deferral with a trigger and an accepted cost is a decision. A deferral without them is an unanswered question that will be asked again next month, and the month after.

## Who actually reads them

Worth being concrete about, because "for the future" is too vague to motivate anybody at four on a Friday.

**The next project.** Six months later a team proposes something that touches the same object. If the record is linked, it arrives in their impact list unprompted. This is the most frequent reader by a wide margin, and the one that only works if the links exist.

**The new joiner.** A domain architect three weeks in, trying to understand why the landscape looks like this. Records are the only artifact that answers "why" rather than "what". Everything else in the repository describes the current state, which tells a newcomer nothing about which parts are deliberate and which are residue.

**The person who disagrees.** Usually an engineer with a genuinely better idea, or the same idea that was already rejected for a reason they have not heard. Both need the record, and the second case is more common than architects like to admit.

**The auditor or regulator.** Rarely, and urgently. They are not checking that you made the right call; they are checking that a call was made, by someone with the authority, on a stated basis, on a date. A register answers that in an afternoon. Reconstruction from memory does not.

**Procurement at renewal.** Two years on, deciding whether to keep, renegotiate, or exit. The selection record tells them what was accepted and what was already known to be weak.

**And you, sooner than you expect.** The uncomfortable one. I have argued against a position I held eighteen months earlier, in good faith, having completely forgotten the constraint that produced it. The record was what stopped me from cheerfully undoing my own reasoning.

## Filing: where, when, and by whom

Most failed attempts fail here rather than in the writing.

![From decision to register - the filing route, the timing rule, and where records must never go](/images/pub/decision-records/filing-v1.png)

**When: at the moment, not afterwards.** The reasoning decays within days and is gone within weeks. What replaces it is a tidier reason that the decider now believes, which is worse than nothing because it is confidently wrong.

My working rule: **if the record takes more than twenty minutes to write, the decision has not actually been made yet.** That is not a writing-speed target. It is a diagnostic. When you cannot state what was rejected and why, you are still deciding, and the honest move is to say so in the room.

**Who writes it: the person who decided.** Not a secretary, not an analyst, not the architect who happened to be taking notes. An observer records the outcome accurately and loses the reason, because the reason lived in the decider's head and was probably never said aloud in full.

**Where: the register determined by the clock**, per the six kinds. And one thing that matters more than it sounds: **every record links to the things it touches** - the application, the object, the domain, the project, the interface. Without those links the record is findable only by someone who already knows it exists, which is precisely the person who does not need it. With them, it surfaces in the [impact list](/publications/every-project-needs-an-address) automatically, in front of the next project that touches the same ground.

**Numbering.** One sequence per register. Never reuse, never renumber. Gaps are fine and are evidence of nothing.

**Status, and never delete.** Proposed, accepted, superseded, rejected. A superseded record stays and points forward to the one that replaced it. Deleting it destroys the only trail that explains why the landscape looks the way it does, and it will be wanted precisely when it is gone.

**Where they must not go.** Slide decks. Meeting minutes. Ticket comments. Chat. All four are unsearchable at the moment of need, and all four are where decisions actually go in most organizations.

### Where to keep them

The question everybody asks third, after "what" and "when". The honest answer is that the medium matters far less than the shape and the links, and that every option works if those two are right.

**A spreadsheet.** Perfectly legitimate, and the right answer in [year one](/publications/architecture-without-a-tool). One row per record, one sheet per register, stable IDs, a column of linked object IDs. It searches, it filters, it exports. Its weakness is the long text fields, which is survivable.

**Markdown files in a repository.** Excellent for direction records, especially where engineers already live in the repo. Version history comes free and the diff shows how a decision evolved. Its weakness is that classifications and assessments belong on repository records rather than in files, so you end up with two homes anyway.

**A wiki.** Works if, and only if, records are a defined page type with a fixed template and a numbered index. Without that discipline they scatter and become unfindable within a year, which is the failure mode wikis are famous for.

**The portfolio tool.** The best end state, because the links to applications and objects are native rather than typed by hand. Not worth buying for this reason alone.

What actually matters, in every medium: a stable ID, a fixed shape, links to the things it touches, and one place where somebody can list everything with an expiry date this quarter. If your medium cannot do that fourth thing, it is not a register, it is a folder.

### The ones already made and never recorded

Every practice inherits hundreds. Do not backfill them all - that is a project with no end and no reader.

Backfill exactly the ones being re-litigated. When a question arrives for the second time, that is the signal: write the record then, dated today, marked as a reconstruction, naming who you asked. Ten of those in a year covers most of the ground people actually argue about, and each one is written at the moment somebody wants it, which is the only moment anybody will read it.

## The same discipline in four different situations

The shape does not change. What changes is which kinds dominate, how formal the filing is, and what the records are for.

![How the practice adapts across four situations - what dominates, what to skip, and the failure mode of each](/images/pub/decision-records/situations-v1.png)

### A greenfield, with no history to inherit

You are the only architect, there is nothing to backfill, and every decision is being made for the first time. That last part is usually wrong, and it is worth checking before you accept it: an organization with no decision log still has decisions, sitting in the integration team's list of things they keep refusing and in the rules everybody follows without knowing where they came from. [Backfilling eight or ten of those](/publications/joining-as-the-first-architect) is the cheapest way to teach an organization what a record is, because it uses decisions people already agree with, and the practice arrives before the first argument rather than during it.

**What dominates:** directions and classifications. Almost every call is setting a precedent rather than applying one.

**What to skip:** exceptions, for now. There are no rules yet to except from, and inventing an exception register before you have a principle is filing for its own sake.

**The move that pays:** record classifications from day one, especially the boring definitional ones. Whether a thing is an application, what an object is called, where a domain ends. These feel too obvious to write down and they are exactly the ones that get quietly re-decided by the fourth person to join, at which point your inventory has two conventions and no way to tell which is which.

**Failure mode:** recording nothing because the reasoning is still fresh in one head. That head goes on holiday in month seven.

### A federation, where nothing can be mandated

Autonomous units, [voluntary adoption](/publications/governing-without-a-mandate), no authority to compel.

**What dominates:** directions written as offers, and dispositions. A record here says "the group has decided this is the recommended shape, for these reasons" rather than "you will do this".

**What changes:** the reason field carries more weight than anywhere else, because reasons are the only instrument available. A unit that finds a well-argued record may adopt it; a unit that finds a mandate will not.

**What to skip:** exceptions almost entirely. If adoption is voluntary, a unit doing something different is not deviating, it is choosing, and filing that as an exception misdescribes the relationship in a way people notice.

**The move that pays:** record what units decided locally too, with their names on it. A register showing that four units chose the same shape independently is the most persuasive artifact a federation can produce, and it costs nothing to assemble.

### A programme under time pressure

Cutover in eleven weeks, decisions arriving daily, nobody has an afternoon.

**What dominates:** dispositions and exceptions, at volume.

**What changes:** the twenty-minute rule becomes a five-minute rule, and the record shrinks to four fields written in the meeting. Chose, rejected, why, cost. Everything administrative gets filled in later by whoever runs the register.

**What to skip:** perfect prose, and any record for a decision that binds only this week.

**The move that pays:** a standing agenda line at the end of every programme call - "what did we just decide, and who is writing it". Thirty seconds, and it catches the decisions that get made in passing, which under pressure is most of them.

**Failure mode:** the promise to write it all up after go-live. Nobody has ever kept it, myself included.

### A regulated or audited environment

Someone external will eventually ask.

**What dominates:** classifications and selections, plus anything touching personal data, residency or retention.

**What changes:** the decider field stops being courtesy and becomes evidence. It needs the person's role and their authority to make that call, and the date needs to be the decision date rather than the writing date.

**What to skip:** nothing, which is the cost of this environment. But resist the temptation to make records heavier - an auditor wants completeness and traceability, not eloquence.

**The move that pays:** link records to the objects and the components. When the question is "where does this market's personal data sit and who decided that", the answer is a filter rather than an investigation.

## What changes for delivery and procurement

This is where records stop being hygiene and start being leverage.

![How records flow into and out of delivery and procurement, and what each side gets back](/images/pub/decision-records/delivery-procurement-v1.png)

### Delivery

**Reviews get shorter, because the argument is cited rather than repeated.** A design that says "integration per ADR-063" is asking a reviewer to check conformance. A design that re-explains its integration approach is asking a reviewer to re-run the decision, and they will, and it will take an hour.

**Teams can disagree properly.** This is the part I care most about. A team that finds the record can bring new information and reopen the decision on the merits. A team that finds only the outcome concludes that architecture is arbitrary, and behaves accordingly for the next two years. Records do not make people comply; they make disagreement possible, which is a much better thing to have.

**Folklore stops forming.** "Architecture said no to that" is the most expensive sentence in any landscape, because it is unfalsifiable and it propagates. A numbered record with a reason kills it, and sometimes reveals that architecture never said any such thing.

**One line in the definition of done.** Decisions taken during the build are recorded before closure. It costs a few minutes per decision, and it lands while the team still remembers.

### Procurement

**The selection record is the audit trail**, and it protects the buyer more than it protects architecture. Two years on, when the question is why this vendor, the answer is evidence with a date on it.

**It pre-empts the end run.** Every serious procurement has a moment where a vendor's account manager reaches a sponsor directly with a reason the evaluation was unfair. A record naming the mandatory criterion, the evidence rule, and what was demonstrated on which environment ends that conversation in one reply.

**Contract clauses trace back to decisions.** When a supplier asks to soften the exit provision at renewal, the record says why it exists and what it cost to get. Without it, the clause looks like boilerplate somebody can trade away.

**And the flow runs the other way too.** A contract signed with a technical constraint inside it is an architecture decision, whether or not an architect was in the room. So is a delivery team's runtime choice made under deadline. Both need recording, by the people who made them, in the same shape. Architecture does not own the decisions; it owns the shape and the register.

## How this connects to everything else

The uncomfortable realization, if you have been reading these pieces in order, is that almost every register described across them is the same object seen from a different angle.

![One shape across the practice - which register each part of the work produces, and what each one feeds](/images/pub/decision-records/register-map-v1.png)

The [board's decision log](/publications/architecture-board-forum-system) holds directions and selections. The [clean core extension register](/publications/clean-core-integration) holds dispositions and exceptions. The [object factsheet](/publications/data-strategy-object-model) carries classification records in its change log, and its mastership moves are directions with a linked exception. The [constraint register](/publications/every-project-needs-an-address) tracks constraints whose closure status is itself a decision. [Fit ratings](/publications/business-fit-technical-fit) are assessments. The [pattern library](/publications/architecture-patterns) versions its entries, and each version bump is a direction. [Principles](/publications/architecture-principles) are derived by mining the decision log for repetition, and retired by a decision when the behaviour they corrected becomes normal.

Two feedback loops are worth naming because they only work if the records exist.

**Repetition to principle.** The same argument arriving three times in the log is not an annoyance, it is a missing principle announcing itself. This is the highest-yield use of a decision log and the reason it pays off in ways nobody predicts when they start one.

**Expiry to agenda.** Every time-boxed record generates its own review agenda. The quarterly session does not need a facilitator deciding what to discuss; the register decides, by date.

## Where this goes wrong

**Outcomes without reasons.** "We decided to use X." Useless in eighteen months, and worse than useless because it looks like a record and occupies the place where one should be.

**Written afterwards, by somebody who was not there.** Accurate outcome, invented reason.

**One register with mixed clocks.** Reviewable as nothing.

**Deleting superseded entries.** Removes exactly the trail that explains today.

**No links to the objects.** The record exists and never appears in front of anybody who needs it.

**A record required for everything.** Ask for fifty a month and you get zero. Ask for the ones where two competent people could have differed and you get the ones that matter.

**Approval theatre.** The record becomes a form with a signature block, the reasoning field shrinks to a sentence of justification, and within a year you have a compliance artifact rather than a memory.

**The alternatives field left blank.** The single most common failure, and the one that guarantees the argument returns, because nobody can tell whether their idea was considered.

## The first month

**Week one.** Pick the register you already half have - most practices have a decision log in some form - and fix its shape. Add the two fields that are almost certainly missing: what was rejected, and what this costs us.

**Week two.** Write records for the next five decisions as they happen, in the room, in twenty minutes each. Do not announce a programme. Just start, and let people see the artifact.

**Week three.** Add the links. Every record points at the applications, objects, domains or projects it touches. This is what makes them surface later.

**Week four.** Add one line to the definition of done, and put the expiring records on the existing quarterly agenda. Nothing new is created; two existing things gain a paragraph.

What not to do in month one: build a tool, define six registers before you have entries for two, mandate retrospective backfill, or write a policy about decision records. The policy is four sentences and can wait until the habit is real.

## The kit

Three files in the [library](/library), free to use and adapt.

The **decision record pack** (document) holds the one-page template, the six kinds with the test for choosing between them, all six worked records in full, the filing and numbering rules, the status lifecycle, the backfill triage, and the definition-of-done line.

The **decision and register workbook** (spreadsheet) holds the four registers on one shared shape - decisions, exceptions with expiry, classifications, assessments - with the links out to applications, objects, domains and projects, plus derived views: expiring records, records missing a reason or an alternatives field, decisions never cited, and a repetition counter that surfaces the arguments arriving three times.

The **scenarios deck** (slides) walks the six cases as they actually unfold, the gate paper that cites decisions instead of re-arguing them, the vendor selection record and its handover to procurement, and the conversation to have when somebody asks why a decision was made and there is no record.

Start with the two missing fields. Adding "what we rejected" and "what this costs us" to a log you already keep will do more in a month than any new register, and you will feel the difference the first time somebody arrives with an idea that was already examined in 2024 and can be shown exactly why it was set aside.

The evaluation I re-ran had cost the company two months the first time. The second run cost six weeks and produced the same answer. What would have prevented it was one page, written by someone who was in the room, on the day, and filed somewhere a stranger could find it. That is the entire discipline, and everything above is detail.
