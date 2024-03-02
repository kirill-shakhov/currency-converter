import { ConvertCurrencyResponse, GetCurrenciesResponse } from "../types";

export interface CurrencyState {
    currencies: GetCurrenciesResponse | {};
    convertedCurrency: ConvertCurrencyResponse | {};

}

export interface ConvertCurrencyPayload {
    from: string;
    to: string;
    amount: number;
}