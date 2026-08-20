---
title: Clean core is an integration discipline, not a coding ban
summary: What clean core actually means once you stop reading it as "no customization" - the four places work can go, the integration rules that keep an upgrade to a weekend, how to triage what local markets genuinely need against what they merely prefer, how to hold edge cases in a register with expiry dates instead of in the core, and the scorecard that tells you whether the target is still reachable. With an extension register and an integration standard to download.
date: 2026-02-02
time: 10:40
updated: 2026-06-23
cover: /images/pub/clean-core-integration/cover-v1.png
status: published
---

The programme had been running for a year when someone finally counted. Nine hundred and some modifications to the core system, accumulated over a decade and a half, each one entirely reasonable on the day it was written. The upgrade that should have taken a weekend took eleven months and a regression team. Nobody had decided to end up there. Every step had been a small, sensible yes.

Then the replacement programme started, and within four months the same pattern was visible in the new system: not modifications yet, but requests, each one entirely reasonable, each one from a market with a real problem and no other route.

*A clean core is not the absence of custom work. It is the discipline of putting custom work somewhere it does not cost you the upgrade.*

The vendors have a name for this now, and like all vendor vocabulary it arrives half-explained and gets read as a prohibition. In most rooms I have been in, "clean core" is heard as "no customization", which is both false and unhelpful - false because every organization needs things the standard does not do, unhelpful because a rule that cannot accommodate reality is a rule people route around quietly.

What follows is how I have seen it work: composited from my own missions on multi-market ERP landscapes, vendor-neutral on purpose, figures rounded and details blurred. The mechanics are the point.

## What clean core actually means

Strip the marketing and there are four propositions, and only the fourth is about code.

**The upgrade stays cheap.** This is the actual objective. Every other rule is instrumental to it. If you can take a vendor release without a regression army, you have a clean core, whatever your architecture diagram looks like.

**The data model stays standard.** Fields added the supported way, not by altering vendor tables. This is the one that quietly decides whether analytics, upgrades, and future integrations are easy or awful.

**Integration goes through released contracts.** Published APIs and events, versioned by the vendor, with compatibility promises. Not direct database reads. Not internal function calls that were never meant for you.

**Extensions live outside the upgrade path.** Where an extension runs matters more than whether it exists.

That last point is the one worth expanding, because it converts "no customization" into an actual design decision with four available answers.

![The four places work can go - configuration, in-app extension, side-by-side extension, and core modification - with upgrade safety, who can build it, and the governance each one needs](/images/pub/clean-core-integration/four-places-v1.png)

**Configuration** is free and reversible: the standard behaves differently because you set it differently. Always try this first, and try it seriously - a striking share of "we need a modification" requests are answered by configuration nobody had explored, usually because the person who knew the module left.

**In-app extension** is the vendor's supported extensibility: added fields, added logic at defined extension points, all using released interfaces and all surviving upgrades. Cheap, close to the data, and limited to what the vendor anticipated.

**Side-by-side extension** is your own service, running in its own runtime, talking to the core through released APIs. This is where anything substantial belongs: complex logic, a differentiating capability, anything with its own lifecycle. It costs more up front and it is the reason your upgrade stays a weekend.

**Core modification** is changing vendor objects. It is not forbidden - saying so just drives it underground - but it is the only one of the four that requires a named approval, an expiry date, and a line in a register that gets read out loud once a quarter.

The single most useful sentence I have found for a room full of market teams: *we are not saying no to what you need; we are saying it goes over there.*

## The integration rules that do the real work

Clean core lives or dies at the integration layer, because that is where the pressure to shortcut is highest and the damage is most durable. Six rules, and I would defend each one after having broken most of them at least once.

![The integration rules - released contracts only, one owner per data object, the canonical layer, thin middleware, and the four forbidden patterns with what to do instead](/images/pub/clean-core-integration/integration-rules-v1.png)

**Released contracts only.** Inbound and outbound both. If the interface you need does not exist, the answer is a request to the vendor and a temporary bridge with an expiry - not a direct table read that will still be there in nine years, invisible to everyone until it breaks during an upgrade.

**One owner per data object.** For every significant object - customer, supplier, article, cost centre, employee - exactly one system creates and changes it, and everyone else consumes. Write down the list, and write it down [as a proper object model](/publications/data-strategy-object-model) rather than as a paragraph in an integration standard, because the same list is about to be needed by the localization triage, the extension register and every residency question the programme receives. Half of all integration pain in multi-market landscapes is two systems both believing they master the same object, and no amount of middleware sophistication fixes an ownership question.

