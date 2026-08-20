---
title: An architecture board people do not route around
summary: The long version of how to stand one up: the forum system around it, who sits where and who visits, how to moderate it, what flows in and out, how OKRs and project management plug into it, and what all of this does to your inventory and your diagrams. With the first ninety days mapped out.
date: 2025-10-13
time: 18:10
updated: 2026-04-07
cover: /images/pub/architecture-board-forum-system/cover-v2.png
status: published
---

Anyone can create an architecture board. It takes an afternoon: a charter, a distribution list, a recurring calendar invite. I have watched several come into existence exactly that way, and I have watched most of them die the same death - not cancelled, just increasingly routed around, until the calendar invite outlives the institution the way a lighthouse outlives a shipping lane.

The boards that survive have something in common, and it is not a better charter. They sit inside a small *system* of forums, each doing a job the others cannot, connected to the machinery that actually moves the company: the objectives cycle, the project lifecycle, and the architecture repository. Remove any of those connections and the board becomes what its critics always suspected it was - a room where slides go to be admired.

*A board is not a meeting. It is the visible tip of an operating model, and it is exactly as strong as the plumbing underneath it.*

This one is longer than my usual pieces, because the request I get most often is not "should we have a board" but "how exactly do we set one up" - and the honest answer does not fit in five minutes. As always, what follows is composited from my own missions on multi-country landscapes, blurred where it needs to be. The mechanics are the point, and the mechanics are real.

## One board is never enough

The first mistake is asking a single body to make every kind of decision. Architecture decisions come at three different altitudes, and they need three different rooms.

At the top: **enterprise decisions**. Standards, patterns, technology lifecycle verdicts, exceptions to all of the above, and the handful of decisions each quarter that reshape the landscape - a new platform, a major retirement, a build-versus-buy above a threshold. This is the architecture board's altitude, and only this. A board that discusses anything a single project could settle on its own is wasting its most expensive asset, which is the attention of senior people.

In the middle: **design assurance**. The weekly, engineer-level forum where solution designs are pulled apart while they are still cheap to change - I described its two-gate skeleton in [the governance article](/publications/two-gate-architecture-review), so I will not repeat it here. What matters for this piece is the relationship: the design forum is where ninety percent of architectural conversation happens, and it is the board's early-warning system. When the same question surfaces in the design forum three weeks running, that question is a standards gap, and it should arrive at the board as an agenda item before any project forces it.

At the base, and most neglected: **domain syncs**. A standing conversation per business domain - commerce, supply chain, finance, people - where the domain architect and the business side of that domain look at the same picture once or twice a month. No approvals, no gates. This is where the business learns what the landscape actually looks like, and where the architect learns what the business is quietly planning. Most of what people call "alignment problems" are just the absence of this room.

![The forum system at three altitudes - domain syncs feeding a weekly design forum feeding the board, with the demand board as the neighboring institution](/images/pub/architecture-board-forum-system/forum-map-v1.png)

There is a fourth body on the map that architecture does not own but must attend: the **demand or portfolio board**, where money and priorities are decided. The architecture board does not compete with it - it feeds it. Landscape consequences go in ("this request duplicates a capability we already own three times"), and funded mandates come back out. Where organizations go wrong is merging the two: the moment budget authority and architecture authority sit in the same meeting, every architecture conversation becomes a funding negotiation, and technical truth is the first casualty.

The bridge between business and technology is not one forum, in other words. It is the domain syncs at the bottom and the shared seat at the demand board at the top, with the board and design forum doing the technical work in between.

## Establishing the board: who sits, who chairs, who visits

Composition decides credibility. My working rule: **seven voting seats, give or take one**, and every seat pays for itself.

The voting core: the lead enterprise architect, who chairs; two to three domain architects, rotating if you have more domains than seats; the security architect, because retrofitting security verdicts is how boards get overruled later; the platform or infrastructure lead, because someone must speak for what things cost to run; and - non-negotiable, and the seat most often missing - at least one senior business representative. A global process owner or a business domain lead, someone who can say "that workaround you are blessing costs my team four hours a week" with authority. A board without a business voice is an IT committee, and the organization will treat its decisions accordingly.

I once inherited a board with nineteen standing members. It had not made a contested decision in a year - with nineteen people the cost of disagreement is too high, so everything contentious was settled in corridors beforehand and the meeting performed the ratification. We cut it to eight. The corridor traffic dropped within a quarter, because the room became a place where disagreeing was cheaper than lobbying.

