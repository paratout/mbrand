---
title: Principles that could have gone the other way
summary: Why framework principles like "data is an asset" change nothing, and how to derive a set that actually decides arguments - the falsifiability test, the five places real principles come from, the "X over Y" form that makes trade-offs explicit, three worked sets for three different organizations, and how to keep them alive without turning them into compliance. With a derivation workshop and a principle register.
date: 2025-08-25
time: 08:35
updated: 2026-08-04
cover: /images/pub/architecture-principles/cover-v1.png
status: published
---

Every architecture practice I have joined had a principles page. Most of them said some version of the same six things: data is an asset, buy before build, reuse before both, security by design, business continuity matters, and technology should be fit for purpose. Everyone had approved them. Nobody had ever cited one in an argument.

The tell was always the same. When I asked what decision the principle had changed, the room would think about it, and then someone would offer an example that would have gone the same way regardless.

*A principle that cannot lose an argument is not a principle. It is a slogan with governance.*

The problem is not that framework principles are wrong. "Data is an asset" is true. It is that a statement nobody could ever disagree with cannot resolve a disagreement, and resolving disagreements is the entire job of a principle. What follows is how I now derive them - from the organization rather than from a book - composited from my own missions, with the examples deliberately drawn from different kinds of organization to show how much the context changes the answer.

## The test: could it have gone the other way?

One question separates a principle from a poster.

**Name a real decision from the last year where this principle would have forced the less comfortable option.** If you cannot, delete it. Not because the sentiment is wrong, but because the sentiment is already shared, and shared sentiments do not need governance.

![What separates a principle from a slogan - the falsifiability test applied to a framework principle and a rooted one, side by side](/images/pub/architecture-principles/slogan-test-v1.png)

Applied to "data is an asset": what does it forbid? Nothing, in practice. Every team already believes their data matters. Applied to something like *we accept slower delivery in exchange for one system of record per data object* - now you have a statement with victims. It forbids the fast local database that would have shipped the campaign three weeks earlier. Someone will lose an argument because of it, and that is exactly what makes it worth writing down.

A second test, less obvious but just as useful: **does the opposite sound insane, or merely different?** "We prefer secure systems" fails - the opposite is absurd. "We prefer buying with configuration over building, even where building would fit better" passes, because plenty of good organizations do the opposite deliberately.

## Where real principles come from

Not from a framework, and not from a workshop that starts with a blank flipchart and the word "principles" at the top. They are extracted from evidence the organization has already produced.

![Five sources of rooted principles - the strategy, the decision log, the incidents, the constraints, and the honest list of what the organization is bad at](/images/pub/architecture-principles/sources-v1.png)

**The strategy, read literally.** Not the vision statement - the operational commitments. A company promising to open in new markets fast has a very different principle set from one promising the lowest cost per transaction. If the strategy says growth by acquisition, then something like *every capability is designed to absorb an acquired unit within two quarters* writes itself, and it will decide dozens of arguments about coupling.

**The decision log, mined for repetition.** The same argument arriving three times is a missing principle. This is the highest-yield source and the reason a [numbered decision log](/publications/architecture-board-forum-system) pays off in ways nobody predicts. Go through a year of decisions and mark the ones that took disproportionate time; the pattern underneath them is your candidate.

**The incidents.** What broke, and what the post-mortem said would prevent it. Organizations rarely convert incident findings into standing rules, and it is nearly free to do so - the evidence is already gathered and the pain is remembered.

**The constraints.** [Local, legal, financial, structural](/publications/governing-without-a-mandate). An organization where nothing can be mandated needs principles about optionality and reversibility that a corporate group would find strange. One in a regulated sector needs principles that name the regulator's expectations explicitly.

**What the organization is honestly bad at.** This is the uncomfortable one, and it produces the most useful principles. A place that consistently under-invests in operations needs a principle about run cost that a naturally operations-minded company would never bother writing. Principles are prosthetics for organizational weaknesses, which is why copying another company's set is worse than useless - you inherit their prosthetics for your own limbs.

## The form that makes a principle decide things

Once you have candidates, the wording does most of the remaining work. Two moves matter more than any others.

**Write it as a trade-off: X over Y.** The framework habit of writing principles as virtues ("we value X") loses the information that makes them usable. Real principles express priority between two things that are both good. *Standard processes over local optimization. Reversibility over efficiency. One system of record over speed of delivery. Boring technology over capability.* Each of these tells you what to give up, which is the only reason anyone consults a principle in the first place.

**Add the exception route in the principle itself.** A principle with no legitimate exception path gets violated silently. One that says how to deviate - and where the deviation gets recorded, and with what expiry - gets followed, because compliance is no longer a binary that makes people liars.

