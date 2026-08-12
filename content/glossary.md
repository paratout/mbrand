# Foundations

## Application architecture
The layer concerned with what applications exist, what each is for, and how they fit together. It is the layer most organizations actually manage, because it is the one with a budget line attached.

## Architecture community of practice
The informal network of architects across domains and units who share patterns, review each other's work, and keep the practice coherent without a reporting line. [In a federation it is not a nice extra](/publications/governing-without-a-mandate), it is the practice.

## Architecture continuum
The idea that architecture assets range from generic industry models to your own specific designs, and that you should reuse from the generic end before inventing at the specific end. Useful as a habit, rarely useful as a diagram.

## Architecture repository
The place where the models, decisions, standards, and inventory actually live and can be queried. If yours is a folder of slide decks, you have documentation rather than a repository.

## Architecture vision
The short statement of where the landscape is heading and why, written before the detailed work starts. One page that survives contact with a steering committee beats forty that do not.

## ArchiMate
An open modelling language for enterprise architecture, with notation for business, application, and technology layers and the relations between them. Precise, learnable, and almost always more notation than your audience wants.

## Business architecture
The layer that describes what the organization does and how it is organized to do it - capabilities, value streams, processes, and the objects they act on - independent of systems. Done well it is the only architecture business people ever ask to see again.

## Chief architect
The person accountable for the architecture practice as a whole: the principles, the forums, the standards, and the hiring. The role is one third design, one third politics, and one third refusing things gracefully.

## C4 model
A way of describing software architecture at four zoom levels - context, container, component, code - so that each diagram has one audience. Its real contribution is the discipline of not mixing levels on one page.

## Concern
Something a stakeholder cares about that the architecture has to answer: cost, resilience, time to market, regulatory exposure. Naming concerns before drawing anything is what stops a diagram from being decorative.

## Data architecture
The layer covering what information the organization holds, who owns it, where it lives, and how it moves. Neglected longest and regretted hardest, because every other layer quietly depends on it.

## Domain architecture
Architecture practiced at the level of one business domain - commerce, finance, HR - by an architect who knows its processes, systems, and politics by name. The layer where enterprise intentions meet delivery reality.

## Enterprise architect
The person responsible for making individual technology decisions add up across an organization. Most of the job is not drawing: it is [knowing what already exists, who owns it](/publications/first-twelve-quarters), and which argument is worth having this quarter.

## Enterprise architecture (EA)
The practice of understanding and shaping how an organization's processes, information, and systems fit together - so that individual decisions add up to a coherent whole instead of an expensive coincidence.

## Federated architecture
An operating model where architecture work is distributed to domain and solution architects who belong to their units, with a small centre holding principles, standards, and the repository. Usually [the better design rather than a compromise](/publications/governing-without-a-mandate) you settle for.

## Industry reference model
A published capability or process model for a sector, offered as a starting point rather than an answer. Worth an afternoon of borrowing structure and a firm refusal to adopt wholesale.

## Ivory tower
The failure mode where architecture produces models nobody uses and judgements nobody asked for. The cure is not more communication, it is [doing work that somebody would notice the absence of](/publications/first-twelve-quarters).

## Segment architecture
Architecture scoped to one slice of the enterprise - a domain, a market, a value stream - detailed enough to guide projects within it. Where the useful middle ground between an enterprise map and a solution design lives.

## Solution architecture
Architecture practiced at the level of one project or product: the concrete design that has to work by the go-live date. Good solution architects translate enterprise intention into something that ships.

## Security architecture
The layer covering identity, access, data protection, and the controls that make the rest defensible. Best treated as a design input from day one rather than a review at the end, because retrofitting it is always the expensive path.

## Stakeholder
Anyone whose decisions the architecture affects or who can affect the architecture. The list is always longer than the invitation list, which is the source of most late surprises.

## Technology architecture
The layer covering platforms, runtimes, networks, and infrastructure - the substrate everything else runs on. Increasingly a set of purchasing and configuration decisions rather than engineering ones.

## TOGAF
A widely used enterprise architecture framework, best known for its Architecture Development Method. Valuable as a shared vocabulary and a checklist of things not to forget; dangerous when followed as a project plan.

## Architecture Development Method (ADM)
The cyclical process at the centre of TOGAF, running from vision through business, application, and technology architecture to migration planning and governance. Read it as a list of questions rather than a sequence of phases.

## View
A representation of the architecture aimed at one audience and one set of concerns - a landscape diagram for executives, a sequence diagram for engineers. A view that serves two audiences usually serves neither.

## Viewpoint
The rules for building a particular kind of view: what is shown, what is left out, and for whom. Agreeing viewpoints once saves an argument about diagram conventions in every single review.

## Zachman Framework
A classification scheme that crosses six questions (what, how, where, who, when, why) with six perspectives, producing a grid of architecture artifacts. More useful as a completeness check than as a work plan.

# Business and capability

## Blueprint
The agreed target design for one domain, covering the process to level three and the systems each step maps to. A blueprint is finished when [every step has exactly one target system](/publications/domain-blueprinting) and every gap has a named owner.

## Business capability
Something the business must be able to do - "forecast demand", "onboard employees" - independent of who does it, how, or with which system. [The most stable vocabulary an enterprise has](/publications/landscape-due-diligence), which is why maps are drawn with it.

## Business function
An organizational grouping of work, usually matching a department. Related to capability but not the same thing, and confusing the two is how capability maps end up mirroring the org chart.

## Business model
How an organization creates, delivers, and captures value. Architecture that does not know the business model will optimize for the wrong constraint with total confidence.

## Business object
A thing the business recognizes and talks about: an order, a contract, a shipment. The bridge between process design and the data model, and the reason both should be drawn by people who have met.