Around the core, two more rings. **Standing guests** attend always, without a vote: the PMO lead, who carries board verdicts into the project machinery, and a secretary - a real role, not a rotating chore - who owns [the decision log](/publications/decision-records), the agenda, and the repository links. **Visitors** come for one agenda item: the solution architect presenting a design, the project manager whose stage gate depends on a verdict, the business owner of an affected application. Visitors enter for their item and leave when it closes. This is not rudeness; it is what makes people willing to speak plainly in the room, and it keeps the meeting from swelling into an audience.

Vendors never attend. Their material can; their people cannot. A board that lets a vendor present is outsourcing its judgment in front of witnesses.

![The room itself - seven voting seats, two standing guests, visitors cycling through per agenda item, and the seats that must never be added](/images/pub/architecture-board-forum-system/board-room-v1.png)

The charter fits on one page: what the board decides (standards and patterns, exceptions with expiry, technology lifecycle, decisions above the agreed threshold), what it explicitly does not (project internals, budgets, staffing), quorum (chair plus four, always including the business seat for anything touching a business process), and the decision rule. Mine is consent-based: an item passes unless a voting member states a reasoned objection - and "I was not consulted earlier" is not a reasoned objection. Ties are broken by the chair; overrides go up to the IT leadership team in writing, which happens about once a year and should stay that rare in both directions.

## How to moderate it so it stays alive

Format is not bureaucracy - format is what protects the meeting from its own worst instincts.

**Cadence**: every two weeks, seventy-five minutes, protected slot. Weekly boards starve for content and start inventing it; monthly boards become bottlenecks and projects learn to plan around them, which is the beginning of the end.

**The agenda closes 48 hours before**, and every item ships with a pre-read: a one-page decision paper. Context in three sentences, the decision requested, options considered with honest trade-offs, the recommendation, and - this is the part people forget - the affected fact sheets in the repository, linked. No pre-read, no slot. This rule will be tested within the first month by someone senior arriving with slides and charm. Hold it, politely, once, and the pre-read culture takes root; fold, and you will be improvising forever after.

**Split the chair from the moderator.** The chair owns decisions; a moderator - I have used the secretary, or rotated it among domain architects - owns the clock and the speaking order. The chair who moderates their own contested item is a conflict of interest with a timer.

**Three outcomes per item, no fourth**: approved; approved with conditions, each condition with a name and a date; or sent back with written questions. The outcome that kills boards is the informal fourth - "let's discuss this again next time" - which is a decision to not decide, billed at the hourly rate of nine people. If an item is not ripe, the moderator says so in minute five, and it goes back with questions instead of consuming forty minutes to reach the same conclusion.

**The decision is written in the room.** Not minutes circulated a week later - the secretary drafts the decision record live, the chair reads it aloud before the item closes, and the room hears exactly what was decided. Half the governance disputes I have ever mediated were two people who left the same meeting with different memories of it.

And watch for the three deaths. Status theater: the board reviewing progress instead of deciding - progress belongs in the PMO deck. Retro-approval: blessing what was already purchased, which teaches the organization that the board is a formality with a lag. And the silent veto: the member who says nothing in the room and unpicks the decision afterwards in private - the consent rule exists precisely to flush this out, because silence in a consent round is a recorded yes.

> The measure of a good board is not what it decides. It is what nobody needs to bring to it anymore, because the answer is already written down.

## What flows in, what flows out

A board is a machine with typed inputs and outputs. Four things come in: **decision papers** (the one-pagers above); **exception requests** - deviation from a standard, with a business reason and a requested expiry, because an exception without an expiry date is just a standard you are embarrassed about; **design escalations** the weekly forum could not settle; and **roadmap changes** - a domain wants to bring a retirement forward, push a migration back, adopt something new.

Four things go out. **Decision records**: numbered, one page, findable by people who were not in the room - the format I use has held up across missions: context, decision, consequences, conditions, links. **Standards and [pattern](/publications/architecture-patterns) updates**: the reusable residue of decisions, because a decision that changes what everyone should do next time must update the pattern library the same week, or it will be re-litigated by every future project that never read the decision log. **The exception register**: every active deviation with its expiry, reviewed quarterly, and the single most honest KPI a board has - a register that only ever grows is a board that has stopped saying no, or a standard that deserves to die. And **mandates**: the work a decision creates, handed to the teams that will do it. More on where mandates land in a moment, because this is where OKRs come in.

