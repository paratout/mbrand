import { Component, OnInit, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { SiteHeaderComponent } from '../../shared/components/site-header/site-header.component';
import { SiteFooterComponent } from '../../shared/components/site-footer/site-footer.component';

interface Read {
  slug: string;
  label: string;
}

interface Talk {
  title: string;
  sub: string;
  text: string;
  formats: string;
  reads: Read[];
}

interface Track {
  index: string;
  name: string;
  framing: string;
  talks: Talk[];
}

interface Format {
  name: string;
  length: string;
  audience: string;
  text: string;
}

@Component({
  selector: 'app-speaking',
  imports: [RouterLink, SiteHeaderComponent, SiteFooterComponent],
  templateUrl: './speaking.component.html',
  styleUrl: './speaking.component.scss',
})
export class SpeakingComponent implements OnInit {
  /* Live counts, so the page never goes stale as the archive grows. */
  readonly articleCount = signal<number | null>(null);
  readonly toolCount = signal<number | null>(null);
  readonly termCount = signal<number | null>(null);

  readonly areas = [
    'Portfolio and inventory',
    'Business capability',
    'Data and objects',
    'Integration',
    'Packaged ERP',
    'Principles and patterns',
    'Governance and forums',
    'Delivery and procurement',
    'Federated operating models',
    'Building the function',
  ];

  readonly tracks: Track[] = [
    {
      index: '01',
      name: 'Seeing the landscape',
      framing: 'You cannot plan a transformation across a landscape nobody has ever counted.',
      talks: [
        {
          title: 'You have no mandate, only an invitation',
          sub: 'The first ninety days when architecture is a greenfield',
          text: 'Somebody added you to a project board and nothing else exists - no principles, no object model, no catalogue, no forum. Why you follow the work in flight rather than mapping the estate, the six phases with the output of each, the integration conversation that hands you an inventory for free, what as-is, target, reference and transition each mean and which you actually need in month two, and how to be in a room you have no authority in.',
          formats: 'Talk 45 min, or a working session for a new or single-architect function',
          reads: [
            { slug: 'joining-as-the-first-architect', label: 'You have no mandate, only an invitation' },
          ],
        },
        {
          title: 'Walk the landscape first',
          sub: 'Due diligence on your own company, market by market',
          text: 'Why the capability map comes before the application list, why collection by survey fails, and how to run the workshops that surface the tools nobody considers official. Includes reading the pile afterwards: duplicates, local gems, and the exceptions that are genuinely legal.',
          formats: 'Talk 45 min, or a workshop that produces your first collection format',
          reads: [
            { slug: 'landscape-due-diligence', label: 'Walk the landscape first' },
            { slug: 'application-vs-it-component', label: 'Application or IT component' },
          ],
        },
        {
          title: 'You do not need a tool in year one',
          sub: 'A repository that fits in a spreadsheet, and behaves like one anyway',
          text: 'The seven sheets, the flat link table, stable IDs, and the policies that make a spreadsheet act like a repository - plus the honest signals that tell you when it is finally time to buy something.',
          formats: 'Talk 30-45 min, or a half-day setup session',
          reads: [{ slug: 'architecture-without-a-tool', label: 'Architecture without a tool' }],
        },
        {
          title: 'Keep the map honest',
          sub: 'Portfolio data quality that survives contact with reality',
          text: 'Why inventories rot, the trigger-and-cadence loop that stops it, the six checks worth running, and the monthly report that turns findings into assigned work rather than a newsletter nobody reads.',
          formats: 'Talk 30-45 min, or half-day working session',
          reads: [
            { slug: 'application-portfolio-data-quality', label: 'Keeping the portfolio true' },
            { slug: 'portfolio-quality-report', label: 'The monthly quality report' },
          ],
        },
      ],
    },
    {
      index: '02',
      name: 'Deciding with it',
      framing: 'An inventory that never settles an argument is an expensive filing cabinet.',
      talks: [
        {
          title: 'Two ratings, two different questions',
          sub: 'Business fit and technical fit, and why blending them hides the problem',
          text: 'An application can be the wrong answer implemented beautifully. Who rates what, on which scale, what the four levels actually mean, and what two honest ratings buy you at portfolio level.',
          formats: 'Talk 30 min, or a rating calibration workshop',
          reads: [{ slug: 'business-fit-technical-fit', label: 'Business fit and technical fit' }],
        },
        {
          title: 'Principles that could have gone the other way',
          sub: 'Deriving a set that decides arguments instead of decorating a wall',
          text: 'Why "data is an asset" has never resolved a disagreement, the falsifiability test, the five places real principles come from, and the X-over-Y form that makes the trade-off explicit. Then how patterns turn principles into something an engineer can pick up on a Tuesday.',
          formats: 'Talk 45 min, or a derivation workshop that leaves you with candidates',
          reads: [
            { slug: 'architecture-principles', label: 'Principles that could have gone the other way' },
            { slug: 'architecture-patterns', label: 'A pattern is a decision you only make once' },
          ],
        },
        {
          title: 'Governance that enables',
          sub: 'Two gates, a forum underneath, and a fast lane',
          text: 'How to run architecture governance that delivery teams describe as the fastest route to a good answer, and how to stand up the board around it: who sits there, who visits, what flows in and out, and how mandates become somebody else\'s key results rather than architecture correspondence.',
          formats: 'Talk 45 min, leadership briefing, or a board design session',
          reads: [
            { slug: 'two-gate-architecture-review', label: 'The two-gate architecture review' },
            { slug: 'architecture-board-forum-system', label: 'An architecture board people do not route around' },
          ],
        },
      ],
    },
    {
      index: '03',
      name: 'Designing the target',
      framing: 'The technical calls that decide whether the next five years are cheap or expensive.',
      talks: [
        {
          title: 'Domain blueprinting',
          sub: 'Redesigning a company one process domain at a time',
          text: 'Cutting an organization into end-to-end domains, then taking each one from process design through IT mapping and change assessment to a sequenced roadmap. With the workshop formats, the behavioural rules that make them work, and a full worked domain.',
          formats: 'Talk 45 min, workshop half-day to full day',
          reads: [{ slug: 'domain-blueprinting', label: 'Domain blueprinting' }],
        },
        {
          title: 'Clean core is not a coding ban',
          sub: 'Integration discipline for packaged ERP landscapes',
          text: 'What clean core actually means once you stop reading it as "no customization": the four places work can go, six integration rules, how to triage what a market genuinely needs against what it merely prefers, and how to hold edge cases in a register with expiry dates instead of in the core.',
          formats: 'Talk 45 min, or a programme working session',
          reads: [{ slug: 'clean-core-integration', label: 'Clean core is an integration discipline' }],
        },
        {
          title: 'A data strategy is a slide until it becomes a factsheet',
          sub: 'The five decisions, the object model, and the four joins',
          text: 'Turning a data strategy into records the repository can hold: which objects matter, who masters each one, what they mean, and the joins to capabilities, applications, components and interfaces that make impact analysis a query rather than a working group.',
          formats: 'Talk 45 min, or a mastership working session',
          reads: [{ slug: 'data-strategy-object-model', label: 'A data strategy is a slide until it becomes a factsheet' }],
        },
      ],
    },
    {
      index: '04',
      name: 'Making it stick',
      framing: 'Governance that arrives at the end is only ever a veto, and a veto is the least useful thing an architect can offer.',
      talks: [
        {
          title: 'Give every project an address',
          sub: 'Domains, intake, and the impact cascade',
          text: 'How work reaches architecture early and cheaply: defining domains that survive a reorganization, five fields on the intake form the PMO already uses, and a cascade that produces a named impact list in an hour. Plus where the build path and the buy path stop resembling each other.',
          formats: 'Talk 45 min, or a joint session with the PMO and procurement',
          reads: [{ slug: 'every-project-needs-an-address', label: 'Give every project an address' }],
        },
        {
          title: 'When nobody has to say yes',
          sub: 'Architecture in a federation, where adoption is voluntary',
          text: 'What changes when nothing can be mandated: reading local constraints honestly, designing a core thin enough to be accepted, writing a proposal that survives a consent-based room, and measuring adoption when compliance is not available. Most instincts from a corporate group are inverted here.',
          formats: 'Talk 45 min, leadership briefing, or a proposal clinic',
          reads: [{ slug: 'governing-without-a-mandate', label: 'When nobody has to say yes' }],
        },
        {
          title: 'The decision you did not write down',
          sub: 'Records, registers, and the memory of why',
          text: 'Why decision records are not only for design choices, the six kinds that exist under different names and the clock that decides where each is filed, and six worked records from a classification call to a deliberate deferral. Then what changes downstream: reviews that cite instead of re-arguing, and a procurement trail that protects the buyer.',
          formats: 'Talk 45 min, or a working session on your own registers',
          reads: [{ slug: 'decision-records', label: 'The decision you did not write down will be made again' }],
        },
        {
          title: 'Year one, you are the function',
          sub: 'From a single architect to an independent practice, quarter by quarter',
          text: 'Twelve quarters from a greenfield start: what to ship each quarter, which forum to open when, how to federate before you hire, how the money moves from somebody else\'s budget to your own, and the signals that say slow down.',
          formats: 'Talk 45 min, leadership briefing, or a practice design session',
          reads: [{ slug: 'first-twelve-quarters', label: 'Year one, you are the function' }],
        },
      ],
    },
  ];

  readonly formats: Format[] = [
    {
      name: 'Conference talk',
      length: '30 to 45 minutes',
      audience: 'Mixed practitioner audience',
      text: 'One topic, worked examples, and the failure modes. No vendor content and no maturity curves.',
    },
    {
      name: 'Leadership briefing',
      length: '60 to 90 minutes',
      audience: 'Executives and sponsors',
      text: 'The decisions rather than the mechanics: what it costs, what it prevents, and what has to be true for it to work here.',
    },
    {
      name: 'Hands-on workshop',
      length: 'Half day to full day',
      audience: 'Architects and delivery leads',
      text: 'Your landscape, your objects, your constraints. Teams leave with a filled-in artifact rather than notes.',
    },
    {
      name: 'Internal architecture day',
      length: 'One day',
      audience: 'A whole architecture practice',
      text: 'Two or three sessions plus working time, sequenced so the afternoon uses what the morning produced.',
    },
    {
      name: 'A series',
      length: 'Four to six sessions over a quarter',
      audience: 'A team building the practice',
      text: 'The arc above, in order, with work between sessions. This is where the material was designed to land.',
    },
  ];

  constructor() {
    inject(Title).setTitle('Speaking - Mehdi Bamou');
    inject(Meta).updateTag({
      name: 'description',
      content:
        'Talks and workshops on enterprise architecture: portfolio and inventory, data and integration, packaged ERP, principles and governance, delivery, federated operating models, and building the function. Practitioner material, in English, French, or Arabic.',
    });
  }

  ngOnInit(): void {
    fetch('/content/publications.json')
      .then((r) => (r.ok ? r.json() : []))
      .then((p: unknown[]) => this.articleCount.set(Array.isArray(p) ? p.length : null))
      .catch(() => {});

    fetch('/content/library.json')
      .then((r) => (r.ok ? r.json() : []))
      .then((items: { category?: string }[]) =>
        this.toolCount.set(Array.isArray(items) ? items.filter((i) => i.category === 'tool').length : null)
      )
      .catch(() => {});

    fetch('/content/glossary.json')
      .then((r) => (r.ok ? r.json() : null))
      .then((g: { terms?: unknown[] } | unknown[]) => {
        const terms = Array.isArray(g) ? g : g?.terms;
        this.termCount.set(Array.isArray(terms) ? terms.length : null);
      })
      .catch(() => {});
  }
}
