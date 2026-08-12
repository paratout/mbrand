---
title: A data strategy is a slide until it becomes a factsheet
summary: How to build a data strategy that turns into something the repository can hold - the five decisions it actually has to make, the object factsheet field by field, the four joins that wire it to capabilities, applications, IT components and interfaces, the change loop that keeps it true as projects and policies land, who decides what in which forum, and a worked ERP clean core scenario from mastership disputes to the cutover. With a factsheet pack, an object model workbook, and a clean core scenario deck.
date: 2026-04-20
time: 09:20
updated: 2026-08-09
cover: /images/pub/data-strategy-object-model/cover-v1.png
status: published
---

The data strategy was sixty pages and I had read all of them. Three workstreams, a target operating model, a maturity curve with the company placed at level two and an arrow pointing at level four. It had been approved by the executive committee, which is not nothing.

Eighteen months later I sat in a design session where a team wanted to stand up a customer store for a campaign tool. I asked which system owned customer. Four people gave three answers, all of them confident, and a fifth said it depended on what I meant by customer. Everyone in that room had read the strategy. Two of them had written parts of it.

Nobody had failed. The strategy was fine as a piece of thinking. It simply could not be consulted at the moment it was needed, and a strategy that cannot be consulted at the moment of a decision is a document.

*The useful part of a data strategy is not the strategy. It is the list of objects, the name in the owner field, and whether anyone can change that name without a meeting.*

What follows is how I build one now, so that it lands in the repository as records rather than in a folder as prose, connects to the capability map and the application inventory you already keep, and survives contact with the projects and policies that arrive every month afterwards. It is composited from several missions in multi-market organizations, figures rounded and details blurred as always. It ends inside an ERP replacement, because that is where a data model either earns its keep or is quietly discovered to have been decoration.

## What a data strategy has to decide

Strip away the operating models and the maturity curves and there are five decisions, repeated per object. Everything else is implementation.

![The five decisions a data strategy owes each object, and the implementation layer that is not strategy](/images/pub/data-strategy-object-model/five-decisions-v1.png)

**Which objects matter.** Not every table. Not every entity in a logical model. The objects that two or more systems argue about.

**Who masters each one.** Exactly one system creates and changes it. Everyone else consumes. This is the single most consequential sentence in any data strategy and the one most often left out, because writing it down means telling somebody their system is not the master.

**What each one means.** One sentence, plus the boundary. A definition without a boundary is a slogan; the useful half is what the object is *not*.

**How it moves.** The contract, the direction, the shape, the latency people can rely on.

**Who answers for it.** A named business owner and a named steward, both of whom would take a phone call about it.

If a strategy does not answer those five for each object it named, it has not decided anything. It has described an ambition, and ambitions do not settle design sessions.

Notice what is not on the list: the platform, the lake, the warehouse, the catalog product, the mesh, the governance office. Every one of those gets better if the five decisions exist, and not one of them substitutes for making them. I have watched two organizations buy a catalog before they had an object list, and in both cases the catalog faithfully documented the confusion.

The starting move I now trust most is unglamorous: **read the interfaces you already have**. Anything two systems exchange is a domain object whether or not anybody has named it, and the interface inventory is an honest list produced by people who had to make something work. It is a far better first draft than a workshop, because it contains no aspiration.

## Scoping the list without drowning

The first object model I built had a hundred and forty objects and a genuinely beautiful diagram. I have not opened it since. The second had nineteen, half of them argued about in public, and people still send me corrections four years later. The difference was not modelling skill. It was that nineteen is a number a human being can hold in their head during a meeting.

Three filters get you to a workable list.

![Three filters that turn an entity list into a domain object list, and where the count usually lands](/images/pub/data-strategy-object-model/scoping-v1.png)

**Does an argument about it cross a system boundary?** If the object lives entirely inside one application and nobody outside cares how it behaves, it is that application's business. A picking wave is not a domain object. A material is.

**Does it have a lifecycle somebody manages?** Objects that are created, changed, approved, deactivated and archived by identifiable people are the ones worth governing. Objects that are derived on the fly are not objects, they are calculations.