![The board as a machine - four typed inputs, four typed outputs, with the repository underneath as both source and destination](/images/pub/architecture-board-forum-system/board-io-v1.png)

## Where the OKRs plug in

The most common failure mode after "nobody comes" is the opposite: the board decides plenty, and nothing happens. Decisions without an execution vehicle are opinions with a letterhead. The execution vehicle that has worked for me is the one the organization already runs: the quarterly objectives cycle.

Two connection points. First, **mandates become key results in the receiving team's OKRs** - not in a parallel architecture backlog. If the board decides the group standardizes on one integration platform, then the retiring team's next quarter carries "migrate the last twelve interfaces off the legacy broker" as *their* key result, negotiated with them, sized by them, tracked in their cadence. The architecture function contributes; it does not own a shadow delivery organization. This is the same absorption principle I described for [due diligence harmonizations](/publications/landscape-due-diligence), and it is the difference between a board with consequences and a board with correspondence.

Second, **the architecture function itself runs on the same cycle**, with a small set of objectives the board sponsors and reviews: pattern adoption share, exception burn-down, repository quality KPIs of the kind I laid out in [the inventory article](/publications/application-portfolio-data-quality). One board session per quarter - the first of the quarter, in my calendars - is the OKR checkpoint: last quarter's architecture key results scored honestly, the mandates going into the new cycle confirmed with their receiving teams present as visitors. That session is also the one senior leadership is explicitly invited to observe. Nothing communicates "this function delivers" like scoring your own objectives in public, including the red ones. Especially the red ones.

What the OKR coupling buys is quiet legitimacy. The board stops being the place where architecture asks for things and becomes part of how the organization commits to things - same vocabulary, same cadence, same scoreboard as everyone else.

## Where project management plugs in

The other coupling is the project lifecycle, and here precision matters, because the border between the board and the PMO is where most turf wars start.

The clean division: **the board decides what should be true; the PMO tracks whether it is becoming true.** Concretely, four touchpoints. Board verdicts are **entry criteria for stage gates** - a project does not pass from design into build until its direction check and build check are green, which means the PMO's stage-gate checklist references the board's decision log, and neither body can quietly waive the other's gate. **Repository updates are part of definition of done** - the project that goes live updates its fact sheets and diagrams before hypercare closes, verified by the architecture function, enforced by the PMO's closing checklist; governance you have to remember is governance that decays, so it lives inside the process that already has enforcement. **Escalations run both directions** - a project blocked by a slow verdict escalates through the PMO to the board chair, and chronic blocking is the board's failure to fix; a project ignoring a verdict escalates the other way, and that one is career-relevant. And **project managers get a standard visitor format**: ten minutes, their item only, decision paper pre-read like everyone else. The fastest way to earn PMs as allies is to make the board the most predictable meeting they attend - papers in 48 hours before, verdict in the room, record published the same day.

The PMO lead's standing seat is what keeps all four touchpoints honest. In the composite org I keep describing, the single change that most improved board attendance was not a better agenda - it was the quarter when two stage gates in a row genuinely held because board conditions were unmet. Projects started sending their architects early, with better papers, because the gate was real. Nothing recruits like consequences.

