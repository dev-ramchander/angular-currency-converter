import { Component, ViewEncapsulation } from '@angular/core';

import { MENU_OPTIONS } from '../../../config/constants/routes';
import { RouterLink } from '@angular/router';
import { AuthComponent } from '../auth/auth.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, AuthComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  munus = MENU_OPTIONS;
}
