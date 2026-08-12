---
title: Walk the landscape first - due diligence before you transform anything
summary: Phase one of any serious transformation is finding out what the company actually runs. How to build the initial capability map, collect applications and IT components market by market, and read the pile once you have it - without the result dying as a PDF.
date: 2025-01-13
time: 10:30
updated: 2026-05-12
cover: /images/pub/landscape-due-diligence/cover-v2.png
status: published
---

Every transformation program starts with a confident picture of the target and an embarrassed silence about the starting point. The roadmap slide is beautiful. Then someone asks what the company actually runs today, in all its markets, and the honest answer is: it depends who you ask. Central IT has a list. Each country has a longer one. Neither list mentions the spreadsheet that has quietly run promotion pricing in one market since 2014.

I have come to think of this first phase as walking the landscape - a due diligence you conduct on your own company, market by market, before anyone is allowed to draw arrows toward a target architecture.

*You cannot plan a rollout across a landscape nobody has ever counted.*

The setup I am describing is a composite of my own missions: multi-country organizations, several hundred applications spread across markets that grew by acquisition and local initiative, a transformation program waiting on the result. Details blurred, as always.

## A capability map before a single application

The temptation is to start collecting immediately - send a spreadsheet to every country, ask for "all your applications", merge the answers. Resist it. The first deliverable is not a list of systems; it is a business capability map, drawn at a deliberately coarse level and signed off by the business before collection starts.

The map is the questionnaire. When you walk into a workshop and ask "what do you run?", you get chaos in whatever order people remember it. When you ask "how do you do assortment planning here, and with what?", every answer lands in a defined place. Gaps become visible as gaps - a capability with no tooling at all is a finding, and so is a capability served by five different tools in five markets.

Two levels of depth are enough. I have watched capability modeling absorb a whole quarter because the map wanted to be an ontology; meanwhile the collection it was supposed to enable never started. Keep it coarse, get the business to agree it describes their world, and move.

## Go there in person

Collection by survey alone does not work. I say this with the certainty of someone who has read the survey answers. The granularity comes back wrong, entire categories return "we use nothing for that" - which is almost never true - and the tools that matter most, the local ones nobody considers official, stay invisible.

What works is a workshop per market with both IT and business in the room, walking the capability map together. (In a federation of autonomous units, where nothing can be mandated, this stops being good practice and becomes [the whole operating model](/publications/governing-without-a-mandate).) The business user is the one who names the tool that actually gets used; the IT colleague is the one who knows what it runs on and what it talks to. You need both, and you need them contradicting each other live - that contradiction is data. Travelling to the markets costs real time and money, and it pays for itself twice: once in inventory quality, and once because the workshop is the first time most of these teams meet the architecture function as help rather than as an audit.

## Count generously, classify strictly - later

During collection, accept everything: platforms, software applications, microservices, critical add-ons, the spreadsheet that behaves like a system. If you open a definition debate in the workshop - "is that really an application?" - momentum dies, and people learn to stop mentioning borderline things. Write it all down.

The strict sorting comes afterwards, at the desk, where the [application-versus-component line](/publications/application-portfolio-data-quality) gets applied calmly. The pile shrinks into a proper inventory: applications on top, IT components attached underneath, each with a named owner. Nothing collected is wasted; it just finds its level.

> An inventory built only from what headquarters knows about is a map of the official roads. The business knows the shortcuts.

## Reading the pile

Once the collection exists, pick a reference baseline - in practice, the stack of your largest or most standardized cluster - and measure every market's overlap against it. The baseline is somewhat arbitrary and you should say so out loud; it is a ruler, not a verdict.

![Reading the collection: markets measured against a reference stack, with three kinds of findings called out - duplicates, local gems, and legally local exceptions](/images/pub/landscape-due-diligence/reading-the-pile-v1.png)

Three kinds of findings come out of this reading, and they deserve different treatment. Duplicates are the obvious ones: five survey tools, three planogram solutions, or a capability where every market bought its own answer. These become harmonization candidates. Local gems are the happy surprise: one market built or bought something the whole group should have - I have seen a local store-marketing tool discovered this way end up on the global roadmap. Due diligence is also shopping in your own house. And then there are the legally local: payroll, some HR administration, anything pinned down by national regulation. Leave them alone - but write down *why* they are exempt, or the next transformation program will rediscover them the hard way. That distinction between what the law requires and what a market simply prefers is the same [triage](/publications/clean-core-integration) that decides how much of a packaged core ends up modified.

The fourth finding is the uncomfortable one: capabilities with no tooling anywhere. Those tend to be the quiet reason the transformation was needed in the first place.

## Write it into something that lives

Here is the mistake I made the first time, so you do not have to: I treated the report as the deliverable. It was a good report. Six months later it described a landscape that no longer existed, and the next program started counting from zero again.

Document during collection, not after - every application into the repository with its owner, its capability, and its lifecycle state the same week the workshop happens. Then hook the inventory into an operating loop so that go-lives, retirements, and ownership changes keep it current. The inventory is the deliverable. The report is a by-product you can regenerate any morning.

## From findings to roadmap

The last move is the one that makes the whole exercise worth the plane tickets: harmonization candidates go to a decision forum for an explicit yes or no, and the approved ones get absorbed into the receiving teams' quarterly objectives - not parked in a parallel program that has to fight for the same people. And do not propose fifty harmonizations. Propose the first eight, sequenced, with owners. The other forty-two will still be there next quarter, and by then you will have credibility instead of a backlog.

![The first pass, in seven moves: scope the capability map, collect in workshops, analyze, evaluate, document into the repository, approve, absorb into team objectives](/images/pub/landscape-due-diligence/first-pass-v1.png)

If you are doing this as the only architect in a young function, this walk is your first quarter - and [the twelve-quarter build](/publications/first-twelve-quarters) puts it in sequence with everything that should follow it.

The walk is worth it even beyond the inventory. You meet the people who actually run the place. You learn where the shortcuts are and which official system is a facade. And for a brief moment, the whole organization can point at one picture and agree that it is true. Do not spend that moment on a PDF.