**Canonical in the middle, dialects at the edges.** Publish and consume one shared shape per object, and translate at the boundary. Twelve markets each with their own file format is fine at the edge; twelve dialects flowing into the core is how you get an integration layer nobody can change.

**Thin middleware.** Routing, transformation, protocol, retry, monitoring. Not business rules. The moment pricing logic lives in the integration layer, you have created a third system that nobody owns, nobody tests, and everybody depends on. The honest exception: temporary bridging during a migration, with a written end date.

**Asynchronous by default, synchronous by exception.** Events and queues absorb the difference between a core that is upgrading and a market that is trading. Synchronous calls are for when the user is waiting and the answer must be now, and each one is a coupling you will feel during every maintenance window.

**Idempotency and replay, always.** Every message carries a key that lets it arrive twice safely, and every interface can be replayed from a point in time. This is unglamorous and it is what turns a bad night into a boring morning.

Four patterns are simply out, and it helps to say so in writing, with the alternative attached: direct database access to the core (use the released API or ask for one); business logic in the middleware (put it side-by-side); point-to-point interfaces between market systems and the core with no contract (register it and give it a canonical shape); and file drops with no schema, no monitoring, and no owner - the most common of the four and the one that survives longest, because nothing ever obviously breaks until it silently does.

> Every interface you build without a contract is a decision to spend a weekend of somebody's future on discovery.

## The local market problem, honestly

This is where clean core programmes actually fail, and they fail politically rather than technically.

A market team is not being difficult when they say the standard process does not work for them. They are usually right about the symptom and only sometimes right about the cause. The job is triage, and the triage has to be done *with* them, in their language, with the [visit discipline](/publications/governing-without-a-mandate) that makes the conversation possible in the first place. Three buckets, and the response is completely different in each.

![Localization triage - statutory, differentiating, and historic preference - what belongs in the core, what goes side-by-side, and what dissolves once you look at it](/images/pub/clean-core-integration/localization-v1.png)

**Statutory and regulatory.** Invoice formats, tax handling, reporting, employment rules, e-invoicing regimes. Non-negotiable, and the good news is that most of it is already in the vendor's country versions - a surprising amount of what markets ask for as custom work is standard functionality nobody activated. Where it genuinely is not covered, it belongs in a localization layer, built once per requirement rather than once per market, and maintained centrally because the law changes and you do not want that discovery happening in twelve places.

**Genuinely differentiating.** The thing this market does that wins them business, or the thing the group does that nobody else does. This deserves investment - side-by-side, well built, owned. The test I use is uncomfortable and effective: *would we put this on a slide to explain why customers choose us?* If the answer takes more than a sentence, it is probably not differentiating, it is just familiar.

**Historic preference.** The process is this way because it has been this way, often because a system in 2011 could not do it the other way. This is the largest bucket, and it does not dissolve by being argued with. It dissolves by being seen: show the market team the standard process running with their own data, and let them tell you what actually breaks. Half of it evaporates in the room. The other half turns out to belong in one of the first two buckets, and now you know which.

Two rules make the triage survivable. **Never call something a preference to the person defending it** - record it, show the standard, and let the demonstration do the work. And **give every bucket a route**: statutory goes to localization, differentiating goes side-by-side with funding, preference goes to a fit-gap list with a review date. A bucket with no route becomes an escalation.

There is one more move that changes the temperature of the whole programme: **let markets keep their local satellites** where those satellites are genuinely local. A store rota tool, a local partner portal, a market-specific planning spreadsheet with a decade of tuning - these do not need to be absorbed. They need a contract to the core and a place in the inventory. Insisting that everything become one system is how a clean core programme becomes a consolidation programme, which is a much harder sell and usually a worse design.

## Handling edge cases without polluting the core

Even after honest triage, there will be things that genuinely require an exception. The mistake is treating each one as a special case decided in isolation. The alternative is a register - the same instrument that works for [governance exceptions](/publications/architecture-board-forum-system), applied to the core.

![The extension lifecycle - request, classify, time-box, review, and the three exits including the buy-out that turns a local extension into standard capability](/images/pub/clean-core-integration/extension-lifecycle-v1.png)

Every request follows the same path. **A one-page request**: what the business needs, what the standard does today, what breaks, which of the four places it should live in, who pays, and what would have to be true for it to go away. **A classification** by the architect, against the decision tree, in public. **A time-box** for anything in the top two categories - modifications and heavy side-by-side extensions get an expiry date, not a permanent home. **A quarterly review** of the whole register, where each expiring item is closed, extended with a new reason, or promoted.

