import { createAction, props } from '@ngrx/store';
import { CacheItem, IF_CachedResult } from '../../services/currency/service.model';

export const addToCache = createAction('[CurrencyCachee] add', props<IF_CachedResult>());