![One project's journey through the system - the design loop, two gates, the board verdicts that arm them, and the repository updates that close the loop at go-live](/images/pub/architecture-board-forum-system/project-journey-v1.png)

## What all this does to the repository - and especially the diagrams

Here is the part that gets left out of every governance charter I have ever been handed: the board and the repository are the same project. Run a board without a live repository and every discussion starts with twenty minutes of establishing what exists - I have sat through that meeting, monthly, in a previous life. Run a repository without a board and there is no event that forces the data to stay true. Each is the other's forcing function.

Three rules wire them together. **"Not in the repository, not on the agenda"**: every decision paper links the affected fact sheets, and if the application under discussion is missing or stale, the item is not ripe - fix the record first. This rule turns every board cycle into a small, self-targeting data-quality campaign, aimed exactly at the corner of the landscape where decisions are happening, which is exactly where staleness is most expensive.

**Decisions land as data, not only as prose.** Approved retirement: the lifecycle field changes and the successor link is set the same week, by name, as a condition on the record. Approved exception: tagged on the fact sheet with its expiry, so the register can be generated instead of maintained. Approved standard: the pattern library updates and the deviating applications get flagged. The decision log tells you what was decided; the repository shows you the landscape as those decisions describe it. When the two disagree, something is being quietly ignored, and a quarterly diff between them is the cheapest audit you will ever run.

And the diagrams - the board is what finally gives diagrams a lifecycle, because diagrams are where repository rot shows first. The discipline that has worked for me: every domain keeps exactly **three diagrams that matter** - as-is, target, and, only while a transformation is running, a dated transition state. The as-is is corrected during review prep, because presenting against a wrong as-is is how boards approve fiction; the correction is the presenting architect's job, and it is checked at the gate. The target diagram is not decoration - it is *attached to the decision record that approved it*, dated and versioned, which makes it a contract: when reality is meant to diverge from it, someone must come back through the board to re-issue it, and that someone gets a visitor slot, not a veto. Everything else - the whiteboard exports, the one-off workshop drawings - is working material and lives outside the repository, clearly marked, where its inevitable staleness cannot masquerade as truth. A repository with forty diagrams per domain has none; three that are argued over beats forty that are ignored.

The compounding effect after a year or two of this is easy to miss because it arrives as silence: the establishing-context portion of meetings shrinks toward zero. People open the same picture before the meeting, and the meeting starts at the disagreement. That is the entire return on investment of the wiring, and it is enormous.

![The decision-to-repository loop - prep corrects the as-is, the verdict attaches the target, conditions update the inventory, and the quarterly diff catches what was ignored](/images/pub/architecture-board-forum-system/decision-loop-v1.png)

## One decision, end to end

Abstractions are easy to nod along to, so let me follow a single decision through the whole machine - a composite, as ever, but every step of it is something I have watched happen.

It starts, as the good ones do, at the bottom. In a domain sync, the commerce architect hears that two markets are about to build point-to-point interfaces to the same logistics provider, each through a different integration tool - the group runs three of them, a legacy broker, a newer platform, and the thing one country bought during an outage in 2019 and never unbought. Three weeks later the weekly design forum has seen a middleware question for the fourth time in a month. That is the pattern-gap signal: the question goes on the board's agenda, not as "what should this project do" but as "how many integration platforms does this group intend to run".

The domain architect writes the decision paper. One page: the three platforms named, interface counts per platform rounded honestly, run costs in ranges, two options - consolidate on the newer platform over four quarters, or declare two strategic and fence the third - each with the trade-offs stated plainly enough to be attacked. Recommendation: consolidate. Linked at the bottom: the fact sheets of all three platforms and the eleven applications with the heaviest interface traffic. Preparing the paper flushes out that four of those eleven fact sheets are stale - two have left owners, one is marked active but was decommissioned in spring. Fixed before the item is ripe, which is the "not in the repository, not on the agenda" rule doing its quiet work: the board has not met yet, and the landscape is already more true than it was.

The session itself takes twenty-five minutes on this item. Visitors: the platform owner of the legacy broker and a business process owner whose order flows ride on it. The business voice at the table asks the only question that matters - "what breaks for my markets during migration, and who pays for the standstill" - and the answer goes into the record as a condition. Verdict: approved with conditions. Migration over four quarters, sequenced by interface criticality; two mainframe-era interfaces get a documented exception with an eighteen-month expiry because their rewrite belongs to a larger program; the legacy broker's lifecycle flips to phase-out with the successor link set; the target integration diagram - one page, dated - is attached to the record. The secretary reads the decision aloud, the room hears it, and the record is published before end of day with a number people can cite in an email.

Then the part that makes it real: the mandates land in the quarterly cycle. The receiving team - not the architecture function - carries "first thirty interfaces migrated" as a key result they sized themselves. The PMO adds the verdict to its gate checklist, which matters three months later when a project mid-flight tries to procure a fourth integration tool because a vendor demo went well; the stage gate catches it, the project gets a visitor slot, the board says no in eleven minutes, and the organization learns - faster than any communication campaign could teach it - that the decision meant something.

Eighteen months on, the exception register does its job: one of the two exempted interfaces made it into the rewrite program and the exception closes; the other has not, and its owner comes back through the board for an extension - new expiry, new reason, on the record. The target diagram is re-issued once, when a carve-out for one market's regulatory constraint proves genuinely necessary. Total board time across the whole affair: under two hours. What the organization got for those two hours: one platform strategy, eleven honest fact sheets, a held gate, and a precedent.

## Questions I always get

**"We cannot get a senior business person to commit to a board seat."** Then do not start with the board - start with the domain syncs. Business people do not join committees out of goodwill; they join rooms that have already been useful to them. Two quarters of a domain sync that catches problems before they become escalations, and the seat conversation has a track record behind it instead of a org-chart argument.

**"We are agile - gates and boards feel like waterfall."** The gates decide direction and conformance, not sprint content, and the weekly design forum *is* the agile-native part of the system - lightweight, conversational, close to the work. What sprint teams actually resent is not governance; it is unpredictable governance. A board with a 48-hour agenda rule, ten-minute slots, and same-day decisions is more compatible with two-week sprints than the alternative, which is architecture opinions arriving as surprise vetoes in week eleven.

**"Which tool do we need for the decision log?"** None, in year one. A numbered page per decision in the same wiki as everything else, linked to the repository fact sheets, beats a workflow tool while the process is still finding its shape. Tooling ossifies whatever it touches - let the format prove itself on twenty real decisions first, then automate the parts that hurt.

**"How big do we need to be for all this?"** My rough line: two or more business domains and something like fifty-plus applications. Below that, run the weekly design forum only, and replace the board with a monthly written decision digest that leadership reads and can object to - the deciding-in-writing discipline matters at every size; the ceremony does not.

**"We do not have any of this yet - where does the board sit in the bigger build?"** Around quarter six, in my experience. The sequence that works, and what to ship in each quarter of the first three years, is laid out in [the twelve-quarter build](/publications/first-twelve-quarters) - the board opens only once a design forum and a handful of federated architects have produced enough material to give it a queue.

## The first ninety days

How I would stand this up from a cold start, roughly in order. Weeks one and two: write the one-page charter, recruit the seven seats - and recruit the business seat *first*, because it is the hardest conversation and everything else is easier once you can say a process owner is in. Weeks three and four: run the first session on two real decisions that are already burning - never launch a board on policy discussions; policy attracts opinions, decisions attract stakeholders. Month two: start the weekly design forum underneath and publish the decision-paper template; expect and forgive terrible first papers, and rewrite two of them yourself as worked examples, because the template teaches less than the example. Also month two: the "not in the repository, not on the agenda" rule goes live - early, while agendas are still small enough to fix records item by item. Month three: wire the first stage gate with the PMO, negotiate the first mandates into the next quarter's team OKRs, and hold the first quarterly session with leadership observing. Then stop adding machinery for a while. The system as described is close to the minimum that works, and every addition after it should have to argue its way in - the same consent rule the board applies to everyone else.

Ninety days does not make the board respected. It makes it *predictable*, and predictable is the foundation respect gets built on over the following year, one held gate and one honest red key result at a time.

## The field kit

Everything described above now exists as working files in the [library](/library), so you can start from artifacts instead of a blank page. Three files, and a clear owner for each piece:

The **field kit deck** (PPTX) is the worked-examples set - one slide per artifact, filled in with a realistic composite case: the charter as it reads when done, an agenda that respects the clock, a complete decision paper next to the tells that get papers rejected, the decision record with its conditions table, the exception with its register, the mandate-to-OKR handoff in both its failing and working form, the ten-minute visitor slot minute by minute, and the moderator's sentences verbatim. Use it to show, not explain - it is the thing to walk your future chair and secretary through before the first session.

The **charter and templates document** (DOCX) is the same set as fill-in forms: charter, decision paper, decision record, exception request, and the half-page visitor briefing. Each template names its single owner - chair, presenting architect, secretary, requesting team - because an artifact with two owners has none.

The **registers workbook** (XLSX) is the secretary's pair of working sheets: the numbered decision log and the exception register with an expiry countdown that goes negative when a review was missed - which is exactly the number to put on the next agenda.

Who uses what, in one breath: the chair owns the charter and the decisions; the secretary owns the agenda, the record, and both registers; the presenting architect owns the paper and the repository corrections that come with it; the requesting team owns its exception and its exit plan; the receiving team owns the mandate once it becomes their key result; and the moderator owns the clock and the script. Six roles, no shared custody.

The lighthouse metaphor from the opening has a second half, by the way. Lighthouses did not survive because ships loved them. They survived because the rocks were real. Your job in the first year is mostly to make sure the organization can see the rocks - the duplicated platforms, the expired exceptions, the diagram that turned out to be fiction - and that the light is on when they look. The routing-around stops on its own after that.