**Would somebody fight about it?** The honest filter, and the most predictive. If naming a master for it would cost you a difficult conversation, it belongs on the list. If nobody would notice either way, leave it off and spend the attention elsewhere.

At group level that lands between twenty and forty objects for most organizations. Below twenty you are probably missing something structural. Above sixty you have started modelling a schema, and the model will be maintained by nobody within a year.

Domains can hold their own second tier - twenty group objects, plus perhaps fifteen more per domain that only that domain argues about. That is the same subsidiarity move that works everywhere else: keep at the centre only what the centre genuinely has to hold.

## Deriving it from your organization, not from a book

Data principles suffer from the same disease as architecture principles generally. "Data is an asset" is true, agreed, and has never resolved a disagreement in the history of the profession. The [derivation](/publications/architecture-principles) is the same work: mine the decision log for arguments that arrived three times, mine the incidents for what the post-mortem said would have prevented them, read the strategy for operational commitments, and be honest about what the organization is chronically bad at.

Three data principles I have seen actually decide things, written as trade-offs so they can lose:

**One system of record per object, even when a second copy would ship faster.** Forbids the fast local database that would have shipped the campaign three weeks earlier. Implication: some projects wait for the owning system to expose what they need. Exception route: a read-only reference copy, registered, with an expiry.

**Shared definitions over shared systems.** Right for a federation of autonomous units, where a mastership rule would be unenforceable theatre. Central invests in the definition and the exchange contract, not in convergence programmes. It is an offer rather than a constraint, which is exactly why it gets adopted.

**Traceable over convenient.** Right where an audit finding once cost more than a year of integration budget. Implication: every interface logs, including small internal flows that feel disproportionate.

Those three are mutually incompatible as a set for one organization, and that is the point. Same subject, different context, different answer. A data principle that would be equally at home in any company is not doing work.

### Local constraints are part of the model, not exceptions to it

In every multi-market organization I have worked in, the data model met reality in the same five places, and pretending otherwise just moved the collision later.

**Residency.** Data that cannot physically leave a jurisdiction. This is not a policy preference, it is a property of the object in that market, and it belongs on the factsheet rather than in a separate register that nobody reads.

**Legal basis and retention.** Different jurisdictions, different clocks, sometimes different lawful grounds for holding the same attribute. One object, several retention rules, scoped by jurisdiction.

**An approved local system.** A regulator signed off on a local tool, or a partner contract runs six more years. That system is going to keep mastering something for a while. Model it honestly as a scoped master with an end date instead of drawing a target that pretends it is gone.

**Language.** The same object is called three things in three markets, and the third one is the word people actually use in the warehouse. Aliases are a field on the factsheet, not a footnote. This single field has saved me more collection time than any other.

**Capacity.** A market with one IT person cannot run a stewardship process that assumes a team. Whatever you design has to work at the thinnest staffing in the federation, or it works nowhere.

Where nothing can be mandated at all, the model becomes an offer rather than a rule, and the [whole governing posture changes](/publications/governing-without-a-mandate) with it: definitions and contracts published centrally, adoption entirely voluntary, and the measure of success is how many units chose it rather than how many complied.

## The object factsheet

Here is the unit of the whole thing. A factsheet is one record per domain object, held in the repository next to your applications and capabilities, and it is where the five decisions stop being prose.

![The anatomy of an object factsheet - five bands of fields, with the two everybody skips called out](/images/pub/data-strategy-object-model/factsheet-v1.png)

**Identity.** Object ID, name, and aliases per market or system. The aliases field is the first of the two everybody skips, and it is the one that makes the model usable by people who do not speak headquarters.

**Meaning.** One-sentence definition. Then the boundary: *what this is not*. That second line is the other field everybody skips, and it prevents more argument than the definition does. "A supplier is a legal entity we can raise a purchase order against. A supplier is not a manufacturer we buy through a distributor, and not a one-off payee." Three lines, and a whole category of dispute closes.

**Ownership.** Business owner, data steward, and the owning capability. Both people named, both aware, one of them able to say no to a definition change.

**Systems.** The system of record. Systems of reference, which are authorized copies with a stated purpose and an expiry. Consumers. And the contradiction this field exists to surface: if two systems appear as master, the model has just found you a live incident waiting to happen.