## Business process
A sequence of activities producing an outcome for a customer or the organization. Processes cross departments, which is why they are hard to own and why naming one owner matters so much.

## Business process owner
The single named person accountable for one end-to-end process across all markets and units - its design, its performance, and its exceptions. Where there are two owners, there are zero.

## Business rule
A statement that constrains or drives business behaviour: a credit limit, an approval threshold, an eligibility test. Rules buried in code become organizational folklore, which is why the good ones get written down somewhere a non-developer can read.

## Business service
Something one part of the organization provides to another with a defined outcome and a service level. Naming them turns internal favours into things that can be measured and, occasionally, improved.

## Capability heatmap
A capability map with a verdict painted on it: each tile colored by maturity, cost, risk, or redundancy. The fastest way to turn an inventory into a leadership conversation.

## Capability map
The hierarchical inventory of an organization's business capabilities, usually two to three levels deep. Used to [anchor application portfolios, investments, and transformation scopes](/publications/landscape-due-diligence) to something that does not reorganize every year.

## Capability maturity
An assessment of how well the organization performs a capability, usually on a scale of four or five levels. The scale matters far less than the discipline of writing down what each level looks like before anyone scores anything.

## Customer journey
The sequence of interactions a customer has with the organization, viewed from their side rather than ours. It reliably exposes handovers between systems that nobody owns, which is why architects should read them.

## Domain
A slice of the business with one accountable owner, a stable set of core objects, and a target architecture. [Draw domains on the capability map, never on the org chart](/publications/every-project-needs-an-address), or a reorganization invalidates every assignment you have made.

## Jobs to be done
The framing that customers hire a product to make progress on something, rather than buying features. A useful antidote in requirement workshops where the list of wanted features has grown longer than the reason for wanting them.

## Market
A country or regional unit with its own operations, and usually its own systems and legal constraints. [Central architecture that has never visited one](/publications/landscape-due-diligence) will design something the markets route around politely.

## Operating model
How an organization actually runs: its processes, decision rights, roles, and the systems underneath them. Strategy states intent; the operating model is what customers and employees experience.

## Process levels (L1, L2, L3)
Three depths of process description: the end-to-end domain (L1), its major subprocesses (L2), and concrete activity steps (L3). [Design workshops stop at L3](/publications/domain-blueprinting) - below that lives implementation detail.

## Process mining
Reconstructing how a process actually runs from the event logs the systems already produce. Frequently uncomfortable, because the real process has variants nobody documented and shortcuts nobody admitted.

## Seam
The boundary between two domains where responsibility is genuinely contested - the invoice, consent, stock in transit. [Name the seams in writing with a rule each](/publications/every-project-needs-an-address), rather than redrawing boundaries until the argument disappears, because it will not.

## Target operating model
The intended future state of the operating model: which capabilities are centralized, which are local, and who decides what. Architecture that ignores it will produce systems the organization cannot staff.

## Value chain
The sequence of activities through which an organization creates value, from supply to customer. Older framing than value streams and still the fastest way to explain a business to somebody in ten minutes.

## Value stream
The end-to-end set of steps that delivers a result to a stakeholder, cutting across functions. Mapping one is the quickest way to find the four handovers where the work waits.

## Wardley map
A map that positions components by value-chain visibility and by evolutionary maturity, from genesis to commodity. Its practical use is arguing about what to build versus buy with something other than instinct.

# Portfolio

## Application
A piece of software people interact with directly to do business work. If it only enables other software, [it is an IT component](/publications/application-vs-it-component), not an application. Where you draw this line matters less than drawing exactly one and applying it everywhere.

## Application owner
The named person in IT accountable for an application's operation, cost, and lifecycle. A team mailbox in the owner field is a record without an owner, however convenient it looks in a report.

## Application portfolio management (APM)
The discipline of knowing what applications you run, what they cost, who owns them, and [where they are in their life](/publications/application-portfolio-data-quality) - and using that knowledge to decide what to invest in, consolidate, or retire.

## Application rationalization
The periodic exercise of asking the portfolio hard questions: why do we run three of these, who still uses this, and what would break if it disappeared. Done continuously it is hygiene; done once a decade it is surgery.

## Attestation
The periodic confirmation by an owner that a record is still true. [The cheapest data quality mechanism there is](/publications/application-portfolio-data-quality), and the one whose age tells you more about a repository than any completeness percentage.

## Business fit
A rating of how well an application supports the process it exists for, given by the business, not by IT. [Separate it from technical fit](/publications/business-fit-technical-fit) or you get one blended number that hides which problem you actually have.

## Business owner
The named person on the business side accountable for what an application is used for and whether it still earns its place. Coverage of this field always trails IT ownership, and reporting the two separately is what makes the gap fixable.

## Decommissioning
The deliberate retirement of a system: data archived, interfaces re-pointed, contract ended, record closed. The most undervalued discipline in IT - nobody gets promoted for it, and every landscape rots without it.

## Duplicate application
Two or more systems doing substantially the same job, usually acquired by different units at different times. Finding them is easy; the hard part is that each one has a happy user base and a sunk investment.

## End of life
The date after which a vendor no longer sells or maintains a product at all. Distinct from end of support, and the one that turns a planning problem into an audit finding.

## End of support
The date after which a vendor stops issuing fixes and security patches. A component past this date inside an active application is the clearest form of technical risk a portfolio can carry.

## Fact sheet
One record in the portfolio repository describing one thing - an application, an interface, a capability - with its owners, lifecycle, and relations. The atom of application portfolio management.

## Functional fit
How completely an application covers the functions its users need, independent of how well it runs. Low functional fit is the reliable predictor of the spreadsheet growing next to it.

