import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { SiteHeaderComponent } from '../../shared/components/site-header/site-header.component';
import { SiteFooterComponent } from '../../shared/components/site-footer/site-footer.component';

@Component({
  selector: 'app-about',
  imports: [RouterLink, SiteHeaderComponent, SiteFooterComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  constructor() {
    inject(Title).setTitle('About - Mehdi Bamou');
    inject(Meta).updateTag({
      name: 'description',
      content: 'Mehdi Bamou is an enterprise architect based in Germany, working on application portfolios, process architecture, and IT governance.',
    });
  }
}
