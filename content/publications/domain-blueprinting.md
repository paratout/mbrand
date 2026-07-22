---
title: Domain Blueprinting: redesigning a company one process at a time
summary: A practical method for harmonizing how a multi-country organization works: cut the company into end-to-end process domains, then run each one through the same pipeline - scoping, process design, IT architecture mapping, change assessment, and roadmapping. Theory first, then a worked example on the HR domain, down to the meeting formats.
date: 2026-06-01
time: 17:25
cover: /images/pub/domain-blueprinting/cover-v3.png
status: published
---

Sooner or later, every organization that grew by acquisition or by country-level autonomy hits the same wall: the brand is one, but the company operates as many. Each market has its own way of hiring, buying, pricing, and paying - and its own systems to match. Harmonizing that is one of the hardest kinds of transformation there is, and most attempts fail in one of two ways: they boil the ocean with a single monster program, or they let each function redesign its own silo and end up with beautifully optimized fragments that still don't connect.

Over previous missions I have worked with an approach that avoids both traps. Every organization brands it differently; I'll call it **Domain Blueprinting**, because that is what it does: it cuts the company into end-to-end process domains and produces, for each one, a complete blueprint - from process design to target IT architecture to an executable roadmap.

## The theory: one pipeline, many domains

Start by slicing the whole company into **end-to-end process domains** - typically fifteen to twenty, from "plan the business" to "hire to retire". The slicing follows three rules that carry most of the method's value:

1. **End to end, from the perspective of the person served.** Not "the recruiting department's process", but the journey from an open position to a productive employee. Cutting along the org chart is how the fragments happened in the first place.
2. **Mutually exclusive, collectively exhaustive.** Every activity in the company lives in exactly one domain. Overlaps become turf wars later; gaps become orphaned work.
3. **One named owner per domain.** A single senior business owner, with expert contributors from each market or unit. If nobody owns the domain, nobody owns the outcome.

Each domain then goes through the same five-stage pipeline, with a sixth, permanent stage waiting at the end:

![The Domain Blueprinting pipeline: scope, design, map to IT, assess change, roadmap, then govern and execute](/images/pub/domain-blueprinting/pipeline.png)

**Stage 1 - Scope.** Fix the domain's boundaries before anyone designs anything: which activities are in, which belong to neighboring domains, which markets participate. Output: a one-page scope note and the named team. Format: a 90-minute framing session with the domain owner, the architect, and function leads - then stop. Scoping expands to fill whatever time you give it.

**Stage 2 - Design the to-be process.** The heart of the method is a **three-day off-site workshop**: the domain owner, process experts from every market, and a facilitator. Off-site is not a perk - it removes the gravity of the day job, and physical distance from current systems makes it easier to design without them. Three behavioral rules do real work here: think beyond today's practices and tools; no hierarchy in the room - every voice equal; participants provide the content, the facilitator provides the method. The process is designed on three levels: the domain (L1), its major subprocesses (L2), and the concrete activity steps (L3). Deeper than L3 is deliberately out of scope - detail below that belongs to implementation, and chasing it in a workshop kills momentum. The design also fixes a handful of **golden rules** per domain: non-negotiable principles that survive every local exception. Output: the full L1-L3 to-be design. Loose ends go to focused 2-hour follow-up sessions, not a second summit.

**Stage 3 - Map to IT architecture.** Now, and only now, systems enter the picture. The architecture team - not the vendor, not the loudest system owner - maps **every L3 step to exactly one target system**. That "exactly one" rule is the whole discipline: when two systems claim a step, either the step must be split or somebody's platform ambitions are showing. Alongside the mapping, the architect draws a simplified target architecture for the domain and flags transition states where the target system isn't live yet. Format: two or three 2-hour sessions - architects, the domain owner, the affected system owners. Output: the process-to-system matrix and the target architecture sketch.

**Stage 4 - Assess change impact.** Take the blueprint to each market and compare it against the current way of working - with the local team, never to them. The sequence per market: align on the design (and refine it if the local team finds a genuine flaw), identify gaps against current practice, then translate every gap into a named change topic. Each topic is classified: **quick win** (can start now, no dependency) or **roadmap item** (needs a system rollout or structural change first). Format: a pre-read a week ahead, a half-day workshop per market, follow-ups only where gaps are contested. Output: one change-topic list per market.

