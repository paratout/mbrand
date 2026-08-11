---
title: The monthly report nobody reads, and how to fix it
summary: A portfolio quality report is either a work queue or a newsletter, and the difference is mechanical. The six checks worth running, how each one is computed, the one-page layout that gets acted on, how findings become assigned work, the escalation ladder, and what the numbers do over twelve months. With a report pack and templates to download.
date: 2025-06-09
time: 07:55
updated: 2026-06-30
cover: /images/pub/portfolio-quality-report/cover-v1.png
status: published
---

I once sent the same monthly report for five months. It was accurate, it was well laid out, it had a chart. Completeness went from sixty-one percent to sixty-three. On the sixth month I stopped sending it for two weeks to see who would ask. Nobody did.

The report was fine. It was also a newsletter: a description of a situation, addressed to people who had no obvious next action, arriving with no consequence attached. What eventually worked was not a better chart. It was turning the same numbers into a short list of named, dated tasks and sending it to the four people who could actually clear them.

*A report that does not name a person and a date is a newsletter, however precise its numbers are.*

This is the long version of one line from [the inventory piece](/publications/application-portfolio-data-quality) - the monthly quality report - because that line is where portfolio practices most often quietly die. As always, composited from my own missions, figures rounded, details blurred.

## Six checks, and why only six

Every field in an inventory can be checked, which is exactly the trap. A report with twenty-two metrics gets skimmed; a report with six gets read. These are the six that have consistently produced work rather than commentary.

![The six checks - what each one catches, how it is computed, the threshold that makes it a finding, and the false positive to expect](/images/pub/portfolio-quality-report/checks-v1.png)

**Completeness** against the mandatory fields only - not every field, only the eight or nine you actually steer with. Computed as the share of active records with no blanks in the mandatory set. The false positive to watch: records deliberately parked in Plan state, which have no owner yet and should be excluded rather than counted as failures.

**Missing ownership**, split into IT owner and business owner because they behave completely differently. Business owner coverage always trails, and reporting a blended number hides the only interesting part.

**Stale records** - anything not attested or touched within your window, which for most organizations is between ninety and one hundred and eighty days. Stale is not the same as wrong; it means nobody has looked recently, which is a different and more actionable statement.

**Duplicates and near-duplicates** - the same system entered twice under two names, or one application recorded per market when the policy says one record with a markets field. Fuzzy name matching over the active set catches most of them, and the false positive is genuinely separate instances of the same product, which is why a human looks before anything gets merged.

**Orphans**, meaning records with no relationship at all: no capability, no component, nothing. An application connected to nothing is either mis-entered or invisible in every analysis you will run.

**Lifecycle contradictions** - active records whose only supporting component is past end of support, retired records still linked as a target, phase-out records with no successor named. These are the checks that catch actual risk rather than data hygiene, and they are the ones executives remember.

Anything beyond these earns its place by naming the decision it feeds, the same rule the [minimum data standard](/publications/application-portfolio-data-quality) applies to fields.

## The report itself, in one page

Two audiences, one document, and the layout does the reconciling: a domain lead wants their own five rows; the CIO wants the trend line and nothing else. If you need two documents, you have written a newsletter and a work queue rather than one report that works.

![The one-page report - the four blocks, a worked example with rounded figures, and the phrases that mark the newsletter version](/images/pub/portfolio-quality-report/report-v1.png)

**Block one: the headline, three numbers.** Overall completeness with the delta from last month, the number of open findings, and the number of findings closed since the last report. That third number is the one that changes behaviour, because it makes the effort visible rather than only the gap.

**Block two: by domain, sorted by open findings** rather than alphabetically. Domain, records, completeness, open findings, oldest finding in days. Sorting by the problem is not aggression, it is legibility - the top row is where the conversation should start, and the domain lead in the bottom row gets to spend the meeting on something else.

**Block three: the findings, grouped by owner.** Not by check type, by *owner*. Each line reads: what is wrong, which record, who owns it, when it is due. Ten to fifteen lines maximum in the report itself; the full list lives in the attached pack. If more than fifteen things are wrong, you have a campaign, not a report, and that needs a different conversation.

**Block four: two sentences of interpretation.** Not analysis - interpretation. "Business owner coverage stalled again in commerce; the two open roles are the cause, and I will raise it with the domain lead rather than the owners." This is the block people actually read, and it is the one that proves a human looked at the numbers before sending them.

What the newsletter version looks like, so you can recognise your own: percentages with no deltas, a traffic-light table with no names, a chart that takes half the page, the phrase "we should improve data quality", and a distribution list containing a mailbox.

