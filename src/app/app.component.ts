import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component'
import { RouterModule } from "@angular/router"

@Component({
  standalone: true,
  selector: 'app-root',
  template: `<main><header class="brand-name">
      <img src="/assets/logo.svg" class="brand-logo" alt="logo" aria-hidden="true">
      </header>
      <section>
        <router-outlet></router-outlet>
      </section>
      </main>
    `,
  styleUrls: ['./app.component.css'],
  imports: [HomeComponent, RouterModule],
})
export class AppComponent {
  title = 'homes';
}
 