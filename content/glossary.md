# Glossary

## Application
A piece of software people interact with directly to do business work. If it only enables other software, it is an IT component, not an application. Where you draw this line matters less than drawing exactly one and applying it everywhere.

## Application portfolio management (APM)
The discipline of knowing what applications you run, what they cost, who owns them, and where they are in their life - and using that knowledge to decide what to invest in, consolidate, or retire.

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

## Capability map
The hierarchical inventory of an organization's business capabilities, usually two to three levels deep. Used to anchor application portfolios, investments, and transformation scopes to something that does not reorganize every year.

## Design assurance
Engineer-level technical governance: solution and domain architects reviewing designs in progress, resolving issues before any formal gate. Where review actually improves things rather than judging them.

## Fact sheet
One record in the portfolio repository describing one thing - an application, an interface, a capability - with its owners, lifecycle, and relations. The atom of application portfolio management.

## Golden rule
A non-negotiable design principle fixed for one process domain - "one position record drives everything". Local exceptions may vary; the golden rule survives all of them.

## Integration corridor
A cluster of interfaces connecting two major parts of the landscape, such as the ERP core and the commerce stack. Reviewed as a whole, because individual interfaces lie about systemic complexity.

## IT component
Software or infrastructure that enables other software - middleware, databases, runtimes - rather than serving business users directly. Kept separate from applications so the portfolio counts things one way.

## Lifecycle state
Where a system stands on its journey: planned, active, phase-out, retired. The single field whose neglect creates zombie applications that appear in budgets but not in anyone's plans.

## Operating model
How an organization actually runs: its processes, decision rights, roles, and the systems underneath them. Strategy states intent; the operating model is what customers and employees experience.

## Process levels (L1, L2, L3)
Three depths of process description: the end-to-end domain (L1), its major subprocesses (L2), and concrete activity steps (L3). Design workshops stop at L3 - below that lives implementation detail.

## Quality seal
A repository mechanism that marks a record as verified by its owner - and breaks visibly when the record changes or ages without review. Broken seals trending down is a portfolio getting healthier.

## Transition architecture
A deliberate intermediate state between baseline and target - the bridge you operate while a program lands. Flagging systems as transition states keeps churn from being mistaken for bad data.
