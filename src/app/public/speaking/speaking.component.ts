import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { SiteHeaderComponent } from '../../shared/components/site-header/site-header.component';
import { SiteFooterComponent } from '../../shared/components/site-footer/site-footer.component';

@Component({
  selector: 'app-speaking',
  imports: [RouterLink, SiteHeaderComponent, SiteFooterComponent],
  templateUrl: './speaking.component.html',
  styleUrl: './speaking.component.scss',
})
export class SpeakingComponent {
  readonly topics = [
    {
      index: '01',
      title: 'Keep the map honest',
      sub: 'Application portfolio data quality that survives contact with reality',
      text: 'Why portfolio inventories rot, the operating loop that stops it, and the KPIs that make quality steerable - drawn from running this on portfolios of several hundred systems.',
      formats: 'Talk 30-45 min, or half-day working session',
      related: 'application-portfolio-data-quality',
    },
    {
      index: '02',
      title: 'Domain Blueprinting',
      sub: 'Redesigning a company one process at a time',
      text: 'How to cut an organization into end-to-end process domains and take each from process design to IT architecture to an executable roadmap - with the workshop formats that make it real.',
      formats: 'Talk 45 min, workshop half-day to full day',
      related: 'domain-blueprinting',
    },
    {
      index: '03',
      title: 'Governance that enables',
      sub: 'The two-gate architecture review',
      text: 'How to run architecture governance that delivery teams describe as the fastest way to a good answer: two light gates, an engineer-level forum, a fast lane, and decisions in writing.',
      formats: 'Talk 30-45 min, or leadership briefing',
      related: 'two-gate-architecture-review',
    },
  ];

  constructor() {
    inject(Title).setTitle('Speaking - Mehdi Bamou');
    inject(Meta).updateTag({
      name: 'description',
      content: 'Talks and workshops on enterprise architecture, application portfolios, process redesign, and governance - in English, French, or Arabic.',
    });
  }
}