## From finding to fix

The mechanical part, and the reason the report has teeth. Every check produces findings in a fixed shape - record ID, what is missing or wrong, the owner it routes to, the date it is due - and that shape is what makes the report a queue rather than a description.

![From check to closed - how findings are generated, routed to an owner, aged, escalated, and closed, with the four-step ladder and its timings](/images/pub/portfolio-quality-report/loop-v1.png)

**Generate, do not curate.** Findings come out of the checks automatically. The moment you start hand-picking which ones to mention, the report becomes an opinion and its authority leaks away. If a finding is genuinely not worth fixing, that is a *rule* change, not an editorial one - adjust the check and say so in the report.

**Route to a person, never a team.** Every finding carries an Owner-ID resolved to a name. Where the record has no owner, the finding routes to the domain lead by default, and "assign an owner" *is* the finding. This one rule removes most of the ambiguity that makes reports ignorable.

**Age them, visibly.** A finding gets a due date when it appears: fifteen working days for anything that is one field, thirty for anything needing a decision. Age in days is a column in the report, and the oldest open finding per domain appears in block two. Age is what converts a polite request into a mild social pressure, which is the only enforcement a portfolio practice usually has.

**Escalate on a ladder, slowly.** Month one, the finding appears in the report with the owner's name. Month two, it appears in a short direct message to the owner - one line, no attachment. Month three, it goes to the domain lead in a note that names the finding, not the person's character. Month four, it goes on the [architecture board](/publications/architecture-board-forum-system) agenda as a standing two-minute item, which almost never happens, because months two and three work. What matters is that the ladder is published in advance so nobody discovers it by being escalated.

**Close explicitly.** A finding closes when the record changes, not when someone replies. Closed counts go in next month's headline. And when a finding is closed by deciding the check was wrong, say that out loud too - it builds more trust than a clean number ever will.

## What the numbers do over twelve months

Expect a shape, and tell people about the shape in advance so it is not read as failure.

Months one to three: completeness rises fast, because the easy blanks are the majority. This is the honeymoon, and the mistake here is to celebrate the slope publicly, because you will spend the rest of the year explaining why it flattened.

Months four to eight: the plateau. What remains is the hard residue - systems with no clear business owner, acquired units, applications nobody wants to claim. The number barely moves and the temptation to change the metric arrives right on schedule. Resist it, and shift the emphasis to closed findings, which keeps improving even when the percentage does not.

Months nine to twelve: the ratchet. Quality only holds if the [operating loop](/publications/application-portfolio-data-quality) keeps records fresh as change happens; the report at this stage is mostly catching drift rather than backlog, and the interesting number becomes *time to close* rather than the absolute level. If your findings close in a week without chasing, the practice has landed and you can spend the saved time somewhere else.

One honest note from experience: a percentage that has not moved for two quarters is either a target set too high or a residue that is genuinely not worth clearing. Both are fine to say in block four. Neither is fine to hide behind a new chart.

## Anti-patterns worth naming

**The mailbox recipient.** Sending to `it-leads@` guarantees zero ownership. Four named people beat any distribution list.

**Traffic lights without names.** A red cell is not a task. Colour is decoration on a report whose text does not already say who does what by when.

**Metric inflation.** Twenty-two metrics means nobody argues with any of them. Six means the arguments are about the right things.

**The apology report.** Prose explaining why the numbers are low reads as pre-emptive defence. State the number, name the cause in one clause, move on.

**Changing the definition to move the line.** Every redefinition resets your credibility along with the trend. If a check has to change, publish the old and new numbers side by side for one month.

**Reporting on people rather than records.** "Commerce is behind" is a judgment; "Commerce has nine open findings, seven from two unassigned records" is a work queue. Same fact, different consequence.

## The pack

Everything above is downloadable from the [library](/library), free to use and adapt.

The **quality report pack** (spreadsheet) takes an inventory export, runs the six checks with formulas, generates the findings list with owners and due dates, produces the one-page report block by block, and keeps a twelve-month trend sheet so the shape above becomes visible rather than anecdotal. It runs perfectly well [without any portfolio tooling](/publications/architecture-without-a-tool) - the checks are formulas, not features.

The **report templates** (document) hold the check definitions catalogue with rules, thresholds and known false positives; the one-page report template; three covering notes - the monthly send, the month-two nudge, the month-three domain lead note; a remediation ticket format for teams that want findings in their own tracker; and the published escalation ladder to circulate once, before you ever use it.

Start by running the checks once and not sending anything. Look at what comes out, fix the two checks that are obviously producing noise, and only then send the first report - to four people, with names on every line.