**Substance.** The key attributes - not the schema, the arguable subset, usually eight to fifteen. The identifier scheme and how cross-references are held. Lifecycle states and who can move between them. Jurisdiction-scoped attributes, flagged as such. Classification, residency, retention, legal basis. Quality rules with their current measured value. Open exceptions with expiry. Last attested date and a change log.

One rule governs what goes on the sheet, and it is the same rule that keeps an [application inventory](/publications/application-portfolio-data-quality) from bloating: **every field must feed a named decision, or it does not go on the factsheet.** Not "it might be useful". Which decision, taken by whom, how often. Fields that cannot answer that get proposed at every review and should be refused at every review.

A factsheet is a page. If it is three pages, you are modelling a schema and the model will not be maintained.

## The four joins

A factsheet standing alone is a definition document with better formatting. What makes it load-bearing is that it joins to the things you already keep.

![The four joins - object to capability, application, IT component, and interface - and the questions they let you answer](/images/pub/data-strategy-object-model/four-joins-v1.png)

**Object to capability.** Which business capability owns the object's lifecycle. This is where business ownership stops being a name in a field and becomes structural: the capability has an owner, the owner has a budget and a seat at a forum, and the object inherits all of that. It also produces one of the most useful findings in the whole model, which is a capability whose core object has no owning system anywhere.

**Object to application.** With the role on the edge: master, reference, or consumer. Not a flat link. The role is the entire information content, and a link table without it tells you only that two things are related, which you already suspected.

**Object to IT component.** Where the data physically sits. Database, storage service, region. This is the join that turns residency from a six-week investigation into a query, and it is the reason the [application versus IT component line](/publications/application-vs-it-component) is worth the pedantry.

**Object to interface.** Which contracts carry it, in which direction, on which pattern. This join makes the integration inventory and the data model two views of one thing rather than two competing sources of truth.

Once those four exist, a set of questions becomes answerable in an afternoon that used to take a working group:

- Which systems are affected if we change the definition of this object?
- Where does personal data belonging to this market physically sit today?
- Which capabilities have no owning system for their core object?
- Which objects have more than one master right now?
- If this application is retired, which objects lose their master?
- Which interfaces would break if we changed this attribute?

None of that needs a product. The [year-one spreadsheet](/publications/architecture-without-a-tool) does all of it with a flat link table and stable IDs, and doing it in a spreadsheet first is a good discipline, because it forces the model to be small enough that a human can maintain it.

## Keeping it true

Here is where most data models die, and they die quietly. The model is accurate on the day the project ends, drifts for nine months, and is discovered to be fiction at exactly the moment somebody needs it.

The fix is not a bigger governance process. It is that **the model rides the decision paths that already exist**, so that keeping it current is a by-product of work people are already doing rather than an additional obligation nobody has time for.

![The change loop - how projects, policies and external events reach the model, and what closes the loop](/images/pub/data-strategy-object-model/change-loop-v1.png)

### Projects

One question is added to the [gate one-pager](/publications/every-project-needs-an-address), and it is the whole mechanism:

> Does this initiative create, change, copy, or move a domain object?

If the answer is yes, the object owner becomes a required reviewer at [gate one](/publications/two-gate-architecture-review), which is where the conversation is still cheap. Gate two checks the obvious thing: has the factsheet been updated, and is the new interface on the contract list. Neither gate becomes a data review. The question is one line on a form that is already being filled in.

Three quarters of project impact on the model is caught by that single question. The rest is caught by the interface layer, because a new interface is always a new relationship between an object and a system, and the integration standard already requires that interfaces be registered.

### Policies

This is the part that pays for the whole exercise, and it is worth stating plainly.

A retention policy change, a classification change, a residency requirement - these land on **the object**, not on the systems. You edit one factsheet, and the model generates the list of forty systems, interfaces and components that are now in scope. Without the model, that same change is forty conversations, most of them starting with "does this apply to us", and the answer arrives three months later with two systems missed.

I have watched the before and after of exactly this in one organization: a retention rule that took eleven weeks to trace the first time and four days the second, and the difference was not effort. It was that somebody had spent a quarter writing down where each object lived.

