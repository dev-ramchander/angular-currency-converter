import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-currency-layout',
  standalone: true,
  imports: [RouterOutlet, FontAwesomeModule],
  templateUrl: './currency-layout.component.html',
  styleUrl: './currency-layout.component.scss'
})
export class CurrencyLayoutComponent {
  faArrowLeft = faArrowLeft;
  constructor (private router: Router) {}

  handleClick(){
    this.router.navigate(['/']);
  }
}
