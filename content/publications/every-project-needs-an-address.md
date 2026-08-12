---
title: Give every project an address
summary: How to define domains that survive a reorganization, tie every project to one within days of intake, and cascade from that address to a named impact list - then attach the whole thing to the PMO lifecycle you already have. Where the build path and the buy path diverge, why the delivery team and the procurement team need the same constraint written two completely different ways, and why "architecture requirement" is the wrong name for the right thing. With a domain and intake pack, a constraint and scoring workbook, and a build-and-buy playbook.
date: 2025-12-22
time: 08:15
updated: 2026-08-10
cover: /images/pub/every-project-needs-an-address/cover-v1.png
status: published
---

The first architecture review process I built was a gate. It was a good gate. It had a template, a slot in the calendar, a clear decision right, and I was proud of it for about four months.

Then I noticed the number of submissions was falling while the number of projects was rising. Nobody was defying me. They were just not finding me, and a few of them had quietly discovered that if a project never formally starts, it never formally needs a review. By the time work reached my desk it arrived in one of two states: already built, or already contracted. Both are states in which an architect is decoration.

What fixed it was not a better gate. It was making architecture arrive earlier, cheaper, and in a form nobody had to go looking for. And all of that turned out to depend on something unglamorous that I had skipped: every piece of work needs an address.

*A project with no domain has no reviewer, no impact list, and nobody who notices when it lands.*

What follows is the whole chain - how to define domains that survive a reorganization, how projects get tied to one, how the impact cascade runs from that address, how the whole thing attaches to the delivery lifecycle the PMO already runs, where the build path and the buy path stop resembling each other, and what architecture actually hands to a delivery team versus a procurement team. It is composited from several missions, figures rounded, details blurred.

## What a domain is, and what it is not

Domains get defined badly more often than they get defined well, and a bad domain model quietly poisons everything downstream, because every impact assessment for the next three years starts from it.

![What separates a domain from an org unit or a system grouping - three properties, three failure modes, and the boundary rule](/images/pub/every-project-needs-an-address/what-is-a-domain-v1.png)

**A domain is a slice of the business capability map with one accountable owner, a stable set of core objects, and a target architecture.** Three properties, and each one is doing work.

**One accountable owner.** A person, not a committee, and someone senior enough to have a budget conversation. If two names appear, you have drawn the boundary in the wrong place.

**A stable set of core objects.** Order management owns the sales order. Source to contract owns the supplier and the contract. This is the join back into the [object model](/publications/data-strategy-object-model), and it is what makes impact analysis mechanical rather than intuitive.

**A target architecture.** Not a picture of today - a statement of where this area is going, thin enough to fit on a page. A domain with no target is a folder, and comparing a project against a folder is not a review. This does not have to be a [full blueprint](/publications/domain-blueprinting) on day one; half a page of direction beats a beautiful diagram that arrives in month nine.

Three ways it goes wrong, all of them common:

**Mirroring the org chart.** The most tempting and the most expensive. Org charts change roughly every eighteen months, and when yours does, every domain assignment, every impact list and every reviewer mapping becomes wrong on the same day. Capabilities change on a timescale of years. Draw the domains on the capability map and let the org chart drift underneath them.

**Mirroring the systems.** A domain named after a platform is not a domain, it is a support group. The tell is that the domain's target architecture is "upgrade the thing the domain is named after", which is a plan, not a direction.

**Too many.** Thirty domains means no domains, because nobody can hold the list, and every project touches nine of them. Eight to fifteen at group level is where I have seen it work. The test is simple and unforgiving: can you name the owner of each one without opening a document? If not, there are too many, or some of them are not real.

### The seams are where the work is

The honest part of domain definition is that the boundaries will be wrong somewhere, and the wrongness clusters in predictable places. Order management and finance argue about the invoice. Customer management and marketing argue about consent. Logistics and store operations argue about stock in transit.

