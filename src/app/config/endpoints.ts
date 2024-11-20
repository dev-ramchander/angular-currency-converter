import { environment } from "../../environments/environment";

export const BASE_URL = 'https://v6.exchangerate-api.com/v6';
const EXCHANGE_RATE_API_KEY = environment.EXCHANGE_RATE_APIKEY;
export const CURRENCY_ENDPOINT = {
    convert: `${BASE_URL}/${EXCHANGE_RATE_API_KEY}/pair`,
}