## Inventory
The list of what you actually run, with owners and lifecycle states. [It is the deliverable, not the report generated from it](/publications/architecture-without-a-tool), and the difference matters six months later.

## IT component
Software or infrastructure that enables other software - middleware, databases, runtimes - [rather than serving business users directly](/publications/application-vs-it-component). Kept separate from applications so the portfolio counts things one way.

## Landscape
The full population of applications, components, and interfaces an organization operates, seen as one system. The thing enterprise architects draw, measure, and slowly bend toward intention.

## Landscape diagram
A picture of part of the landscape at one moment, generated from the inventory rather than drawn by hand. Hand-drawn landscapes are beautiful and wrong within a quarter.

## Lifecycle state
Where a system stands on its journey: planned, active, phase-out, retired. The single field whose neglect creates zombie applications that appear in budgets but not in anyone's plans.

## Obsolescence
The condition of running technology the market has moved past, whether or not it still works. It rarely causes an outage on its own; it causes a shortage of people willing to touch it.

## Orphan record
An entry in the repository with no owner, no capability, and no relationships. Usually created during a collection exercise and never completed, and the leading indicator of a repository sliding back into a list.

## Portfolio quality
The measured health of the inventory itself: completeness, ownership coverage, staleness, contradictions. [Report it monthly with the specific items rather than the totals](/publications/portfolio-quality-report), or nothing gets fixed.

## Repository
The system of record for architecture information: applications, components, capabilities, objects, and the relations between them. [A spreadsheet is a legitimate repository in year one](/publications/architecture-without-a-tool), as long as the IDs are stable.

## Run cost versus change cost
The split between what it costs to keep a system operating and what it costs to change it. Portfolios that only track the first number always over-invest in the wrong systems.

## Shadow IT
Systems acquired and run outside IT's knowledge - usually a spreadsheet that grew teeth, or a SaaS subscription on a corporate card. Less a compliance sin than a signal: somewhere, a real need went unserved.

## Six Rs
The set of options for moving an application to a new platform: retain, retire, rehost, replatform, refactor, replace. A useful vocabulary for a migration, and an excellent way to discover that half the estate should be retired.

## Sunset date
The agreed date on which a system stops being used. A phase-out state without a date is an intention; with a date it is a plan, and only one of the two ever happens.

## Technical fit
A rating of an application's technical health: currency of the stack, support status, integration debt, operability. Rated by IT, [on a published scale](/publications/business-fit-technical-fit), and never blended with business fit.

## Technology radar
A published view of technologies the organization is adopting, trialling, holding, or retiring. Its value is not the picture, it is that somebody had to decide which ring each thing goes in.

## Technology standard
A specific technology the organization has committed to for a purpose, with an owner and a review date. Standards that nobody reviews become the reason new hires quietly install something else.

## TIME model
A four-way classification of applications as tolerate, invest, migrate, or eliminate, based on business and technical fit. Its virtue is that [it converts two ratings into one decision](/publications/business-fit-technical-fit) without hiding either of them.

## Total cost of ownership
Everything a system costs over its life: licences, infrastructure, support, integration, and the people who keep it alive. The last item is the one always missing from the business case.

## Zombie application
A system that is operationally alive but organizationally dead: no owner, no roadmap, no one who dares to switch it off. Every landscape has a few; mature portfolios know their names.

# Data

## Canonical data model
One agreed shape per business object, used inside the integration layer, with system-specific dialects translated at the edges. Twelve formats at the boundary is fine; [twelve dialects inside is a layer nobody can change](/publications/clean-core-integration).

## Cross-reference table
The mapping between identifiers for the same thing in different systems. Unglamorous, permanent, and the single artifact that decides whether a migration is a weekend or a quarter.

## Data catalog
A searchable index of the data assets an organization holds, with their descriptions and owners. Excellent at describing what exists; not designed to hold a decision about who owns a thing, which is why it does not replace an object model.

## Data classification
The label that says how sensitive a piece of data is and therefore how it must be handled. If eighty per cent of your objects end up in the top tier, the tiering is decorative and saying so once a year fixes it.

## Data contract
The agreed shape, meaning, quality, and delivery promise for data passing between a producer and a consumer. It turns "the feed changed" from a surprise into [a breach of something written down](/publications/data-strategy-object-model).

## Data domain
A grouping of related data objects under one accountable owner - customer data, product data, financial data. It is the data equivalent of a business domain, and drawing them differently causes years of confusion.

## Data lake
A store holding large volumes of raw data in its original form for later processing. Genuinely useful, and reliably becomes a swamp in the absence of an object model and ownership.

## Data lineage
The traceable path of a piece of data from origin through every transformation to its final use. Nobody asks for it until an auditor or a wrong number does, at which point they ask urgently.

## Data mesh
An approach that treats data as a product owned by the domains that produce it, with a self-serve platform underneath. A sound organizational idea frequently bought as a technology, which is why it disappoints.

## Data object
A business-level piece of information that flows between systems - the order, the invoice, the position record. Naming the data objects on an interface is what turns an arrow on a diagram into something an architect can verify.

## Data owner
The business person accountable for a data object: its definition, its quality thresholds, and who may consume it. Distinct from the steward, who does the maintaining, and both names should be real.

## Data product
A dataset packaged for consumption with a contract, an owner, documentation, and a service level. The word product is doing the work here: it implies somebody is accountable for whether anyone can use it.

## Data quality
The degree to which data is complete, accurate, consistent, and current enough for the decisions it feeds. Measure it against named decisions, not in the abstract, or you will report percentages nobody acts on.

## Data residency
The requirement that certain data physically remain within a jurisdiction. [Answerable in four days if you keep object-to-component links](/publications/data-strategy-object-model), and in six weeks if you do not.

