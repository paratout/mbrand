---
title: A pattern is a decision you only make once
summary: Where patterns come from, what belongs inside one, and how they earn their keep - the rule of the second occurrence, a worked pattern written out in full, the six-pattern starter set for a greenfield, the fast lane that makes conformance rewarding, and the lifecycle that lets a pattern be revised or retired without breaking what already runs.
date: 2025-09-01
time: 08:20
updated: 2026-04-28
cover: /images/pub/architecture-patterns/cover-v1.png
status: published
---

The fourth time I watched a team build the same [integration](/publications/clean-core-integration) in a different way, I stopped blaming the teams. Nobody had been careless. Each had solved a genuine problem with a reasonable design, in isolation, at a moment when the alternative would have meant a meeting with someone who did not yet exist. The organization had not made one bad decision - it had made the same decision four times, badly distributed.

That is what a pattern prevents. Not creativity, not judgment, and certainly not thinking. Just the fourth repetition of a decision that was already correctly made once.

*A pattern earns its place by removing a conversation, not by adding a rule.*

This one is drawn from my own missions, blurred where it matters, and written mostly for the architect who is alone or nearly alone - because patterns are the only mechanism I know that scales a single person's judgment across teams that do not report to them.

## What a pattern is, and what it is not

Four things get confused constantly, and the confusion is expensive. A [principle](/publications/architecture-principles) is a trade-off with consequences ("configuration over build, even where building would fit better"). A standard is a binary constraint ("all inbound traffic terminates at the gateway"). A reference architecture is a picture of a whole domain in its target state. A pattern sits between them: it is a **reusable design decision for a recurring problem, with its context, its costs, and its limits stated**.

![Principle, standard, pattern, reference architecture - what each one is, who writes it, how it is enforced, and what it looks like when misused](/images/pub/architecture-patterns/taxonomy-v1.png)

The test I apply: if it cannot be wrong in some context, it is a principle. If compliance is a yes or no with no design left to do, it is a standard. If it draws a whole domain, it is a reference architecture. A pattern is the thing an engineer can pick up on a Tuesday and be finished with by Thursday.

Two consequences follow. A pattern without a stated *when not to use this* is a standard wearing a costume, and it will be resented accordingly. And a pattern that does not shorten someone's week is decoration, however elegant.

## Where patterns come from: the rule of the second occurrence

Patterns are harvested, not invented. The temptation in a new architecture function is to open a pattern library on day one, populated from what you know from previous jobs. I have done exactly this, and the library sat unread, because it answered questions this organization had not yet asked.

The rule I use now: **write the pattern the second time the problem appears, not the first**. The first occurrence is a solution. The second is evidence of a class. The third is the cost of not having written it down.

Waiting for the second occurrence buys three things. You get a real context section, because you have seen two variants and know which forces actually differ. You get an author who has built it, which is the only kind anyone trusts. And you get a first adopter for free - the second team, who needed it anyway.

Where the occurrences surface, in order of usefulness: the weekly design forum, where the same question arriving three weeks running is the clearest signal you will ever get; the [two gates](/publications/two-gate-architecture-review), where a direction check keeps proposing the same shape; incident reviews, where the same failure mode appears in two systems; and the [landscape walk](/publications/landscape-due-diligence), where duplicate solutions to one problem are the whole point of the exercise.

> The best pattern author is the person who just finished building it for the second time, caught before they forget what hurt.

## The anatomy of a pattern

A pattern is a page, sometimes two, and it has parts that each do a job. Skip a part and you can predict the failure: skip the costs and it gets adopted where it does not belong; skip the anti-context and you will be arguing about exceptions for a year.

![The anatomy of a pattern - the ten parts, what each is for, and the failure mode you get when it is missing](/images/pub/architecture-patterns/anatomy-v1.png)

Here is a full one, written the way I would put it on a wiki page. It is a composite, deliberately vendor-free.

**PAT-003 - Canonical inbound interface**
*Status: Active since Q3. Owner: integration domain architect. Version 2.*

**Problem.** Several external senders - partners, markets, acquired units - deliver the same business concept in different formats and cadences. Every consuming system ends up parsing every sender's dialect, so onboarding a new sender means changing systems that have nothing to do with that sender.

**Context.** Applies when two or more external senders feed the same domain concept, and at least one internal consumer needs it. Volume is moderate: thousands to low millions of messages a day.

**Forces.** Senders will not change their formats for you. Consumers need stability. Onboarding speed is a commercial promise. Errors must be attributable to a sender, not to the consumer that happened to choke.

