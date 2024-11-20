import { createReducer, on } from '@ngrx/store';

import { currencyExchangeRate } from '../states/common.state';
import { addToCache } from '../actions/common.actions';
import { initialCacheState } from '../../services/currency/service.model';

export const commonReducer = createReducer(
  initialCacheState,
  on(addToCache, (state, { key, response, lastUpdated }) => ([...state, {
    key, response, lastUpdated
  }]))
);
