import { Injectable } from "@angular/core";
import { ApiService } from "../api.service";
import { IFCurrencyPaload, IFCurrencyResponse } from "./service.model";
import { HTTP_REQUESST } from "../api.model";
import { Observable } from "rxjs";
import { CURRENCY_ENDPOINT } from "../../config/endpoints";

@Injectable({
    providedIn: 'root',
  })

export class CurrencyService {
    constructor(
        private apiService: ApiService,
    ) {}

    convert(payload:IFCurrencyPaload): Observable<IFCurrencyResponse>  {
        console.log(CURRENCY_ENDPOINT)
        const httpData: HTTP_REQUESST = {
            url:`${CURRENCY_ENDPOINT.convert}/${payload.sourceCurrency}/${payload.targetCurrency}/${payload.amount}`, 
        }
        return this.apiService.get<IFCurrencyResponse>(httpData)
    }
}