**Decision.** One adapter per sender, translating into a single canonical payload published once. Consumers subscribe only to the canonical form and never see a sender-specific format. Validation, enrichment, and rejection live in the adapter; the canonical stream carries only messages that already passed.

**The shape.** Sender to adapter to canonical stream to consumers, with rejected messages going to a per-sender dead-letter store that the sender's account owner can actually read.

**How to implement it.** Name adapters `<domain>-<sender>-adapter`. The canonical schema lives in one repository with the domain architect as reviewer; schema changes are additive-only within a major version. Every message carries a sender ID, a source message ID, and an idempotency key. Retries are bounded and then dead-lettered - never infinite. Monitoring is per sender, because "the interface is slow" is never true of all senders at once.

**What it costs.** One extra hop and its latency. A schema that now needs governance. Adapter proliferation if senders multiply - budget one adapter per sender per year in a growing partner network.

**When not to use it.** A single sender with a stable format and no roadmap for more - build the direct path and revisit at the second sender, which is exactly the rule this whole practice runs on. Sub-100-millisecond paths where the extra hop is the budget. One-off migration loads, which are a script, not an interface.

**Conformance check** (what a reviewer looks for in five minutes): consumers subscribe to canonical only; no sender-specific fields leaked into the canonical schema; dead-letter destination named and owned; idempotency key present.

**Related.** PAT-004 batch-to-event bridge for senders who cannot do anything but files. AB-041 for the platform decision underneath. Supersedes the informal "adapter approach" note from the design forum.

That is roughly a page, and it is boring on purpose. Notice how much of it is not the design: the costs, the anti-context, the conformance check, and the name of a person. That is the part that makes it usable by someone who was not in the room.

## Operationalising them in a greenfield

A greenfield is the best and the most dangerous place for patterns. Best, because there is no legacy to argue with and the first implementations will genuinely be the reference. Most dangerous, because the temptation is to write forty of them before anyone has built anything, and a library nobody has used yet is indistinguishable from a library nobody wants.

**Start with six.** In a landscape being built from scratch, the recurring decisions are predictable and few:

1. Canonical inbound interface - the one above.
2. Batch-to-event bridge, because something upstream will always be files.
3. System of record and read replicas - who owns each data concept and how everyone else reads it.
4. Channel front door - one façade per channel, so channel-specific logic stops leaking into domain services.
5. Identity and access through the central provider - the pattern that stops six bespoke user stores.
6. Environment and release promotion - the path from a developer's branch to production, drawn once.

Six covers most of what a young landscape argues about. The seventh should have to justify itself the way any other addition to your practice does.

![Harvesting to fast lane - how a pattern moves from a second occurrence to an active pattern with a reference implementation, and how it is used in the two gates](/images/pub/architecture-patterns/lifecycle-v1.png)

**Give every pattern a reference implementation.** This is the single highest-leverage thing on this page. A pattern with a working starter - a repository, a pipeline definition, a schema, a configured example - gets adopted by teams who never read the page. A pattern that exists only as prose competes with the engineer's own instinct, and the instinct is faster. In a greenfield, the first team to implement a pattern *is* the reference implementation; name that explicitly and make it their deliverable, with a little of their time protected for it.

**Co-write with the first user.** Never publish a pattern that has not survived contact with the first team that will implement it. Write the draft, sit with the team as they build, and publish the version that reflects what they actually did. The team becomes the pattern's advocate, and advocacy from a delivery team is worth more than any charter.

**Make conformance the fast path.** This is where patterns meet governance. Conforming work should skip the queue - direction check waived or compressed, a shorter review, a smaller pre-read. Deviating work gets the full treatment and an [exception with an expiry date](/publications/architecture-board-forum-system). The reward has to be real and visible, because the whole system runs on it: teams adopt patterns to go faster, not to be compliant, and any architect who forgets that ends up policing.

**Keep them where the work is.** Patterns live next to the code or next to the wiki the engineers already use, never in a separate portal that requires a login and a reason. In a year-one setup [without any tooling](/publications/architecture-without-a-tool), that means a wiki space with one page per pattern, a stable ID, and the reference implementation linked at the top - not in an appendix.

**Ten minutes in the design forum, once a fortnight.** One pattern per session, presented by whoever last used it, answering one question: did it help. That is the entire adoption programme. No roadshow, no launch, no training day.

## What to measure

Three numbers tell you whether the practice is alive, and none of them is the count of patterns.

**Adoption**: what share of relevant new designs used the pattern rather than something bespoke. Sampled, not audited - ten designs a quarter is enough to know.