### The world

Laws change, vendors release, companies get acquired. These arrive without warning and without a project to hang them on, which is why they need a standing slot rather than an owner. The quarterly attestation is that slot: each object owner confirms their factsheet is still true, and a stale object becomes a finding routed to a person with a due date, exactly like every other finding in the [monthly quality report](/publications/portfolio-quality-report). No new report, no new meeting - three more lines in the report that already goes out.

### The four ways it decays

**Attribute creep.** The key attribute list grows toward the schema, one reasonable addition at a time. Caught by asking the decision question at every review, and by keeping a hard visible count.

**Definition drift.** Two teams quietly use the same word differently, and nobody notices until a report disagrees with another report. Caught by the boundary line and by making definitions cite the systems that implement them.

**Orphan objects.** An object whose owner left, whose steward moved on, whose last attestation was fourteen months ago. Caught by the attestation age, which is the leading indicator for the whole model.

**Classification collapse.** Everything becomes critical and confidential, because nobody was ever punished for over-classifying. Caught by publishing the distribution: if eighty per cent of objects are top tier, the tiering is decorative, and saying so once a year in public fixes it faster than any policy.

## Who decides what

No new governance body, with one exception. Data decisions fit into forums that already exist, and the important design choice is the escalation line rather than the meeting structure.

![Three forums, what enters each, what each can decide, and the two escalation triggers](/images/pub/data-strategy-object-model/forums-v1.png)

**The design forum, weekly, engineer level.** Attribute additions inside an agreed object, contract shapes, identifier and cross-reference schemes, quality rule thresholds. Most data decisions should die here, and a practice where they do not is a practice with a bottleneck at the top. Output: a line in the decision log and an updated factsheet.

**The architecture board, monthly.** New domain objects. Changes of mastership. Definition changes that cross domains. Registered exceptions with expiry. The [board](/publications/architecture-board-forum-system) already has the decision log, the exception register and the mandate-to-objectives handoff, and data decisions use all three unchanged.

**The data owners' circle, quarterly, chaired by the business.** The one genuinely new forum, and the only one architecture should not chair. Definitions, quality thresholds, classification, and the attestation results. Forty minutes if the pre-read is honest. Architecture attends to answer questions, not to run it - the moment architecture chairs the definition conversation, definitions become an IT artifact and the business stops correcting them.

Two escalation triggers, published in advance:

**A mastership change always goes to the board.** Not because it is technically difficult, but because it moves cost and accountability from one team to another, and decisions that move cost need a room where both teams are present and the outcome is written down.

**A definition change that crosses a domain goes to the board.** Within a domain, the steward decides. Across domains, somebody has to arbitrate and it should not be whoever shouted last.

The cleanest way I have found to express the rest is not a responsibility matrix but a short list of **who can say no**: the steward can refuse a definition change; the object owner can refuse a new consumer; the owning capability can refuse a lifecycle change; only the board can move mastership. Four sentences, and people remember them, which is more than I can say for any RACI I have ever drawn.

## The clean core scenario, worked

Now the practical case, because a data model that has never been tested against a large packaged programme has not been tested.

Setting: a multi-market ERP replacement, several markets, a target of a [clean core](/publications/clean-core-integration). The programme has a decision tree with four places work can go, six integration rules, and an extension register with expiry dates. What it does not have, on day one, is agreement about who owns what. That gap is where modifications come from.

![The supplier object before and after the model - the tangle, and what the model resolved](/images/pub/data-strategy-object-model/supplier-case-v1.png)

### Move one: publish mastership before the design workshops

This is the highest-yield thing I know for a programme of this kind, and it costs an afternoon plus two uncomfortable weeks.

Publish the object mastership list before the functional design sessions start. Not after. A surprising share of requests that arrive dressed as functional gaps are mastership disputes in a costume: a market asks for a field in the core because their system currently masters something and nobody has told them it will not any more. Answer the ownership question first and the functional conversation gets shorter, calmer, and more honest.

Expect the argument. It is finite - once per object, and then it is written down.

### Move two: the attribute triage

