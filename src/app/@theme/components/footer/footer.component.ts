import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Created with ♥ by <b>Ovidio Reyna</b> 2020
    </span>
  `,
})
export class FooterComponent {
}