## Data steward
The person who maintains a data object day to day: its definition, its quality rules, its exceptions. Usually [five to ten per cent of an existing job](/publications/data-strategy-object-model) rather than a new role, and drawn from someone who already knows the data.

## Data warehouse
A structured store optimized for reporting and analysis, fed from operational systems. Older than the lake, better governed than the lake, and still where most organizations' numbers actually come from.

## Dual write
The period during which two systems both write the same object, typically while mastership moves from one to the other. [Register it as an exception with an expiry date](/publications/data-strategy-object-model), because a window with no written end has been known to run for two years.

## Golden record
The single reconciled version of a master data entity, assembled from several sources. A sensible fallback when no system can be made the master, and a poor substitute for deciding which one should be.

## Master data
The data everything else refers to - customers, products, suppliers, employees. Whoever fails to govern it pays for the failure in every system, every report, and every integration, forever.

## Master data management (MDM)
The capability, and usually the platform, for keeping master data consistent across systems. Buying it before deciding which system masters each object gives you a very capable way to synchronize a disagreement.

## Metadata
Data about data: what a field means, where it came from, when it was last changed, who may see it. The layer that makes everything else searchable, and the first thing dropped when a project runs late.

## Object factsheet
One page per domain object holding its definition, boundary, owner, master system, key attributes, and links. The unit that [turns a data strategy from prose into something the repository can hold](/publications/data-strategy-object-model).

## Ontology
A formal description of concepts and the relationships between them in a domain. Powerful, expensive, and almost always more precision than the argument you are trying to settle requires.

## Personal data
Any information relating to an identifiable person. Its handling is set by law rather than by architecture, which makes it one of the few constraints where the correct architectural response is to ask a lawyer.

## Reference data
The small, slow-changing lists everything else uses: country codes, currencies, units, statuses. Trivial until two systems disagree about what "active" means, at which point it is not trivial at all.

## Retention policy
How long data is kept before it must be deleted or archived, usually set per jurisdiction. [Attach it to the object rather than to the systems](/publications/data-strategy-object-model), and one edit generates the list of forty systems in scope.

## Schema
The formal structure of a dataset or message: fields, types, and constraints. A file transfer without one is not an interface, it is a rumour.

## System of record
The one system that creates and changes a given object; everyone else consumes. Writing this down for each object is [the single most consequential sentence in a data strategy](/publications/data-strategy-object-model) and the one most often left out.

## System of reference
An authorized copy of an object held elsewhere for a stated purpose, ideally with an expiry date. The difference between a legitimate reference copy and a second master is [whether anyone wrote the purpose down](/publications/data-strategy-object-model).

## Taxonomy
A hierarchical classification used to organize things consistently - a product taxonomy, a spend taxonomy. Cheap to define, expensive to change later, so it deserves more argument up front than it usually gets.

## Transactional data
The records of things that happened: orders, movements, payments. High volume, short-lived relevance, and the reason master data quality problems become visible at scale.

# Integration

## Application programming interface (API)
A published, versioned way for one system to ask another for something or tell it something. If it is not published and versioned, it is an internal function call you have decided to depend on.

## API gateway
The component that sits in front of APIs handling authentication, routing, rate limiting, and monitoring. Useful, and a magnet for business logic that does not belong there.

## Asynchronous integration
Exchange where the sender does not wait for the receiver, using events or queues. It absorbs the gap between a core that is upgrading and a market that is trading, which is why it should be the default.

## Backward compatibility
The promise that a new version of an interface will not break existing consumers. Every breaking change you avoid is a migration project somebody else does not have to run.

## Batch interface
A scheduled bulk exchange rather than a continuous one. Perfectly legitimate, frequently the right answer, and only a problem when nobody can say what happens if a run is missed.

## Change data capture
Detecting and streaming changes from a database as they happen. A powerful way to build integrations, and a direct dependency on somebody else's internal schema unless carefully bounded.

## Choreography
Coordination where each service reacts to events without a central controller. Scales well, and makes it genuinely hard to answer the question "where is my order right now".

## Contract testing
Automated checks that a provider still satisfies what its consumers expect. The cheapest insurance against the class of failure that is only discovered in production by somebody else's team.

## Dead letter queue
Where messages go when they cannot be processed. An interface without one loses data silently, which is worse than losing it loudly.

## Enterprise service bus (ESB)
A centralized integration layer that routes and transforms messages between systems. Fine as plumbing, disastrous as a home for business rules, which is exactly where those rules migrate under deadline pressure.

## Event
A record that something happened, published for anyone interested. Events decouple systems in a way requests cannot, at the cost of making the overall flow harder to see in one place.

## Event-driven architecture
A style where components communicate primarily by publishing and consuming events. Excellent for resilience and independence, demanding in observability, and unforgiving if nobody defined the event shapes.

## Extract, transform, load (ETL)
Moving data out of source systems, reshaping it, and loading it into a target - usually for reporting. Its variant ELT loads first and transforms in place, which is mostly a question of where you want the compute bill.

## File drop
Integration by placing a file somewhere and hoping. It becomes an interface the moment it has a schema, an owner, monitoring, and dead-letter handling; until then it is the longest-surviving liability in most landscapes.

## Hub and spoke
An integration topology where systems connect to a central hub rather than to each other. Fewer connections to manage, one thing that can take everything down, and a hub that quietly accumulates logic.

## Idempotency
The property that processing the same message twice has the same effect as processing it once. Unglamorous, and the difference between a bad night and a boring morning.

## Integration corridor
A cluster of interfaces connecting two major parts of the landscape, such as the ERP core and the commerce stack. Reviewed as a whole, because individual interfaces lie about systemic complexity.