![The anatomy of a principle - the seven parts with a worked example, and the two questions that get asked when someone invokes it](/images/pub/architecture-principles/anatomy-v1.png)

The parts I keep: the **statement** in X-over-Y form; the **rationale** written for *this* organization, naming the specific thing that went wrong or the specific commitment being served; the **implications**, which are the costs you are accepting, stated plainly; the **test**, meaning how an architect can tell in five minutes whether a design honours it; the **exception route** with its expiry; the **owner**; and - my favourite, and the part that keeps principles honest - **the decision it would have changed**, naming a real past case.

That last field does something quietly powerful: it makes it impossible to publish a principle nobody needed, because the field cannot be filled in for a slogan.

## Three organizations, the same topic, three answers

To show how much the context does, here is one topic - data ownership and integration - resolved three ways.

![The same topic in three organizations - fast-growing greenfield, federated with no mandate, and cost-pressed regulated - and how each context produces a different principle](/images/pub/architecture-principles/three-orgs-v1.png)

**A fast-growing company building its landscape from scratch** needs speed and will pay for it later unless something stops the worst of it. *One system of record per object, even when a second copy would ship faster.* Rationale: three of last year's four data incidents came from two systems believing they owned the same object. Implication: some projects will wait for the owning system to expose what they need. Exception: a read-only cache with a named expiry.

**A federation of autonomous units** cannot mandate anything, so a principle about single ownership would be unenforceable theatre. Instead: *shared definitions over shared systems.* Rationale: units will never adopt a common platform, but they will agree on what a term means if the definition costs them nothing. Implication: central invests in the definitions and the exchange contract, not in convergence programmes. Exception: none needed - it is an offer, not a constraint.

**A cost-pressed regulated organization** cares about audit trail and predictability more than either. *Traceable over convenient.* Rationale: two years ago an audit finding cost more than the entire integration budget. Implication: every interface logs, and the logging is not optional even for small internal flows. Exception: signed off by the compliance lead, not by architecture.

Same subject. Three principles that would each be actively unhelpful in the wrong one of the three organizations. That is what "rooted" means - and it is why a principle set inherited from a framework tends to be true, agreed, and inert.

## How many, and who writes them

**Five to seven.** Fewer than five and you have not covered the recurring arguments; more than seven and nobody can recall them without the page open, which means they will not be used in the moments that matter - a design conversation, a vendor pitch, a corridor.

**Written by the architect, tested with the people who will lose arguments because of them.** The derivation is analytical work: mine the sources, draft candidates, test each against real past decisions. The socialization is the part that decides whether they survive, and it needs the people whose lives get harder. If nobody flinches when you present the implications, the implications are not real and you should look again.

**Approved once, in public, by the body that will be expected to uphold them** - and then cited. A principle's authority comes almost entirely from being used in decisions, not from having been approved. The first three times you cite one in a decision record, you are establishing whether they are real.

## Keeping them alive

**Cite them in decision records, by name.** "This follows P-03, standard processes over local optimization" - and, more importantly, "this deviates from P-03 for the following reason, with a review in twelve months". A principle whose violations are recorded is a principle that is working.

**Let them be used against you.** The moment a delivery team invokes a principle to push back on an architecture request, the set has become real. This will feel uncomfortable and it is the best day of the practice's year.

**Review annually, retire deliberately.** A principle can win. When the behaviour it was correcting has become normal, retiring it is not defeat - it is the point. I have retired one for exactly that reason and it was the most convincing evidence I have ever had that the set was doing work.

**Watch for two decay patterns.** The first is inflation: principles quietly acquiring sub-clauses until they read like standards. The second is drift into virtue: someone softens *standard processes over local optimization* into *we value standardization and local responsiveness*, and the trade-off - the entire content - is gone. Both happen during rewrites by people trying to be helpful, and both are caught by rereading the set aloud once a year and asking the falsifiability question again.

## What I would do this week

If you have an inherited set that nobody cites: keep the page, and add one column - *the decision this changed*. Fill it in for last year's decisions. Whatever you cannot fill in, you now know about, and you can retire it quietly at the next review rather than fighting about it.

If you are starting fresh: do not run a principles workshop yet. Spend two hours reading a year of decisions and incidents, write four or five candidate trade-offs in X-over-Y form, and take them to the three people most likely to object. The workshop, if you still need one, will take forty minutes instead of a day, and it will produce something with teeth.

The two files in the [library](/library) are the derivation workshop with the source-mining questions and the candidate-testing script, and a principle register that holds the set with its implications, tests, exceptions, and the citation count that tells you which ones are actually being used.

A good principle set is short, slightly uncomfortable, specific enough that another organization would find it strange, and used often enough that people quote it at each other without opening the page. Anything else is a poster, and posters have never resolved an argument in the history of this profession.