That promotion is the piece most programmes miss, and it is the one that keeps the register from becoming a graveyard. When the same extension appears in three or more markets, it stops being an exception and becomes a candidate for **buy-out**: central takes it over, builds it once properly side-by-side, funds it, and retires the local copies. This is the [second-occurrence rule for patterns](/publications/architecture-patterns) applied to functionality, and it converts the register from a list of debts into a pipeline of shared capability. Markets stop hiding their extensions when they learn that a well-argued one might get adopted and funded rather than confiscated.

Three practical rules for the register. **The cost sits where the exception sits**: a market that wants a local extension carries its build and run cost, which is not a punishment but an honesty mechanism - it makes the trade-off visible at the point of decision. **No exception without a named owner and a review date**, both of which age visibly. And **modifications get counted publicly**, because the number is the programme's temperature and hiding it is how the last landscape got to nine hundred.

## Making the target actually reachable

A target architecture nobody can get to is a wish. Three things make the difference between a clean core that stays clean and one that erodes in year two.

**Convert what exists before you extend what is new.** Every legacy modification and interface gets classified once: retire (nobody uses it - test this by turning it off in a low-risk environment and waiting), replace with standard (the new release covers it), re-platform (it belongs side-by-side), or keep with expiry (rare, and named). Doing this inventory work with the [existing landscape data](/publications/application-portfolio-data-quality) rather than from scratch saves months.

**Test the upgrade early and repeatedly.** The only honest measure of a clean core is a rehearsed upgrade. Do one before go-live, and one every cycle after, and publish how long it took. A programme that has never rehearsed an upgrade does not know whether its core is clean; it knows whether its rules were followed, which is not the same thing.

**Watch four numbers, and only four.**

![The clean core scorecard - four numbers, what each one tells you, the target direction, and the failure it catches early](/images/pub/clean-core-integration/scorecard-v1.png)

Core modifications, counted, with the trend. Share of interfaces running on released contracts. Upgrade lead time, from vendor release to production, rehearsed if not yet real. And the open extension register with ages - the number that predicts the other three, because a register that only grows is a triage that stopped working.

Report those four the same way you would report [portfolio quality](/publications/portfolio-quality-report): monthly, to named people, with the specific items rather than only the totals.

## Where this goes wrong

**Clean core as a slogan.** Announced as a principle, never converted into a decision tree, so every request becomes a negotiation about what the principle means. Publish the four places and the classification rules in month one, or the phrase will be used against you by the second quarter.

**The absolutist phase.** Six months of refusing everything, followed by a collapse when a market with real regulatory pressure forces a modification through at executive level - after which the rule is visibly breakable and everyone knows it. Better to have an explicit, governed route for the hard cases from the start, with expiry dates, than a prohibition that fails publicly once.

**Middleware as the escape valve.** The rules hold at the core and everything unmanageable migrates into the integration layer instead. Two years later the middleware is the least understood system in the landscape. Watch for business rules arriving in transformation logic; that is the tell.

**Localization treated as customization.** Statutory requirements handled as one-off extensions per market, each maintained separately, each needing attention when the law changes. Build the localization layer once and centrally, even when the first market is impatient.

**Nobody rehearsing the upgrade.** Everything looks clean until the first real release, which is exactly the wrong moment to find out. Rehearse it while the programme still has budget and attention.

**The register nobody reads.** Extensions recorded and never reviewed, so the expiry dates pass unnoticed and the register becomes an archive. The quarterly review is the whole mechanism; without it the discipline is just paperwork.

## The kit

Two files in the [library](/library), free to use and adapt.

The **extension and integration register** (spreadsheet) holds the request log with classification and expiry, the interface inventory with contract type and owner, the buy-out candidates view that surfaces anything appearing in three or more markets, and a scorecard computing the four numbers with a trend sheet.

The **integration standard and templates** (document) holds the four-places decision tree with worked examples, the six integration rules and the four forbidden patterns with their alternatives, the localization triage guide, the one-page extension request template, and the quarterly review agenda.

Start with the decision tree and the ownership list. If you do nothing else in the first month, publish which system owns each significant object and where an extension is allowed to live - those two pages prevent more damage than any amount of later governance.

The nine hundred modifications were not a failure of discipline by the people who wrote them. They were the predictable result of an organization that never gave its markets a legitimate place to put what they needed. Build that place first, then the discipline is easy to keep.
