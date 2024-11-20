export interface IFCurrencyPaload {
    amount:number,
    sourceCurrency:string,
    targetCurrency:string,
}
export interface IFCurrencyResponse {
    result?: string,
    documentation?: string,
    terms_of_use?: string,
    time_last_update_unix?: number,
    time_last_update_utc?: string,
    time_next_update_unix?: number,
    time_next_update_utc?: string,
    base_code: string,
    target_code: string,
    conversion_rate: number,
    conversion_result: number
}

export interface IF_CachedResult {
    key: string,
    response:IFCurrencyResponse,
    lastUpdated:any,
}

export interface IF_RemoveCache {
    index:number
}

export interface CacheItem { key: string; response: any, };

export type CachedData = (IF_CachedResult)[];
export const initialCacheState: CachedData = [];
