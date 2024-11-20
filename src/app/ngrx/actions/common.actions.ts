import { createAction, props } from '@ngrx/store';
import { IF_CachedResult, IF_RemoveCache } from '../../services/currency/service.model';

export const addToCache = createAction('[CurrencyCachee] add', props<IF_CachedResult>());
export const removeExpiredCache = createAction('[CurrencyCachee] remove', props<IF_RemoveCache>());