**Exception rate per pattern**: a pattern that is deviated from repeatedly is not a discipline problem, it is a pattern problem. Two or three exceptions on the same pattern is your revision trigger.

**Time to first use**: how long a new pattern takes to be picked up by someone who did not co-write it. If nothing uses it within a quarter, you harvested too early or you wrote it for a problem the organization does not have.

And one anti-metric to resist: the size of the library. I have seen a forty-pattern library with four patterns in real use and thirty-six in the way. Every unused pattern raises the search cost of the useful ones.

## Revising without breaking what runs

Patterns rot in a way principles do not, because they encode specifics: a platform choice, a protocol, a shape that fit last year's constraints. A pattern practice that cannot revise itself becomes a set of superstitions in about eighteen months.

![Pattern lifecycle states, the four revision triggers, and the rule for what happens to systems already built on the old version](/images/pub/architecture-patterns/revision-v1.png)

**Four triggers, and only four.** A recurring exception, meaning two or three deviations with similar reasoning - the pattern is describing a world that has moved. A platform or capability change that invalidates an assumption. A failure, where something built to the pattern broke in a way the pattern should have prevented - the most valuable trigger and the one most often wasted on blame. And scale, when volumes or team counts leave the stated context.

Notice what is not a trigger: a new fashion, a vendor's release notes, or an architect's discomfort with a decision they inherited.

**Version, never rewrite in place.** A pattern gets a version number and a changelog on the same page. Anyone who implemented v1 needs to know what changed and whether it matters to them - and they cannot know that if the page silently became something else. I keep the diff human: what changed, why, and who must act.

**Five lifecycle states** are enough: Draft (written, not yet used), Active (in use, current), Superseded (a newer pattern replaces it, with the link), Discouraged (still works, do not use for new builds, no forced migration), Retired (do not use, and the last implementations are gone or documented as exceptions).

**Discouraged is the state that saves you.** The instinct when revising is to demand migration of everything built on the old version, which is expensive, unpopular, and usually unnecessary. Existing implementations conforming to a superseded pattern are *not* violations - they were right when they were built. The rule I write into every revision: new builds use the current version; existing implementations migrate only when they are being touched anyway, or when the old version carries a named risk. That rule is the difference between a practice teams welcome and one they route around.

**Retirement is a decision, not decay.** When a pattern goes, say so on the page, name the successor, and check whether anything still runs on it - the [inventory](/publications/application-portfolio-data-quality) is what makes that a query rather than an archaeology project. A pattern quietly abandoned but still on the wiki will be found and followed by a new joiner within a year, and they will be right to be annoyed.

**Who decides.** Draft and Active are the domain architect's call, in the design forum, in public. Superseded, Discouraged, and Retired go to the [architecture board](/publications/architecture-board-forum-system), because those change what other people must do. Same paper format, same three outcomes.

## The failure modes worth naming

**The library nobody reads.** Symptom: patterns are complete, well formatted, and never cited in a design review. Cause: written ahead of demand, usually by someone who has not built in this landscape. Cure: delete two-thirds and harvest the rest again from real occurrences.

**Patterns as mandates.** Symptom: teams describing patterns as "the architecture police". Cause: no anti-context, no exception path, no fast lane. Cure: publish the costs and the *when not to use*, and make the exception route genuinely open.

**The pattern that is really a product decision.** Symptom: a pattern that names one vendor's feature as the mechanism. Cure: split it - the pattern describes the shape, a separate standard names the approved implementation, and the two get revised on different clocks.

**Gold-plating.** Symptom: patterns growing sections over time until they read like specifications. Cure: a page limit, honestly enforced. Detail that only one team needs belongs in that team's repository, not in the pattern.

**Orphaned patterns.** Symptom: no named owner, so nobody revises them. Cure: an owner per pattern in the same table as the status, and a five-minute yearly check that every Active pattern still has a living owner.

## The shortest version

Harvest at the second occurrence, never the first. Write one page: problem, context, forces, decision, shape, implementation, costs, anti-context, conformance check, owner. Ship a reference implementation with it or expect it to be ignored. Co-write with the first team that needs it. Reward conformance with speed, not praise. Start with six in a greenfield and make the seventh argue. Measure adoption, exceptions, and time to first use - never the count. Version rather than rewrite, use Discouraged rather than forced migration, and retire on purpose.

A good pattern library is small, boring, heavily used, and slightly out of date in a way that everyone can see and nobody is anxious about. It is also, quietly, the mechanism by which one architect's judgment ends up in code they never touched - which is the closest thing to leverage this job offers.