## Integration platform as a service (iPaaS)
Hosted integration tooling offered as a subscription. Removes the infrastructure problem and leaves the governance problem completely untouched.

## Interface
A connection over which two systems exchange data objects. The true unit of landscape complexity: applications are what you pay for, interfaces are what you suffer for.

## Message broker
Middleware that accepts messages from producers and delivers them to consumers, with buffering and retry. The component that makes asynchronous integration practical rather than theoretical.

## Middleware
Software that sits between applications and moves data between them. Keep it thin - routing, transformation, protocol, retry, monitoring - because business rules placed here become a third system with no owner and no tests.

## OpenAPI
A standard, machine-readable description of a REST API. Its practical value is that documentation, client code, and tests can all be generated from one file that cannot silently drift.

## Orchestration
Coordination where a central component directs the steps of a process across services. Easier to reason about than choreography, and it creates a component that knows too much.

## Point-to-point integration
A direct connection between two systems with no shared contract. Not a sin in itself; the absence of a contract is the sin, and the count of them is what turns a landscape into a fragile web.

## Publish and subscribe
A pattern where producers emit events without knowing who consumes them. It lets you add a consumer without touching the producer, which over five years is worth more than almost any other integration property.

## Released contract
An interface the vendor or team has published, versioned, and promised to keep compatible. Building on anything else means depending on an internal you were never meant to see.

## Replay
The ability to re-process messages from a point in time. The recovery mechanism you never budget for and always want at 3am.

## Request and response
Synchronous exchange where the caller waits for an answer. Correct when a person is waiting, and a coupling you feel in every maintenance window when they are not.

## Saga
A pattern for managing a transaction that spans several services, using compensating actions instead of a distributed lock. Conceptually clean, operationally demanding, and worth it only when the alternative is worse.

## Service mesh
Infrastructure that handles service-to-service communication concerns - discovery, retries, encryption, telemetry - outside application code. Solves real problems and adds an operational surface most teams underestimate.

## Synchronous integration
Exchange where the caller blocks until the other side answers. Every one of these is a coupling: when the other system is down or upgrading, so are you.

## Versioning
Publishing changes to an interface in a way that lets consumers move at their own pace. A stated deprecation notice period is worth more to a consumer than any amount of goodwill.

## Webhook
An outbound HTTP call a system makes when something happens, so consumers do not have to poll. Cheap, effective, and only as reliable as its retry policy.

# Packaged software

## Best of breed
An approach of choosing the strongest product for each function and integrating them. More capability per function, more integration to own, and the trade-off should be made once and deliberately rather than product by product.

## Brownfield
A programme that converts an existing system and its data into the new one rather than starting over. Cheaper and faster than greenfield, and it carries the old decisions forward whether you inspect them or not.

## Clean core
The discipline of keeping a packaged system close to standard so that vendor releases can be taken cheaply, with extensions living outside the upgrade path. Not a coding ban - it converts "no customization" into a design decision with [four available answers](/publications/clean-core-integration).

## Configuration
Changing a packaged system's behaviour through settings the vendor provided. Always the first thing to try, and a striking share of "impossible" requests turn out to be switched off rather than absent.

## Core modification
Changing vendor objects or the data model inside a packaged system. Not forbidden, but governed: a named approver, an expiry date, and [a count read aloud once a quarter](/publications/clean-core-integration), because a prohibition drives it underground.

## Customization
Any change to a packaged system beyond configuration. The word covers four very different things - in-app extension, side-by-side, modification, and localization - and treating them as one is how modification counts reach the hundreds.

## Fit-gap analysis
Comparing a standard process against how a unit works today and recording every difference. Its output should be a list with routes attached, because a gap with no route becomes an escalation.

## Greenfield
A programme that builds the new system fresh, with no data or configuration carried over. Clean, slow, and the only honest option when the existing configuration is the problem.

