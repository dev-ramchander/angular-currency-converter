import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PUBLIC_ROUTES } from '../../../config/constants/routes';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent {
  public routes = PUBLIC_ROUTES
}
