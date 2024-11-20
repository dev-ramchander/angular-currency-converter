import { Routes } from '@angular/router';
import { PUBLIC_ROUTES } from './config/constants/routes';
import { PageNotFoundComponent } from './pages/errors/page-not-found/page-not-found.component';

import { CurrencyConverterComponent } from './pages/currency-converter/currency-converter.component';
import { CurrencyLayoutComponent } from './layouts/currency-layout/currency-layout.component';

export const routes: Routes = [
    {
        path: '',
        component: CurrencyLayoutComponent,
        children: [           
            {path: '', component: CurrencyConverterComponent},
            {path: PUBLIC_ROUTES[404].path, component: PageNotFoundComponent},
        ],
    },
];
