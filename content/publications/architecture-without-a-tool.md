---
title: You do not need an APM tool in year one
summary: How to run enterprise architecture with a spreadsheet, a wiki, and a drawing tool - the workbook structure that behaves like a repository, the collection method, the quality KPIs you can compute with formulas, the cadence that keeps it alive, and the honest trigger conditions for finally buying something. With a full starter kit to download.
date: 2024-10-28
time: 09:45
updated: 2026-06-16
cover: /images/pub/architecture-without-a-tool/cover-v1.png
status: published
---

Two months into a new architecture role, someone will ask which tool you are going to buy. It is a friendly question and a trap. Buying a portfolio management platform in your first year is the most legible thing you can do - a line item, a vendor, a project plan, visible motion - and it is usually the fastest way to spend six figures on an empty database.

I have been on both sides of this. I have run an inventory of several hundred applications out of a single spreadsheet and a wiki, and I have watched a well-chosen platform sit two-thirds empty because nobody had settled what a record meant before the licences started. The tool is not the problem. The tool is an amplifier, and in year one there is usually nothing to amplify yet.

*A repository is a set of agreements about what you write down. The software is the least interesting part of it.*

What follows is the setup I would hand to any architect starting alone, composited from my own missions - blurred where it needs to be, specific where it helps. Everything described here exists as files you can download at the end.

## What a tool actually gives you

Strip the demo away and a portfolio platform sells eight things: a place to store records, a defined schema, relationships between records, roles and permissions, surveys to collect data from owners, computed quality metrics, reports and visualisations, and an audit trail. That is the honest list.

Now the uncomfortable part: in year one, six of those eight are cheaper to fake than to buy, and the two that are not - relationships at scale and audit trail - do not hurt yet, because you do not have the volume.

![What a portfolio tool sells, and what plays each part in year one - spreadsheet, wiki, drawing tool, form, calendar, and the two capabilities you deliberately live without](/images/pub/architecture-without-a-tool/stack-v1.png)

The substitutions that work: a spreadsheet is the store and the schema; a wiki page per policy is the governance layer; a shared drawing tool holds the diagrams; a simple form tool runs the attestation campaigns; formulas compute the quality KPIs; and a recurring calendar entry is the operating loop. The audit trail you get from file version history, which is worse than a real one and entirely adequate at this size.

What you give up honestly: automatic dependency graphs across hundreds of records, fine-grained permissions, and integrations that pull data in by themselves. Those are real losses. They are also year-two problems.

## The workbook that behaves like a repository

One file. Not five spreadsheets in five folders - one, with named sheets, owned by you, versioned where everyone can see it.

If you are earlier than this - so new that nobody has asked you for an inventory at all - the file starts smaller still, holding the decisions in flight and the interfaces somebody else already maintains, and it grows into the shape below as the work in flight tells you which applications matter. [That first version is the one you build in month two](/publications/joining-as-the-first-architect), and the IDs you assign in it are the ones everything here joins on, so assign them as though they will outlive you.

![The starter workbook - six sheets, the keys that join them, the fields that are mandatory, and the ones deliberately left out](/images/pub/architecture-without-a-tool/workbook-v1.png)

**Applications** is the spine. One row per application, with an ID you assign and never reuse (APP-001 upward), the name, a description a stranger could act on, the primary business capability, the IT owner, the business owner, the lifecycle state, and the markets or units where it runs. Nine or ten columns. Resist the eleventh until someone can name the decision it feeds.

**IT components** is the second sheet, same shape, prefixed COMP-, carrying vendor, version, end-of-support date, and hosting. The [line between the two sheets](/publications/application-vs-it-component) is the single most valuable decision in the whole file, and it belongs on a wiki page, not in a column header.

**Links** is the sheet that makes a spreadsheet stop being a list. Three columns - from ID, to ID, relationship type - and every relationship in your landscape lives there: application runs on component, application exchanges data with application, application supports capability, and later [object mastered by application](/publications/data-strategy-object-model) when you get to the data side. It is ugly and it works, because a flat link table is exactly what every graph tool imports from anyway.

**Capabilities** holds the two-level map, each with an ID and an owner. **Owners** holds people once, so that when someone leaves you fix one row and not forty. And **Quality** computes the KPIs with formulas over the other sheets - completeness, ownership coverage, records with no capability, stale attestations - so that your monthly number is generated, never typed.

Three habits make the difference between a workbook and a mess. IDs are permanent and never recycled. Every list column is a dropdown backed by a named range, because free text is how you get "Live", "live", "In production", and "PROD" in the same column. And you never delete a row: you set its lifecycle to retired and keep it, because the questions people ask in year three are mostly about things that no longer exist.

> Every hour spent agreeing what a record means saves a week of arguing about what the report shows.

## Collecting the data without a survey platform

The instinct is to email the workbook around. Do not - you will spend the quarter merging versions of the truth. What has worked for me is one round of conversations, then one round of confirmations.