The most common extension request in any packaged programme is "we need one more field". The factsheet turns that from a judgement call into a lookup with three outcomes.

**The field is a group key attribute** that the standard does not carry. It belongs in the core as an in-app extension, registered, and the factsheet gains an attribute. One decision, applied everywhere.

**The field is jurisdiction-scoped and statutory.** It goes to the localization layer, built once per requirement rather than once per market, and the factsheet records it as scoped with the jurisdictions listed. The moment this field exists, "build it once" stops being an aspiration and becomes visible: the second market asking for the same statutory field gets pointed at a row.

**The field is local and not statutory.** It goes side-by-side or on the fit-gap list, and the factsheet records it as a local attribute with an owner and a review date. The core stays clean, the market keeps the field, and nobody had to be told their requirement was invalid.

Same request, three completely different answers, decided by looking rather than by arguing. That is the entire value proposition of the model compressed into one workflow.

### Move three: localization becomes a data question

The [triage between statutory, differentiating and historic preference](/publications/clean-core-integration) works better when the statutory bucket has somewhere to live. Jurisdiction-scoped attributes on the factsheet give it that home, and they turn a distinction people argue about into a field people fill in.

The side effect is a useful register: every jurisdiction-scoped attribute across the model, which is both the localization backlog and the answer to "how much of this programme is genuinely legal requirement". In the case I am thinking of, the honest answer was under fifteen per cent of what had been claimed, and having the list made that a calm conversation instead of an accusation.

### Move four: the interface layer follows the model

The canonical shape for an object is its key attribute list. One owner per object is rule two of the integration standard. The contract inventory and the object-to-interface join are the same data.

This is not a coincidence, it is the point: the integration standard and the data model are one document seen from two sides. When they are maintained separately they disagree within two quarters, and the disagreement is discovered by a delivery team at the worst possible moment.

### Move five: residency answered by the component join

A market says the personal data of its customers cannot leave the country. Without the model this is a six-week investigation involving four vendors. With the object-to-component join it is a query: here is where it sits today, here is where the target puts it, here is the gap and its cost.

The answer is sometimes bad news. It is bad news in four days rather than in the second week of user acceptance testing, which is a different kind of bad news entirely.

### Move six: the cutover

Mastership moves are the riskiest events in any migration, because for a period two systems are both writing and both believe they are right.

Three things make it survivable, and all three live in the model. The factsheet records the date mastership moves. The dual-write window is a registered exception with an expiry, not an understanding between two teams. And the change log keeps the old master listed as a system of reference with a stated end date, so that six months later nobody is guessing whether the legacy write path is still live.

I have seen a dual-write window that was supposed to last three weeks run for two years, entirely because nobody wrote down when it was meant to end. An expiry date in a register would have cost thirty seconds.

### What the model resolved, in one object

Supplier, before: three systems appearing as master depending on who you asked, two markets running their own supplier registers, roughly forty custom fields accumulated in the core over a decade, and nobody able to say which markets' data sat where.

After a quarter of work: one master with two authorized reference copies carrying expiry dates. Eleven group key attributes plus three jurisdiction-scoped ones. Both local registers kept in place as side-by-side systems with proper contracts, because they were doing real work and absorbing them would have turned a clean core programme into a consolidation programme. And six of the forty custom fields retired, not through a campaign, but because nobody could name the decision they fed.

The last number is the one I would put on a slide. Six fields is not a triumph. It is evidence that the question works.

## What it costs, honestly

**An object owner's time, quarterly.** Twenty minutes per object to confirm it is still true, less once the habit forms.

**A steward per object.** Five to ten per cent of somebody's existing job, not a new role. Fifteen objects, fifteen part-time stewards, drawn from people who already know the data.

**One extra question on a form.** That is the entire project-side process cost.

**The mastership argument, once per object.** Unpleasant, finite, and the whole point. If you never have the argument you have not made a decision, you have written down the current confusion in a neater font.

What it does not cost: a catalog product, a data office, a mesh, a lake, or a transformation programme. Those may all be good ideas. None of them is this, and buying one before making the five decisions produces an expensive, well-documented mess.

The failure modes worth naming, because I have been inside most of them:

