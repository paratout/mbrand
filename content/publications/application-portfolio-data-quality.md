---
title: Your application inventory is a map - keep it honest
summary: Where to draw the line between application and IT component, what a minimum data standard looks like, the trigger-and-cadence operating loop that outlives any clean-up wave, and the KPIs that make portfolio quality steerable.
date: 2025-02-24
time: 08:40
updated: 2025-09-30
cover: /images/pub/apm-data-quality/cover-v4.png
status: published
---

Every large organization has a map of its application landscape - in a portfolio platform, in a service management tool, or in [a spreadsheet doing its best impression of one](/publications/architecture-without-a-tool). The hard part is not building that map. The hard part is that the territory keeps moving: projects go live, systems get retired, owners change jobs. Six months after the big inventory push, a third of the records are stale, people notice, and they quietly stop using the map.

*A map nobody trusts is worse than no map at all, because decisions keep getting made on it long after it stopped describing reality.*

What follows is drawn from my own experience running this kind of effort on large application portfolios - several hundred systems, usually in the middle of a transformation that keeps redrawing the landscape mid-count. Figures are rounded and details deliberately blurred; the mechanics are the point.

## First, decide what counts as an application

It sounds trivial. It is foundational. Whenever I have measured a baseline on a portfolio like this, a large share of what looked like data-quality problems were actually *classification* problems: is the integration middleware an application? The reporting layer? The database under the warehouse? Different teams answer differently, so the same kind of thing ends up in the repository three different ways.

Of all the candidate rules I have seen debated, the one that sticks is the simplest - the **user line**: if people interact with it directly, it is an application; if it only enables other software, it is an IT component. Which line you pick matters less than picking exactly one, writing it into policy, and applying it everywhere. Every ambiguous record you leave behind is a future argument you have scheduled with yourself.

## A minimum data standard, not a maximal one

The second decision is to define completeness narrowly. A record is complete when it has: a name that follows the naming convention, a description a stranger could act on, at least one business capability from the reference model, a named IT owner *and* business owner, and a lifecycle state. That is the whole standard.

Everything else stays optional until someone demonstrates they steer with it. An inventory campaign that chases forty fields dilutes the energy you need for the six fields that actually carry decisions.

> A record is complete when you can answer four questions: what is it, what does it do, who owns it, and where is it in its life. Anything more is decoration until proven otherwise.

## The operating loop

The initial clean-up works best in waves, domain by domain, with enterprise and domain architects driving. But the wave is the easy part; the design question that decides whether quality survives is what runs *after* the wave. The answer that has worked for me is one principle and two streams.

![The operating loop: trigger-based updates when change happens, cadence-based checks on the calendar, with escalation through domain leads](/images/pub/apm-data-quality/operating-loop-v2.png)

The principle: **responsibility sits where change happens**. Whoever changes the landscape updates the record. The central portfolio team measures, reports, and escalates - it does not type on behalf of others, because a central team that types becomes both the bottleneck and the single point of staleness.

The trigger stream hooks record updates to events: a project going live updates its records before hypercare ends - it is part of the definition of done, not a favor to architecture. Retirements set lifecycle and successor the week they land. Ownership changes are reassigned immediately, because records without a live owner rot fastest of all.

The cadence stream catches what triggers miss: a quarterly attestation where every application owner confirms owners, lifecycle, and capability mapping through a short survey; a [monthly quality report](/publications/portfolio-quality-report) to the IT domain leads with completeness, stale records, duplicates, and broken quality seals - plus the remediation backlog attached, so the report is a work queue, not a newsletter; a quarterly review of the busiest integration corridors; and a yearly - only yearly - revision of the business capability model, because a taxonomy that moves every quarter cannot anchor anything.

## Measure what you steer by

Agree a small KPI set with the domain leads, measure the baseline honestly, and fix targets with a close date rather than leaving them as aspirations. On a recent mission, the scorecard looked roughly like this:

![KPI scorecard example: IT owner coverage from about 85 to 95 percent, business owner coverage from about 65 to 85 percent, capability mapping to 95 percent, capability ownership 100 percent hard gate, attestation response above 80 percent](/images/pub/apm-data-quality/kpi-scorecard-v2.png)

Two lessons live inside numbers like these. Business owner coverage starts around twenty points below IT owner coverage - it always does, because the org chart does not map one-to-one onto systems. What moves it is not mass email but routing the campaign through the domain leads with a fixed two-week answer window and a visible escalation path.

The other lesson: when the capability model itself is the problem, restart the mapping at zero against a revised reference model instead of defending the old one. Accepting a scary 0% on the scorecard beats protecting sunk investment in a hierarchy nobody believes in.

## What I would tell you to steal

1. Codify the application-versus-component line before you measure anything. Most of your "bad data" is undecided data.
2. Define a minimum data standard around the fields you steer with, and refuse to campaign for the rest.
3. Put record updates into the definition of done of every project. Quality you have to ask for is quality you will not get.
4. Attest, don't audit: owners confirm their own records on a cadence; the central team samples and challenges.
5. Send the monthly report to people who can unblock things - domain leads, not a mailbox - and attach the backlog to it.
6. Give every KPI a measured baseline and a close date. A target without a date is a wish.

One more, for anyone counting a landscape mid-transformation: mark transition-state records explicitly and sync with the program's own remediation work, instead of fighting the churn record by record. The program will win that fight; the flag will not.

A portfolio inventory is a promise an IT organization makes to itself: this is what we run, this is who answers for it. Promises survive when they are cheap to keep. The wave ends. The loop must not.
