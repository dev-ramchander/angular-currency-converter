import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './app.routes';
import { localStorageSync } from 'ngrx-store-localstorage';

import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { commonReducer } from './ngrx/reducers/common.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-top-center',
    }),
    provideStore(
      {
        cached:commonReducer
      },
      {
        metaReducers: [
          localStorageSyncReducer
        ],
      }
    ),
    provideStoreDevtools(),
  ]
};

export function localStorageSyncReducer(reducer: any) {
  return localStorageSync({
    keys: ['cached'],
    rehydrate: true,
  })(reducer);
}
