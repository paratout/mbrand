# Glossary

## Application
A piece of software people interact with directly to do business work. If it only enables other software, it is an IT component, not an application. Where you draw this line matters less than drawing exactly one and applying it everywhere.

## Application portfolio management (APM)
The discipline of knowing what applications you run, what they cost, who owns them, and where they are in their life - and using that knowledge to decide what to invest in, consolidate, or retire.

## Application rationalization
The periodic exercise of asking the portfolio hard questions: why do we run three of these, who still uses this, and what would break if it disappeared. Done continuously it is hygiene; done once a decade it is surgery.

## Architecture decision record (ADR)
A one-page record of a significant decision: the context, the drivers, the options considered, the choice, and its consequences. The cheapest institutional memory an IT organization can buy.

## Architecture principle
A short, opinionated rule that decides real trade-offs - "buy before build", "one core system per process step". If a principle has never made anyone unhappy in a review, it is a poster, not a principle.

## Architecture review board (ARB)
The governance body that checks planned work against the target landscape, standards, and principles. Healthy ones decide little, early, and fast; unhealthy ones become the department of no.

## Baseline and target architecture
The landscape as it is today (baseline) and as it should look at a chosen horizon (target). Everything interesting happens in between - see transition architecture.

## Business capability
Something the business must be able to do - "forecast demand", "onboard employees" - independent of who does it, how, or with which system. The most stable vocabulary an enterprise has, which is why maps are drawn with it.

## Business process owner
The single named person accountable for one end-to-end process across all markets and units - its design, its performance, and its exceptions. Where there are two owners, there are zero.

## Capability heatmap
A capability map with a verdict painted on it: each tile colored by maturity, cost, risk, or redundancy. The fastest way to turn an inventory into a leadership conversation.

## Capability map
The hierarchical inventory of an organization's business capabilities, usually two to three levels deep. Used to anchor application portfolios, investments, and transformation scopes to something that does not reorganize every year.

## Change impact assessment
The structured comparison of a target design against one unit's current way of working: align on the design, identify the gaps, translate every gap into a named change topic. Done with the local team, never to them.

## Data object
A business-level piece of information that flows between systems - the order, the invoice, the position record. Naming the data objects on an interface is what turns an arrow on a diagram into something an architect can verify.

## Decommissioning
The deliberate retirement of a system: data archived, interfaces re-pointed, contract ended, record closed. The most undervalued discipline in IT - nobody gets promoted for it, and every landscape rots without it.

## Definition of done
The checklist a piece of work must satisfy before it counts as finished. The architect's favorite lever: put "portfolio records updated" inside it, and data quality stops being a favor.

## Design assurance
Engineer-level technical governance: solution and domain architects reviewing designs in progress, resolving issues before any formal gate. Where review actually improves things rather than judging them.

## Domain architecture
Architecture practiced at the level of one business domain - commerce, finance, HR - by an architect who knows its processes, systems, and politics by name. The layer where enterprise intentions meet delivery reality.

## Enterprise architecture (EA)
The practice of understanding and shaping how an organization's processes, information, and systems fit together - so that individual decisions add up to a coherent whole instead of an expensive coincidence.

## Fact sheet
One record in the portfolio repository describing one thing - an application, an interface, a capability - with its owners, lifecycle, and relations. The atom of application portfolio management.

## Fast lane
The review route for pattern-conforming changes: declare conformity, get a spot-check, and silence within a fixed window means consent. Not a loophole - the reward for standardization.

## Gate
A checkpoint where work must show something specific before proceeding - a direction before design, a sound design before build. Two well-placed gates outperform five badly placed ones, every time.

## Golden rule
A non-negotiable design principle fixed for one process domain - "one position record drives everything". Local exceptions may vary; the golden rule survives all of them.

## Guardrail
A constraint that keeps teams safe at speed instead of stopping them for inspection - pre-approved patterns, platform defaults, paved roads. The more guardrails, the fewer gates you need.

## Integration corridor
A cluster of interfaces connecting two major parts of the landscape, such as the ERP core and the commerce stack. Reviewed as a whole, because individual interfaces lie about systemic complexity.

## Interface
A connection over which two systems exchange data objects. The true unit of landscape complexity: applications are what you pay for, interfaces are what you suffer for.

## IT component
Software or infrastructure that enables other software - middleware, databases, runtimes - rather than serving business users directly. Kept separate from applications so the portfolio counts things one way.

## Landscape
The full population of applications, components, and interfaces an organization operates, seen as one system. The thing enterprise architects draw, measure, and slowly bend toward intention.

## Lifecycle state
Where a system stands on its journey: planned, active, phase-out, retired. The single field whose neglect creates zombie applications that appear in budgets but not in anyone's plans.

## Master data
The data everything else refers to - customers, products, suppliers, employees. Whoever fails to govern it pays for the failure in every system, every report, and every integration, forever.

## Operating model
How an organization actually runs: its processes, decision rights, roles, and the systems underneath them. Strategy states intent; the operating model is what customers and employees experience.

## Pattern library
The catalog of pre-approved ways to solve recurring design problems - the standard integration, the blessed stack, the reference deployment. Its thickness determines how much of your governance can be a fast lane.

## Process levels (L1, L2, L3)
Three depths of process description: the end-to-end domain (L1), its major subprocesses (L2), and concrete activity steps (L3). Design workshops stop at L3 - below that lives implementation detail.

## Quality seal
A repository mechanism that marks a record as verified by its owner - and breaks visibly when the record changes or ages without review. Broken seals trending down is a portfolio getting healthier.

## Quick win
A change that can start now, with no dependency on a rollout or a restructuring. Quick wins buy the credibility that roadmap items spend.

## Reference architecture
The worked-out target design for one recurring problem class - data platforms, omnichannel, integration - that individual projects instantiate instead of reinventing. Opinionated by design, or it decides nothing.

## Roadmap
The sequenced plan that turns a target architecture into waves of funded, owned work. Every item carries an owner, a dependency, and a value statement - a target without a date is a wish.

## Shadow IT
Systems acquired and run outside IT's knowledge - usually a spreadsheet that grew teeth, or a SaaS subscription on a corporate card. Less a compliance sin than a signal: somewhere, a real need went unserved.

## Solution architecture
Architecture practiced at the level of one project or product: the concrete design that has to work by the go-live date. Good solution architects translate enterprise intention into something that ships.

## Standard
A technology or pattern the organization has committed to, with an owner and a review date. An active standard shortens a hundred future discussions; an unmaintained one is nostalgia with authority.

## Technical debt
The accumulated cost of past shortcuts: systems kept alive too long, integrations built twice, documentation that lives in one person's head. Like financial debt, survivable when visible and serviced - fatal when denied.

## Transition architecture
A deliberate intermediate state between baseline and target - the bridge you operate while a program lands. Flagging systems as transition states keeps churn from being mistaken for bad data.

## Wave
One planned slice of a rollout or transformation - a set of domains, markets, or systems moved together. Waves make multi-year change survivable: while one wave lands, the next is being designed.

## Zombie application
A system that is operationally alive but organizationally dead: no owner, no roadmap, no one who dares to switch it off. Every landscape has a few; mature portfolios know their names.