Do not solve this by redrawing the boundary until the argument disappears, because it will not. **Name the seams explicitly, in writing, with a rule for each one.** A seam register with six or eight entries - what the seam is, which domain leads, who is consulted, and what triggers a joint review - resolves more than a month of boundary redesign. It also gives you somewhere to put a project that genuinely lives in the middle, instead of assigning it arbitrarily and hoping.

## Giving every project an address

Once domains exist, the intake mechanism is almost embarrassingly small.

![The intake record - the five fields architecture needs, who fills each one, and what each one unlocks](/images/pub/every-project-needs-an-address/intake-record-v1.png)

**Five fields, added to the form the PMO already uses.** Primary domain. Secondary domains touched. A one-paragraph description of the change in business terms. Whether the intended route is build, buy, or unknown. And the expected first spend date, which is the only date that matters for timing architecture's involvement.

**The architect assigns the domain, not the project.** This matters more than it sounds. A project asked to declare its own domain will pick the one with the friendliest architect, or the one whose target architecture is most convenient, and it will do so without any malice at all. Assignment takes about four minutes and should happen within two working days of intake.

**One primary domain, never two.** Multi-domain projects are normal - most interesting ones are - but exactly one domain is accountable for the architecture outcome, and the others are consulted. Two primaries produces the thing every architect recognizes: two reviewers, two opinions, and a project manager who correctly concludes that neither is binding.

What the address buys you immediately, before any work is done: a named reviewer, a target architecture to compare against, the default set of objects in scope, and the [principles](/publications/architecture-principles) and [patterns](/publications/architecture-patterns) that already apply here. Four things that used to take a meeting, now available from a field.

## The cascade

Here is the mechanism the whole piece is built around, and the reason the repository work in the earlier articles pays off.

![From one address to a named impact list - seven layers, computed from the repository in about an hour](/images/pub/every-project-needs-an-address/cascade-v1.png)

An address expands, mechanically, through the relationships you already keep:

**Domain** gives you the capabilities. **Capabilities** give you the applications that support them. **Applications** give you the objects they master or consume, the interfaces they carry, and the IT components they run on. **Objects** give you the markets in scope and the residency constraints. **Interfaces** give you the second-order systems that will feel this change without anybody telling them. And the **exception register** gives you what is already broken here and has a date on it.

The output is not an assessment document. This is the part most organizations get wrong, and the difference is not cosmetic.

**The output is a list with names on it.** Six applications, named. Eleven interfaces, named, with their owners. Three objects, one of which this project intends to write to and does not master. Four markets. Two open exceptions expiring inside the project window. That list takes about an hour to produce from a [maintained repository](/publications/architecture-without-a-tool), and it is worth more than a forty-page assessment, because every line of it is somebody's phone number.

Five questions it answers before any money is committed:

- Does this project intend to create or change data it does not own?
- Does it duplicate a capability that already has a system?
- Which existing interfaces break, and who owns them?
- Which markets are affected who do not yet know?
- Is there already a registered exception here that this project should be closing rather than working around?

The fifth question has surprised people more than any of the others. A striking number of new projects are, on inspection, proposals to build a permanent version of a workaround that somebody registered as temporary three years ago.

**Early is the entire point.** The impact list is cheap when the project is a paragraph and a sponsor. It is expensive when it is a signed contract, and at that point it is no longer an impact list, it is a change request with a price.

## Attaching to the lifecycle that already exists

Architecture should never add a gate. I say this as someone who added one and watched it fail.

