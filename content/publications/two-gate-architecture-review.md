---
title: The two-gate architecture review - governance that enables
summary: Architecture review has a reputation problem: the committee where projects go to wait. It doesn't have to be that way. A model with exactly two gates, an engineer-level forum underneath, a fast lane for pattern-conforming work, and decisions recorded where everyone can find them.
date: 2025-11-06
time: 09:10
updated: 2026-05-11
cover: /images/pub/two-gate-review/cover-v4.png
status: published
---

Say "architecture review board" in any large IT organization and watch the room. Delivery teams hear *delay*. Architects hear *the one meeting where we finally see what's being built*. Both are describing the same dysfunction from opposite sides: review that happens too late, decides too little, and costs too much.

The opposite failure is quieter but more expensive: no review at all. Every project picks its own tools, draws its own boundaries, and the incoherence tax arrives years later as the integration spaghetti and duplicate platforms I spend my days untangling.

On previous missions I have converged on a review model that threads this needle. It has exactly two gates, a working forum underneath them, and a short list of things it is allowed to decide. Teams stopped avoiding it. Some even started showing up voluntarily - which is the only approval metric that matters.

## Two gates, placed where change is cheap

The core mistake of classic review boards is placement: one big review near the end, when the design is finished, the vendor is chosen, and the budget is committed. At that point the board has two options - rubber-stamp or grenade - and neither is governance.

Instead, put **two light checkpoints** where they can still change the outcome:

![The two-gate review model on a project timeline: an early direction check, a design loop supported by the weekly design forum, and a pre-build check before implementation starts](/images/pub/two-gate-review/two-gates.png)

**Gate 1 - the direction check, in the earliest project phase.** The question is not "is the design good?" - there is no design yet. The question is: *are we building the right kind of thing, in the right place in the landscape?* Does this project fit the target architecture, reuse the platforms we already pay for, and respect the principles? The input is a one-pager and a sketch; the session is 30 minutes; the output is a direction: build here, reuse that, avoid this, and here are the two risks to watch. Catching a misfit at gate 1 costs a conversation. Catching it at the end costs a re-platforming.

**Gate 2 - the build check, before implementation starts.** Now there is a design, and the question changes: *is it sound and does it comply?* Integration patterns, data flows, security posture, operational readiness - checked against the active standards. The outcome is one of three words: approved, approved with conditions, or rework. Conditions get an owner and a date, or they are not conditions - they are wishes.

Nothing else is a gate. Status updates, budget discussions, and vendor politics live elsewhere.

## The forum that does the actual work

Between the gates sits the layer most organizations skip: a **weekly design forum** - engineers, solution architects, and domain architects reviewing work in progress. No approvals, no minutes-as-verdicts; it is where designs get better before anything is formally checked, where domain improvements are debated, and where technical issues get resolved by the people who will live with them.

The forum changes the character of the gates. When a design has been through three forum sessions, gate 2 takes fifteen minutes, because the hard conversations already happened - in a room optimized for solving problems rather than judging them. A gate should confirm quality, not manufacture it under time pressure.

## The fast lane, or: review as a scarce resource

Not everything deserves a board's attention. Route work by risk, not by habit:

![The routing matrix: pattern-conforming changes take the fast lane with silence as consent, new building blocks get both gates, landscape-changing decisions get the full treatment](/images/pub/two-gate-review/routing.png)

A change that follows a **pre-approved pattern** - the standard integration, the blessed stack, the known extension - takes the fast lane: the team declares conformity, the architects spot-check, and *silence within five working days means consent*. A project introducing a **new building block** gets both gates. A decision that **changes the landscape** - a new platform, a core system replacement, a data domain redesign - gets the full treatment, including the executive sponsor.

The fast lane is not a loophole; it is the reward for standardization, and it is what buys the board the time to think properly about the few decisions that deserve it. In my experience, once patterns mature, well over half of all changes should be riding the fast lane - if they are not, the pattern library is too thin, and that is the board's homework, not the teams' problem.

## Decide, record, or it did not happen

A review that cannot say what it decided is theater. Every gate outcome and every significant trade-off becomes a **decision record**: context, drivers, options considered, the decision, and its consequences - one page, stored where every engineer can find it, linked from the affected systems in the portfolio inventory. Two effects follow. New joiners inherit the reasoning, not just the ruins. And the board becomes accountable to its own history: when a decision ages badly, the record shows why it was reasonable at the time - or that it never was, which is equally instructive.

The same discipline separates what the board **decides** (compliance with standards, placement in the landscape, exceptions and their expiry dates) from what it merely **advises** (everything else). Teams accept a governor with a narrow mandate; they route around one with opinions about everything.

## The mechanics, in one list

For those who like the operational details: gate sessions run weekly in a fixed 45-minute slot, submissions close two days ahead with the one-pager as the only mandatory artifact; the design forum runs weekly, 60 to 90 minutes, agenda owned by the architects but open to any team; decisions are published within 48 hours; exceptions always carry an expiry date; and once a year the principles and pattern library get a maintenance day - because a standard nobody updates is just nostalgia with authority.

Watch four numbers to know whether the model is healthy: time from submission to decision (days, not weeks), the share of changes riding the fast lane (growing), decisions reopened within a year (rare), and the number of teams booking the forum without being told to (the real one).

Architecture governance earns its keep the day a delivery team describes it as the fastest way to get a good answer. Two gates, one working forum, a fast lane, and a written memory - that is the whole machine. Everything beyond that is usually the department of no, reassembling itself.