The conversation round is a ninety-minute session per team or domain, with the workbook open and shared on screen, filling rows live with the people who own the systems. Live filling matters: it turns a data request into a working session, arguments happen in front of you, and half the ambiguity resolves itself while everyone is still in the room. Twenty to thirty applications per session is a realistic pace once you stop letting the room debate the classification policy.

The confirmation round comes a month later and is a form, not a spreadsheet: each owner receives their own records, confirms or corrects five fields, and submits. A short form gets answered; an attached spreadsheet gets postponed. The responses come back as a flat table and you paste them into a staging sheet, compare, and apply. That mechanic is the poor cousin of a platform's survey feature and it costs an afternoon per campaign.

One rule that saves the whole thing: **the workbook has exactly one editor - you.** Everyone else proposes changes through the form, the design forum, or a message. Multiple editors in a shared file is how a spreadsheet earns its reputation.

## Diagrams and decisions, in the two other tools

The drawing tool holds three diagrams per domain and no more: current state, target state, and a dated transition state while a migration is running. Export each as an image into the wiki page it belongs to, with a version and a date in the file name. The discipline here is not the tool, it is refusing to keep the forty one-off drawings that accumulate from workshops - those live in a clearly marked working folder where their staleness cannot masquerade as truth.

The wiki holds what a platform would call governance: the classification policy, the minimum data standard, the naming convention, the numbered decision log, and one page per significant application that needs more than a spreadsheet row. Link the wiki page from the workbook row and the row from the wiki page. Two links, maintained by hand, and you have most of what a fact sheet gives you.

## The cadence, which is the actual product

Tools do not keep data fresh; loops do. Without a platform to nag people, the loop has to be visible, and it fits on one page.

![The year-one operating loop without tooling - what happens weekly, monthly, quarterly, and yearly, and which of them you can skip when the week goes badly](/images/pub/architecture-without-a-tool/cadence-v1.png)

Weekly, you update records touched by whatever went live or changed. Monthly, you regenerate the quality sheet and send a short report to the two or three people who can unblock things - never a mailbox. Quarterly, the attestation form goes out and the [fit assessment](/publications/business-fit-technical-fit) runs for one domain at a time. Yearly, and only yearly, you revise the capability model.

When a bad month comes and something has to give, drop the quarterly assessment before you drop the monthly regeneration. The assessment is a deliverable; the loop is the practice.

## When to actually buy something

I am not against tools - I have implemented them, and a good one at the right moment changes what an architecture function can do. The question is only whether you have earned it, and that has honest signals.

![Buy triggers that are real, against the reasons that feel urgent but are not - with the readiness checks to pass before signing anything](/images/pub/architecture-without-a-tool/buy-triggers-v1.png)

Real triggers, in the order they usually arrive: more than one person needs to edit the same records in the same week; you have more than roughly two hundred applications and the link table has become unreadable; someone outside architecture - security, audit, finance - needs self-service access to the data; you need history, meaning who changed what and when, because a decision was disputed; or integration would genuinely automate collection because a CMDB or an HR system already holds a third of what you type by hand.

The reasons that feel urgent and are not: a vendor's demo made the landscape look beautiful; a peer company has one; a new executive asked what tool you use; or - the most expensive one - you hope the tool will produce the discipline you have not yet established. It will not. It will encode whatever discipline exists, including its absence.

And before signing anything, pass three readiness checks: the classification policy is written and applied, the workbook has been through at least two attestation cycles with owners who respond, and you can name the three reports you will build in the first month. If you cannot, the tool will arrive into a vacuum and you will spend its first year doing the work you could have done for free.

## Keeping the migration cheap

Everything above is designed so that the eventual import is boring, which is the real argument for doing it this way rather than waiting.

Keep IDs stable and never reused - they become your external keys. Keep the link table flat, because every tool ingests exactly that shape. Keep the lifecycle vocabulary aligned to what tools use (plan, phase-in, active, phase-out, end of life) rather than inventing your own. Keep dates as real dates in ISO format, not text. And keep the retired rows, because import is also your chance to bring history in.

When I have migrated a workbook built this way, the load itself took days, not months, and the arguments were about the metamodel rather than about the data - which is the good kind of argument, and one you get to have from a position of knowing your own landscape.

## The starter kit

The whole setup is downloadable from the [library](/library), free to use and adapt: the **starter workbook** with all six sheets, dropdowns, example rows, and the quality KPIs already computing; the **template pack** with the classification policy, minimum data standard, naming convention, application one-pager, and the tool business case outline; and the **collection workshop deck** to run the sessions and present the landscape afterwards.

Start with the workbook, fill twenty rows in one sitting with a team that trusts you, and see how far it carries you. In my experience it carries you through the whole first year, most of the second, and it makes the eventual purchase a decision rather than a hope.