## Historic preference
A local requirement that exists because it has always existed, often because a system in an earlier decade could not do it another way. The largest of the three localization buckets, and the one that shrinks fastest when you [demonstrate the standard with the market's own data](/publications/clean-core-integration).

## In-app extension
Added fields and logic at [extension points the vendor anticipated](/publications/clean-core-integration), using released interfaces. Cheap, close to the data, upgrade-safe, and bounded by what the vendor imagined you might want.

## Localization layer
The place where statutory and regulatory variations live, [built once per requirement rather than once per market](/publications/clean-core-integration). Skipping it is how a legal requirement becomes twelve separately maintained copies.

## Packaged software
Software bought rather than built, configured to your needs. The trade is a worse fit in exchange for a supported product and somebody else's roadmap, and it is a good trade far more often than engineers like to admit.

## Rollout wave
A group of markets or units that go live together. Waves make multi-year programmes survivable: while one lands, the next is being designed and the last is in hypercare.

## Side-by-side extension
A service you own, in your own runtime, talking to the packaged core through published contracts. Where anything substantial belongs, and [the reason an upgrade stays a weekend](/publications/clean-core-integration).

## Statutory requirement
Something the law or a regulator requires, distinguishable from a preference by having [a source outside the person describing it](/publications/clean-core-integration). Smaller than everyone expects, and worth checking against the vendor's country versions before building anything.

## Template rollout
Deploying one agreed configuration across markets, adapting only where genuinely necessary. It works exactly as well as the honesty of the fit-gap triage that preceded it.

## Upgrade path
The route from your current version of a packaged system to the next one. [A programme that has never rehearsed an upgrade](/publications/clean-core-integration) does not know whether its core is clean; it knows whether its rules were followed, which is not the same thing.

## Vendor lock-in
The cost of leaving a supplier, measured in data extraction, retraining, and reintegration. Never zero, frequently acceptable, and always cheaper to negotiate down before signature than to complain about afterwards.

# Governance

## Anti-pattern
A recurring solution that looks reasonable and reliably causes harm. [Publishing them alongside patterns](/publications/architecture-patterns) is more effective than either alone, because people recognize their own work faster in a warning than in an ideal.

## Architecture board
The forum where decisions that cross domains get made and recorded. [Healthy ones decide few things, quickly, and publish](/publications/architecture-board-forum-system); unhealthy ones review everything and decide nothing.

## Architecture constraint
A must issued to a project, with a reason, a test, an owner, and an expiry. Not a requirement, because [requirements are things a project may trade away](/publications/every-project-needs-an-address) against cost and time, and it will.

## Architecture decision record (ADR)
A one-page record of a significant decision: the context, the drivers, the options considered, the choice, and its consequences. [The cheapest institutional memory an IT organization can buy](/publications/architecture-board-forum-system).

## Architecture governance
The set of forums, decision rights, and records through which architecture actually influences outcomes. Governance that arrives at the end is only ever a veto, and a veto is the least useful thing an architect can offer.

## Architecture principle
A short, opinionated rule that decides real trade-offs - "buy before build", "one core system per process step". If a principle has never made anyone unhappy in a review, [it is a poster, not a principle](/publications/architecture-principles).

## Architecture review board (ARB)
The governance body that checks planned work against the target landscape, standards, and principles. Healthy ones decide little, early, and fast; unhealthy ones become the department of no.

## Conformance
The state of a design actually following the standards and patterns it claimed to. Checked by a test somebody can run alone in five minutes, or it will not be checked at all.

## Conformance check
A specific verification performed at a defined moment, usually inside the definition of done. It belongs with [whoever already checks the definition of done](/publications/every-project-needs-an-address), never with an architect who has to remember.

## Consent decision-making
A method where a proposal passes unless someone raises a reasoned objection, rather than requiring active agreement from all. Slower to learn and faster to run than consensus, and [it works in rooms where nothing can be mandated](/publications/governing-without-a-mandate).

## Decision log
The numbered, searchable record of decisions taken, with dates and reasons. Its second use is the one nobody predicts: [mined for repetition](/publications/architecture-principles), it tells you exactly which principles you are missing.

## Design assurance
Engineer-level technical governance: solution and domain architects reviewing designs in progress, resolving issues before any formal gate. Where review actually improves things rather than judging them.

## Design authority
A body or role with the right to settle design questions within a scope. Works when the scope is narrow and the person is available; fails when it becomes a committee with a calendar.

## Design forum
A weekly, engineer-level session where design questions get resolved without ceremony. Most decisions should die here, and a practice where they do not has a bottleneck at the top.

## Design input
Context handed to a designer that shapes the solution without dictating it: the target architecture, the objects in scope, the pattern that already solves part of this. Its entire value is in [arriving before the first sketch](/publications/every-project-needs-an-address).

## Deviation
A design that knowingly departs from a standard or principle. Recorded with a reason and an expiry it is governance working; unrecorded it is governance that has stopped.

## Escalation
Moving a decision up when the current forum cannot settle it. Publish the triggers in advance, because an unpredictable escalation path teaches people to avoid the forum entirely.

## Exception
A registered, time-boxed permission to depart from a rule. The expiry date is the whole mechanism: without one, the exception becomes the new standard within eighteen months.

## Expiry date
The date on which an exception, a bridge, or a temporary arrangement must be reviewed. Thirty seconds to write, and the difference between a three-week dual-write window and a two-year one.

## Fast lane
The review route for pattern-conforming changes: declare conformity, get a spot-check, and silence within a fixed window means consent. Not a loophole - [the reward for standardization](/publications/two-gate-architecture-review).

## Gate
A checkpoint where work must show something specific before proceeding - a direction before design, a sound design before build. [Two well-placed gates outperform five badly placed ones](/publications/two-gate-architecture-review), every time.

## Golden rule
A non-negotiable design principle fixed for one process domain - "one position record drives everything". Local exceptions may vary; the golden rule survives all of them.

## Guardrail
A constraint that keeps teams safe at speed instead of stopping them for inspection - pre-approved patterns, platform defaults, paved roads. The more guardrails, the fewer gates you need.

## Mandate
A decision that becomes work in somebody's plan. Architecture mandates that do not turn into [a receiving team's key results](/publications/architecture-board-forum-system) are correspondence, not governance.

## Pattern
A reusable design decision for a recurring problem, [with its context, its costs, and its limits stated](/publications/architecture-patterns). If it cannot be wrong in some context, it is a principle; if compliance is a yes or no with no design left, it is a standard.

## Pattern library
The catalog of pre-approved ways to solve recurring design problems - the standard integration, the blessed stack, the reference deployment. Its thickness determines [how much of your governance can be a fast lane](/publications/architecture-patterns).

## Quality seal
A repository mechanism that marks a record as verified by its owner - and breaks visibly when the record changes or ages without review. [Broken seals trending down is a portfolio getting healthier](/publications/application-portfolio-data-quality).

## RACI
A matrix assigning who is responsible, accountable, consulted, and informed. Rarely remembered; four sentences about who can say no are remembered.

## Reference architecture
The worked-out target design for one recurring problem class - data platforms, omnichannel, integration - that individual projects instantiate instead of reinventing. Opinionated by design, or it decides nothing.

## Standard
A technology or pattern the organization has committed to, with an owner and a review date. An active standard shortens a hundred future discussions; an unmaintained one is nostalgia with authority.

## Steering committee
The senior forum that funds and prioritizes a programme. It decides money and sequence; if it is deciding designs, something below it has stopped working.

