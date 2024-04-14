import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <div class="branding" >
      <a href="http://localhost:4200/ui-components/trade">
        <img style="max-width: 100%;" src="https://i.ibb.co/Ns515ZW/cartoon-Moon-Astro.png" alt="cartoon-Moon-Astro" ></a>
    </div>
  `,
})
export class BrandingComponent {
  constructor() {}
}