![Architecture's five touchpoints mapped onto a standard delivery lifecycle - what enters, what is decided, and the one exit condition that keeps the repository true](/images/pub/every-project-needs-an-address/pmo-lifecycle-v1.png)

Whatever your PMO calls its stages - idea, initiation, definition, execution, deployment, closure, or some four-letter variant - architecture attaches five touchpoints to them. Each one adds a field, a reviewer, or an exit condition to something that already happens.

**At intake: the address.** Two working days, four minutes of work. Output: domain assigned, reviewer named.

**At the first funding decision: the impact list and the route.** One hour of work, from the repository. Output: the named list, plus a recommendation on build versus buy versus extend-what-exists. This is the highest-leverage hour in the whole lifecycle, and it happens before there is a project team to disagree with.

**At definition: the constraints.** Five to eight, written for the audience, which by now is either a delivery team or a procurement team, and those are very different documents. More on that below.

**At execution: presence, not review.** For build, an architect in the design conversations rather than a submission from them - which is the whole argument for [two gates instead of a committee](/publications/two-gate-architecture-review). For buy, largely nothing, because the leverage was spent at the RFP and pretending otherwise is theatre.

**At closure: the repository delta.** And here is the mechanism I would keep if I could keep only one.

### Nothing closes until the repository reflects it

Project closure requires an accepted inventory delta: new applications registered with owners, retired ones marked retired, interfaces registered with contracts, object links updated, and any constraint recorded as met, deviated with a registered exception, or withdrawn.

This single exit condition does more for repository accuracy than any attestation campaign, because it lands at the moment when the people who know the answer are still in the room and still care about finishing. It costs a project manager about ninety minutes. It saves the next project a discovery phase.

Two practical notes. Make the delta a checklist with counts rather than a free-text form, or you will receive prose. And let the PMO own the enforcement rather than architecture - a closure condition administered by the PMO is administration, and the same condition administered by architecture is a power grab.

**If the PMO lifecycle is weak or barely exists**, which is the honest case in plenty of organizations, attach to money instead. Budget approval is a gate whether or not anyone calls it one, and finance is usually delighted to add a field to a form if you explain what it prevents.

## Where build and buy stop resembling each other

The two paths share everything up to the first funding decision and then diverge so sharply that treating them as one process is the second most common way this fails.

![Two tracks from one address, with the point of no return marked on each - and what architecture can still change after it](/images/pub/every-project-needs-an-address/build-buy-v1.png)

**On the build path, architecture is continuous and design-time.** Constraints are guidance with tests. The reviewer is present in design conversations. Things can be revisited: a bad decision in month two is a refactor in month four, which is unpleasant and survivable. The characteristic failure is that architecture reviews a design after the sprint that built it, which converts advice into criticism and makes an enemy for no gain.

**On the buy path, architecture is contractual and one-shot.** Everything must be in the document that goes out, because the moment a contract is signed the leverage is gone. You cannot review your way into an integration capability the product does not have. The characteristic failure is arriving after the shortlist, when three vendors have already been narrowed on commercial grounds and the honest answer about all three is "none of them fit, and it is now expensive to say so".

Here is the asymmetry stated plainly, because it is the thing I most often have to explain to a steering committee:

> On the build path you can change your mind, and it costs money. On the buy path you get one attempt, it happens earlier than anyone expects, and after it your only remaining instrument is a change request priced by somebody who knows you have no alternative.

| | Build | Buy |
|---|---|---|
| When architecture speaks | Continuously, from definition through execution | Once, before the long list is drawn |
| What it produces | Design constraints with tests, pattern references, interface contracts | RFP architecture section, weighted scoring criteria, integration annex, exit clauses |
| Point of no return | Soft. Refactoring is expensive, not impossible | Contract signature. Absolute |
| What can still change after | Most things, at a cost | Configuration, and whatever the contract says |
| Characteristic failure | Reviewing the design after it was built | Being invited after the shortlist |

There is a third path that deserves naming because it is the most common and the least documented: **extend what already exists.** A meaningful share of projects that arrive as build or buy are neither, and the impact list is what reveals it. Somebody already has ninety per cent of this. The answer is a conversation between two domains, not a project. Say so at the first funding decision, in writing, and accept that you will be unpopular with the sponsor for about a week.

## Two customers, two documents, one constraint

This is the part of the question I find most people have never separated, and it produces a lot of avoidable friction. The constraint is the same. The package is completely different, because a delivery team and a procurement team can do entirely different things with a sentence.

![The same constraint expressed three ways - as a principle, as a delivery test, and as a scoreable procurement criterion](/images/pub/every-project-needs-an-address/three-expressions-v1.png)

### What the delivery team needs

**Something they can check themselves, at four in the afternoon, without a meeting.**

Five to eight constraints, each one written as a statement plus a test. The test is the whole value: an unambiguous question a developer or a solution architect can answer alone, in under five minutes, with a yes or a no.

Not "the solution should follow the [integration standard](/publications/clean-core-integration)". That sends someone to a twenty-page document at the exact moment they are trying to finish something, and what they will actually do is guess.

Instead: *"Every interface to the core uses a released API or event. Test: name the API or event for each integration point in your design. If you cannot name one, raise it now rather than at the review."*

Attach the source - a principle number, a pattern reference, a board decision - so that the constraint is visibly derived rather than invented, and so that a team who disagrees knows exactly what to argue with. Constraints that arrive with no source read as personal preference, and they get treated accordingly.

### What the procurement team needs

**Something they can score.**

Procurement cannot evaluate "should be well architected", and asking them to is not a request, it is an abdication. What they can do, extremely well, is run a structured evaluation - if you give them criteria with three properties: a category, a scale, and an evidence rule.

**Mandatory, pass or fail.** Two to four of these, no more. A mandatory criterion is worth more than any weighting, because it removes a vendor rather than costing them points. Use them for the things that genuinely cannot be worked around: data residency, a released integration interface, an exit provision.

**Weighted and scored, zero to five, with written anchors.** An unanchored score is a popularity contest. Write what a 5 looks like and what a 2 looks like, in one line each, before anyone sees a proposal. Keep the architecture criteria separate from the functional ones, and keep both separate from commercial - the same discipline that keeps [business fit and technical fit](/publications/business-fit-technical-fit) from being blended into a single misleading number.

**Evidence rules.** For each criterion, what counts as proof - published API documentation, a live demonstration on the vendor's own environment, a reference call with a customer of similar shape, or a written contractual commitment. A vendor answering "yes" to a questionnaire is not evidence, and every procurement professional I have worked with knows this better than I do; they simply need permission to insist.

**And the weighting itself.** If the architecture criteria carry ten per cent of the total score, they do not matter and everyone in the room knows it. Twenty-five to thirty per cent is where it becomes real, and I would trade five of those points for one additional mandatory criterion any day of the week.

### The translation, worked

One constraint, three expressions. This table is the single most useful page I hand to a new architect.

| | Wording |
|---|---|
| **Principle** | One system of record per object, even when a second copy would ship faster |
| **Delivery test** | Does this design create or update an object another system masters? Name the object and the owning system for every write in your design |
| **Procurement criterion** | *Mandatory:* the product can operate against externally mastered customer data without maintaining its own authoritative copy. *Evidence:* live demonstration against our test instance, not a screenshot |

Who writes what: **the architect writes the constraint once, then translates it.** Never let procurement author the architecture criteria, because you get questionnaire language that vendors have answered a thousand times. Never let architecture set the commercial weighting, because we are not qualified and we will get it wrong in a direction that embarrasses everyone.

## They are not architecture requirements

Now the naming question, which is not pedantry - the name determines where the thing lands, and where it lands determines whether it survives.

**"Requirement" is the wrong word, for two reasons.** First, a requirement is something a project may trade away against cost and time. That is what requirements are for. Put an architecture statement into a requirements list and it will be prioritized alongside everything else, by people whose job is to descope, and it will be descoped - correctly, by their rules. Second, requirements are cheap to write, so calling them requirements invites a wishlist, and a wishlist of thirty is a wishlist of none.

What actually gets issued is three different things wearing one name.

![What architecture actually issues - constraints, design inputs, and conformance checks - and where each one has to land](/images/pub/every-project-needs-an-address/constraint-anatomy-v1.png)

**A constraint.** A must, with a reason and an expiry. It is not tradeable by the project; it is deviable through a registered exception with a date. It lands at the gate.

**A design input.** Context that should shape the solution but does not dictate it: the target architecture for this domain, the objects in scope, the three markets with residency rules, the pattern that solves this exact problem already. It lands with the designer, as early as possible, and its value is entirely in arriving before the first sketch.

**A conformance check.** Something verified at a specific moment: the interface is registered, the object links are updated, the pattern was followed or a deviation recorded. It lands in the definition of done, and it is checked by whoever already checks the definition of done.

Splitting the three is most of the benefit. Whatever your organization already calls them, make sure a constraint does not end up in a backlog, a design input does not end up in a gate paper nobody reads before designing, and a conformance check does not depend on an architect remembering.

**The anatomy of a constraint**, and each field earns its place:

- **ID**, so it can be cited and closed.
- **Statement**, one sentence, in the imperative.
- **Reason**, for this organization, naming the thing that went wrong or the commitment being served. A constraint without a reason gets negotiated; a constraint with one gets complied with or properly argued.
- **Source** - a principle, a pattern, a board decision, a law. Visibly derived, not invented.
- **Test**, answerable alone in five minutes.
- **Owner**, a named architect who will take the call.
- **Expiry or review date**, because some constraints exist only until a platform lands.
- **Exception route**, stated on the constraint itself. A constraint with no legitimate way to deviate gets violated silently.

**Five to eight per project.** If you cannot get under eight, one of two things is true: the project is too big and should be split, or the domain's target architecture is not written down and you are compensating by writing it out one project at a time.

## Submitting it inside normal work

The last piece of the question, and the one that decides whether any of this is used: how does it enter everyday business without becoming a parallel bureaucracy.

**The rule: architecture never produces a document somebody has to go and read.** It produces content that lands inside artifacts the project already has.

- The **impact list** goes into the business case, as an appendix with counts and names. Sponsors read business cases.
- The **design inputs** go to the solution designer directly, in a conversation, on the day the domain is assigned. Not in a portal.
- The **constraints** go into the definition and gate paper the PMO already circulates, as a numbered block.
- The **procurement criteria** go into the RFP as a section, drafted by architecture and owned by procurement.
- The **conformance checks** go into the definition of done, or into the closure checklist.
- The **repository delta** goes into the closure checklist, as counts.

One page holds all of it. I call it the architecture input sheet, which is a boring name on purpose: address, impact list, route recommendation, design inputs, constraints, conformance checks. Attached to whatever the PMO already circulates, never sent separately.

**Two timing rules.** The address within two working days of intake. Everything else within five working days of the first funding decision. Miss those and the sheet arrives after the decision it was meant to inform, at which point it reads as second-guessing.

**One tone rule, which is not optional.** It must be readable by a project manager with no architect present. If explaining it requires a meeting, it will not be used, and the meeting will not be booked. Read it back to yourself as if you were the person receiving it on a Friday afternoon.

**And close the loop.** At closure, each constraint is confirmed met, met with a registered deviation and a date, or withdrawn because it turned out not to apply. Never left open. An open constraint from a project that closed eight months ago is how the whole apparatus loses its authority, quietly, without anybody deciding anything.

## One project, end to end

Concrete, composited, and compressed.

**Day 1.** A request arrives: a market wants a tool to manage supplier onboarding. The intake form now has five extra fields, and the PMO has filled in four.

**Day 2.** The architect assigns it: primary domain source to contract, secondary domains finance and legal. Route unknown. Reviewer named. Four minutes.

**Day 9, first funding decision.** The impact list, produced in an hour: this touches four applications, the supplier object which the core masters and this tool would want to write to, six interfaces, two markets, and one registered exception from 2024 that expires in four months and covers exactly this workaround. Recommendation: not a build and probably not a buy - two other markets already have something close, and the exception that expires is the real driver. Take it to the board.

**Day 20, [board](/publications/architecture-board-forum-system).** Decision: extend the existing side-by-side service for two additional markets, close the 2024 exception rather than renewing it, and reject the standalone tool. The mandate becomes a key result in the receiving team's next quarter rather than a parallel project.

**Day 25.** Six constraints issued to the delivery team, each with a test. Design inputs handed over in a forty-minute conversation, including the pattern that already solves the onboarding workflow and the residency rule that applies to one of the two markets.

**Execution.** The architect attends three design sessions. One constraint is deviated - the market needs a local approval step that the pattern does not carry - and the deviation is registered with a twelve-month review.

**Closure.** Repository delta accepted: no new application, one extended service, three new interfaces registered with contracts, supplier object links updated for two markets, one exception closed and one opened. Ninety minutes of the project manager's time.

The whole architecture cost of that project was about six hours spread over four months. The version of it I have also lived through, without the address, cost a signed contract, a nine-month build, and a system that had to be integrated twice.

## Where this goes wrong

**Domains drawn from the org chart.** Everything is fine until the reorganization, and then every assignment is wrong at once.

**The project assigns its own address.** Not malice. Just the path of least resistance, and it always leads to the friendliest reviewer.

**The impact assessment is a document.** Forty pages, no phone numbers. A list of names beats it every time and takes a fortieth of the effort.

**Architecture adds a gate.** Projects route around it, and the ones that route around it most successfully are the large ones.

**Buy-path involvement after the shortlist.** By then the honest architecture answer is expensive to say, so it gets softened, and everyone spends three years living with the softening.

**Twenty constraints.** None get read. Eight get read. Five get followed.

**Architecture at ten per cent of the procurement score.** A rounding error with a seat at the table.

**Constraints never closed.** The register grows, nobody reviews it, and within a year the constraints are advisory in practice while still being mandatory on paper, which is the worst of both.

**Unowned seams.** Projects that sit exactly between two domains get assigned arbitrarily and then reviewed by somebody with no authority over half of what they touch. The seam register is fifteen minutes of work and prevents this entirely.

## The first sixty days

**Weeks 1 and 2.** Draft eight to twelve domains on the capability map, not the org chart. For each: the owner's name, the core objects, and three lines of target direction. Take the draft to the three people most likely to object.

**Weeks 3 and 4.** Write the seam register. Six to eight entries. This is the artifact that makes the domain model usable rather than merely correct.

**Week 5.** Add the five fields to the intake form. Talk to the PMO before you talk to anyone else, and frame it as reducing rework rather than adding governance, which happens to be true.

**Weeks 6 and 7.** Run the cascade manually for the three projects currently in flight, even though it is late for them. You will find something, and finding something is how the mechanism earns its place.

**Week 8.** Add the closure condition. One line: the repository delta is accepted before a project can close. Get the PMO to own it.

What not to do in sixty days: build a portal, define thirty domains, write a governance policy, or create an architecture review board that did not previously exist. Every one of those is a way of doing the visible part of the work without doing the part that changes outcomes.

## The kit

Three files in the [library](/library), free to use and adapt.

The **domain and intake pack** (document) holds the domain definition template with the three-property test, a worked domain charter, the seam register with example entries, the five intake fields with assignment rules, the five touchpoints mapped onto a generic delivery lifecycle, the architecture input sheet, and the closure checklist.

The **constraint and scoring workbook** (spreadsheet) holds the domain register, the project register with addresses, an impact cascade that computes the affected applications, objects, interfaces, components and markets from the links you already keep, the constraint register with source, test, expiry and closure status, and a vendor scoring model with mandatory criteria, weighted criteria, written anchors and evidence rules.

The **build and buy playbook** (slides) walks both tracks with the point of no return marked, the RFP architecture section with worked criteria and scoring anchors, the delivery constraint sheet worked in full, the evidence table, and the contract clauses worth arguing for before signature rather than after.

Start with the seam register. It takes an afternoon, it is the artifact people quote back to you first, and it will tell you within a week whether your domain boundaries are drawn in the right places.

The gate I built was not a bad idea, it was a bad first move. Governance that arrives at the end is only ever a veto, and a veto is the least useful thing an architect can offer. Arrive at the beginning, with a list of names and five sentences somebody can check without you, and you will find you almost never need the veto at all.