## Subsidiarity
The principle that decisions should be taken at the most local level capable of taking them, with higher levels handling only what the local level cannot. [The best architectural rule for a federation](/publications/governing-without-a-mandate), and one that predates computing by a long way.

## Two-gate review
A model with exactly two checkpoints - a direction check before design and a design check before build - with [an engineer-level forum underneath](/publications/two-gate-architecture-review). Enough governance to catch misfits, little enough that projects still show up.

## Visitor slot
A short, protected place on a governance agenda for someone who is not a member but is affected. It converts [the people most likely to route around the board](/publications/architecture-board-forum-system) into the people who asked to attend.

## Waiver
Formal permission to not comply, usually granted above the level that set the rule. Distinct from an exception in that a waiver rarely carries an expiry, which is precisely why it should.

# Delivery and change

## Baseline and target architecture
The landscape as it is today (baseline) and as it should look at a chosen horizon (target). Everything interesting happens in between - see transition architecture.

## Business case
The document that justifies spending money on a change. Architecture's contribution is the impact list with names on it, which is more persuasive than any qualitative paragraph about alignment.

## Change impact assessment
The structured comparison of a target design against one unit's current way of working: align on the design, identify the gaps, translate every gap into a named change topic. [Done with the local team, never to them](/publications/governing-without-a-mandate).

## Cutover
The moment a change goes from prepared to live. Rehearse it, write down who calls the rollback, and know exactly which system is authoritative during the window.

## Definition of done
The checklist a piece of work must satisfy before it counts as finished. The architect's favorite lever: [put "portfolio records updated" inside it](/publications/application-portfolio-data-quality), and data quality stops being a favor.

## Evaluation criteria
The published set of things a vendor or option is scored against, with weights and written anchors. [Anchors written after proposals arrive](/publications/every-project-needs-an-address) are not criteria, they are rationalizations.

## Go-live
The date a system starts being used for real work. Everything an architect wanted to influence had to be settled well before it, which is the whole argument for arriving early.

## Hypercare
The heightened support period immediately after go-live. It is also the last moment anyone will willingly update the repository, which is why the closure checklist belongs here rather than later.

## Impact assessment
The list of what a proposed change touches: applications, interfaces, objects, components, markets, and open exceptions. [A list with names on it beats a forty-page document](/publications/every-project-needs-an-address), and takes a fortieth of the effort.

## Intake
The point where a piece of work first becomes visible to the organization. [Add five fields here](/publications/every-project-needs-an-address) and architecture arrives early for free; miss it and you arrive after the contract.

## Key result
A measurable outcome that shows an objective is being met. Architecture mandates land here, in the receiving team's plan, or they do not land at all.

## Migration
Moving data, users, or workload from one system to another. The estimate is always wrong in the same direction, and the reason is almost always the data rather than the code.

## Minimum viable product
The smallest version of something that produces real learning in real use. Frequently used as a synonym for "phase one of a fixed plan", which is not the same thing and does not produce learning.

## Objectives and key results (OKR)
A goal-setting method pairing a qualitative objective with measurable results. Useful to architecture mainly as the place where a board decision becomes somebody's quarter.

## Pilot
A limited live deployment used to test an approach before wider rollout. A pilot with no defined stop criteria is just an early wave with better public relations.

## Portfolio (investment)
The set of projects and programmes an organization has chosen to fund. Distinct from the application portfolio, and the two are argued about in different rooms by different people, which is a recurring source of confusion.

## Programme
A coordinated set of projects pursuing one outcome. Programmes exist to manage dependencies; when they exist mainly to manage reporting, delivery slows and nobody can say why.

## Project management office (PMO)
The function that runs the delivery lifecycle, its gates, and its reporting. Architecture should [attach to what the PMO already runs](/publications/every-project-needs-an-address) rather than build a parallel process, and should let the PMO own enforcement.

## Proof of concept
A time-boxed experiment answering one specific technical question. If it cannot be thrown away, it was not a proof of concept, it was the first release.

## Quick win
A change that can start now, with no dependency on a rollout or a restructuring. Quick wins buy the credibility that roadmap items spend.

## Request for information (RFI)
An early market survey to understand what is available before defining requirements. Cheap, underused, and the right moment to learn that the category you assumed exists does not.

## Request for proposal (RFP)
The formal document inviting vendors to bid. On the buy path this is [the last moment architecture has real leverage](/publications/every-project-needs-an-address), which is why involvement after the shortlist is a recovery exercise rather than a review.

## Roadmap
The sequenced plan that turns a target architecture into waves of funded, owned work. Every item carries an owner, a dependency, and a value statement - a target without a date is a wish.

## Rollback
The prepared route back to the previous state if a change fails. A rollback that has never been tested is a paragraph, not a plan.

## Service level agreement (SLA)
A committed level of service with consequences attached. Without the consequences it is a target, and targets are what get missed quietly.

## Stage gate
A decision point in the delivery lifecycle where a project must show something to continue. Architecture adds a field, a reviewer, or an exit condition to these, never a gate of its own.

## Statement of work
The document defining what a supplier will deliver, by when, and for how much. Anything promised during evaluation and not written here did not happen.

## Transition architecture
A deliberate intermediate state between baseline and target - the bridge you operate while a program lands. Flagging systems as transition states keeps churn from being mistaken for bad data.

## Vendor selection
The process of choosing a supplier against published criteria. Architecture criteria at ten per cent of the total score are a rounding error with a seat at the table; [one mandatory criterion is worth more than five points of weight](/publications/every-project-needs-an-address).

## Wave
One planned slice of a rollout or transformation - a set of domains, markets, or systems moved together. [Waves make multi-year change survivable](/publications/first-twelve-quarters): while one wave lands, the next is being designed.