**Stage 5 - Roadmap.** Aggregate the change topics of all markets and sequence them into one transformation roadmap with the domain owners and leadership. Quick wins start immediately - they build the credibility the roadmap items will need. Every roadmap item carries an owner, a dependency, and a value statement, or it does not get on the page. Format: a half-day alignment with domain owners and the executive sponsor.

**Stage 6 - Execute and govern.** The blueprint hands over to implementation, but the domain owner stays accountable, and the process governance - a standing review cadence - keeps design and reality from drifting apart again. This stage never ends; that is the point.

Because each domain runs the same pipeline, the domains move in **waves**: while one is being designed, another is in IT mapping and a third in change assessment. A domain takes months; the portfolio takes years; the method makes both survivable.

## The practice: blueprinting the HR domain

Theory is cheap, so here is the pipeline applied to a concrete domain: the **employee journey** - everything from attracting a candidate to the day the employee leaves.

**Scope.** The framing session decides: the domain covers entry (attract, recruit, onboard), the employee life cycle (administer, pay, develop, engage), and exit (offboard). Two boundary calls make the session earn its 90 minutes: business travel booking is *in* - it is part of the employee's experience even though finance pays for it; workforce *planning* is *out* - it lives in the planning domain, and the employee journey consumes its output. The team: the group HR owner, HR leads from each market, one enterprise architect.

**Process design.** Three days off-site, a dozen people. The L2 cut of the entry stage: attract, recruit-to-contract, onboard. Zooming into recruit-to-contract, the L3 steps read: approve the position, publish the posting, screen candidates, interview and decide, offer and contract, trigger onboarding. A golden rule emerges on day two: **one position record drives everything** - the posting, the contract, and the onboarding checklist are all generated from a single approved position, created once and reused everywhere. Every market currently violates this rule differently, which is exactly why it is golden.

**IT architecture mapping.** The architecture team maps the L3 steps to target systems - one core system per step:

![Process-to-system mapping for the recruit-to-contract subprocess: each activity step mapped to exactly one target system, with transition states flagged](/images/pub/domain-blueprinting/hr-mapping.png)

Position approval and the position record live in the HR core platform. Posting and screening belong to the recruiting suite, which hands the winning candidate back to the core. Contract generation goes to the document service with e-signature, fed by the position record. Day-one access is provisioned by identity management, triggered automatically by the core the moment the contract is signed. Payroll stays with the per-country engines - flagged as a transition state, with consolidation parked on the roadmap where it belongs.

**Change assessment.** In one market, the workshop surfaces three gaps in twenty minutes: contracts are still printed and signed on paper; onboarding runs on a spreadsheet checklist owned by one experienced assistant; the position approval happens by email, invisible to any system. Translated into change topics: e-signature adoption is a **quick win** - the document service already exists, the market just never connected to it. The single position record is a **roadmap item** - it depends on the HR core rollout reaching that market. The spreadsheet checklist becomes a configuration task inside the onboarding module, scheduled with the rollout.

**Roadmap.** Aggregated across markets, the sequence almost draws itself: wave one ships the recruiting suite everywhere and harvests the e-signature quick wins; wave two consolidates the HR core and enforces the single position record; wave three tackles payroll consolidation - last, because it is the riskiest and the blueprint made the dependency explicit instead of discovering it in production.

**The meetings, in one list.** For the whole HR domain: one 90-minute scoping session; one three-day design off-site; three 2-hour IT-mapping sessions; one half-day change workshop per market plus a pre-read; one half-day roadmap alignment; then a quarterly governance review, forever.

## What makes it work

Three things, in my experience. **Design before systems** - the moment a workshop starts from what a tool can do, the tool is designing your company. **The discipline of one** - one owner per domain, one system per step, one roadmap per company; every relaxation of a "one" multiplies ambiguity downstream. And **change assessment done with the markets, not to them** - the half-day where a local team finds a real flaw in the blueprint and sees it fixed is the half-day the transformation stops being headquarters' project.

And one honest warning: the method fails quietly, not loudly. The first domains get the off-sites, the sponsorship, and the energy; the last ones get calendar invites. A blueprint pipeline without sustained sponsorship is just a very well-documented backlog. Protect the later waves - that is where the harmonization you promised actually lives.