**Starting with tooling.** The tool documents the confusion faithfully.

**Modelling everything.** A hundred and forty objects is a monument, not a model.

**Giving it to a data team with no authority over systems.** The model becomes a request queue, and requests can be ignored.

**Writing definitions in a workshop without looking at data.** The definition that emerges describes how people wish the object worked. Look at the actual values first; it is humbling and it is fast.

**Running it as a project.** Accurate on day one, fiction by month nine. The wiring into the gates is not the last step, it is the deliverable.

## The first ninety days

**Weeks one and two.** List candidate objects from the interfaces you already have. Do not run a workshop yet. You will get thirty to fifty candidates and a genuine surprise or two.

**Weeks three and four.** Name a master for the top ten. Publish the list. Take the arguments, and take them in public, because a mastership decision made privately reads as arbitrary and gets relitigated forever.

**Weeks five to eight.** Write ten factsheets, including the two fields everybody skips - aliases and what the object is not. One page each. Have the steward write the definition and the architect write the boundary; they catch different things.

**Weeks nine and ten.** Add the question to the gate one-pager. Tell the project managers why, once, in plain language: this exists so that nobody has to discover in month five that two systems own the same thing.

**Weeks eleven and twelve.** Run the first attestation and add three lines to the monthly report - objects, objects with a confirmed master, objects attested in the last quarter. Small numbers, published, moving in the right direction.

What not to do in ninety days: buy anything, model more than fifteen objects, hire a data office, or run a definition workshop before somebody has looked at the actual values in the actual system.

## Questions I get asked

**Is this master data management?** It overlaps and it is smaller. Master data management is a set of capabilities and usually a product. This is the decision layer above it: which objects, who masters them, what they mean. If you buy an MDM platform without these decisions, you have bought a very capable way to synchronize a disagreement.

**Do we need a data catalog?** Not to start. A catalog is excellent at describing what exists across thousands of tables. It is not designed to hold a decision about who owns a thing. Once the factsheets exist, a catalog makes them findable, which is a genuine improvement over a spreadsheet.

**Who writes the definitions, business or IT?** The steward drafts, the architect writes the boundary, the owners' circle approves. Definitions written only by IT describe the schema. Definitions written only by the business describe the intent. You want both, and the boundary line is where the disagreement surfaces safely.

**What if two markets genuinely need different definitions?** Then it is two objects, or one object with a jurisdiction-scoped variation, and both are fine. What is not fine is one name covering two meanings, which is how reports end up disagreeing and how three months get spent finding out why.

**How does this survive an acquisition?** Better than the alternative. The acquired unit's systems arrive with their own masters, and the model gives you a checklist rather than a discovery phase. Expect a period of scoped dual mastership with expiry dates - that is what the exception register is for.

**Our organization cannot mandate anything. Does this still work?** Yes, in the offer form. Publish definitions and contracts, master nothing centrally, and measure adoption rather than compliance. Shared definitions cost a unit nothing to adopt, which is exactly why they spread when shared systems do not.

## The kit

Three files in the [library](/library), free to use and adapt.

The **object factsheet pack** (document) holds the five-page data strategy skeleton, the factsheet template with every field and the decision it feeds, three fully worked factsheets, the data decision paper, the definition-writing guide with the boundary technique, terms of reference for the three forums, and the ninety-day plan.

The **object model workbook** (spreadsheet) holds the object register, the attribute register with jurisdiction scoping, the mastership sheet, the four join tables, attestation tracking, an exception register with expiry, and a derived-views sheet that computes the contradiction report, orphan capabilities, the residency answer and change-impact lists from what you have entered.

The **clean core scenario deck** (slides) walks the six moves with the supplier example in full, the attribute triage decision tree, the mastership move runbook, and the dual-write window with its expiry mechanics.

Take the workbook first. Even filled in badly, an object list with a master column will start conversations that a sixty-page strategy never did.

That strategy I read at the start was not wrong about anything. It just never got small enough to be used. The version that works fits on a shelf of one-page records, is edited by people who did not write the original, and settles an argument on a Tuesday afternoon without anybody needing to open a document. That is a lower ambition than a maturity curve, and it is the only kind I have seen survive.