# Technology and security

## Audit trail
The immutable record of who did what and when. Cheap to add at design time, impossible to reconstruct afterwards, and always wanted urgently.

## Availability zone
An isolated failure domain within a cloud region. Spreading across them protects against a data centre failure and not against a bad deployment, which is the failure you are more likely to have.

## Cloud native
Designed to run on cloud infrastructure and to use its elasticity, managed services, and failure model. A meaningful engineering stance and a marketing word, and telling which one you are hearing takes about two questions.

## Container
A packaged unit of software with its dependencies, runnable anywhere the runtime exists. It solved the works-on-my-machine problem and created a fleet-management problem, which most organizations consider a good trade.

## Disaster recovery
The plan and capability for restoring service after a major failure. Its value is entirely in whether it has been tested this year, not in whether it has been written.

## Encryption at rest
Protecting stored data so it is unreadable without a key. Widely mandated, widely enabled, and worth checking whether it also covers backups, which is where it is most often forgotten.

## Encryption in transit
Protecting data as it moves between systems. Standard for external traffic and still surprisingly optional on internal flows, which is where a lot of quiet exposure lives.

## High availability
Designing so that a component failure does not take the service down. Costs roughly what people expect; the surprise is the operational complexity, not the infrastructure bill.

## Hybrid cloud
Running workloads across both owned infrastructure and public cloud. Usually the honest description of where an enterprise actually is rather than a strategy anyone chose.

## Identity and access management (IAM)
The systems and processes controlling who is who and what they may do. The one platform decision that touches every application, which is why it deserves an architect's attention early.

## Infrastructure as a service (IaaS)
Renting compute, storage, and networking rather than owning it. You still operate everything above the hypervisor, which is the part people forget when comparing costs.

## Least privilege
Granting the minimum access needed to do the job. Easy to state, hard to sustain, and the entropy runs one direction unless somebody reviews entitlements on a schedule.

## Logging
Recording what a system did, in a form somebody can search later. Frequently treated as disproportionate for small internal flows, right up until the audit that needs exactly those flows.

## Microservice
A small, independently deployable service owning one capability. Buys team autonomy at the cost of operational and integration complexity, and it is a poor first move for an organization that has not yet mastered either.

## Modular monolith
A single deployable application with strictly enforced internal boundaries. Most of the design benefit of microservices with a fraction of the operational cost, and an unfashionable answer that is often the right one.

## Monolith
A single deployable application containing most of a system's functionality. Not a slur: a well-structured monolith outperforms a badly split set of services on almost every dimension that matters.

## Monitoring
Watching known signals to tell whether a system is healthy. Distinct from observability, which is about answering questions you did not anticipate.

## Multi-cloud
Using more than one cloud provider. Sometimes a deliberate resilience or negotiation strategy, more often the accumulated result of independent decisions nobody has reconciled.

## Multi-tenancy
One instance of software serving several customers or units with logical separation. Cheaper to run and unforgiving of isolation bugs, which is why the model should be an explicit decision rather than an implementation detail.

## Observability
The ability to understand a system's internal state from what it emits - logs, metrics, traces. The property that decides whether an incident takes twenty minutes or a weekend.

## Penetration test
An authorized attempt to break into a system to find weaknesses. Its value depends entirely on whether the findings get fixed, and the fix rate is the number worth reporting.

## Platform
Shared capability offered to internal teams as a service: compute, identity, integration, data. A platform nobody chose to use is an internal monopoly, and it will be judged like one.

## Platform as a service (PaaS)
A managed environment for running applications without operating the underlying infrastructure. Faster to start, with constraints that only become apparent once you need something the platform did not anticipate.

## Recovery point objective (RPO)
The maximum data loss acceptable, expressed as a period of time. Argue about this number before the incident, because during one everybody wants zero.

## Recovery time objective (RTO)
The maximum acceptable time to restore service after a failure. Frequently stated aspirationally in a policy and never tested against the architecture that has to deliver it.

## Refactoring
Improving the internal structure of code or a system without changing what it does. Continuous refactoring is maintenance; deferred refactoring becomes a project with a business case nobody wants to write.

## Region
A geographic location where a cloud provider runs infrastructure. The unit that data residency requirements are actually expressed in, which is why the object-to-component link is worth keeping.

## Role-based access control (RBAC)
Granting permissions to roles and assigning people to roles. Scales far better than per-person grants, and degrades over years as roles accumulate permissions nobody removes.

## Segregation of duties
Splitting a sensitive process so no single person can complete it alone. A control that architecture has to design for rather than bolt on, because it constrains workflow rather than just access.

## Single sign-on (SSO)
One authentication that grants access to many systems. The highest-value integration most organizations can do for user experience and for security at the same time.

## Software as a service (SaaS)
Software operated by the vendor and consumed as a subscription. It removes the operations problem and sharpens every other one: integration, data residency, exit, and the fact that the roadmap is no longer yours.

## Strangler fig
A migration pattern where new functionality is built around a legacy system until the old one can be removed. It works, and it only finishes if somebody keeps a list of what is left and a date against it.

## Technical debt
The accumulated cost of past shortcuts: systems kept alive too long, integrations built twice, documentation that lives in one person's head. Like financial debt, survivable when visible and serviced - fatal when denied.

## Threat model
A structured look at what could go wrong, who would want it to, and what would stop them. An hour of it at design time is worth more than any amount of scanning afterwards.

## Tracing
Following a single request across the services it touches. The mechanism that makes distributed systems debuggable, and the thing teams wish they had added before the first bad incident.

## Zero trust
A security model that assumes no network location is inherently trusted and verifies every request. Sound as a direction and frequently sold as a product, which are two different purchases.
