import { ConvertCurrencyResponse, GetCurrenciesResponse } from "../types";

export interface CurrencyState {
    currencies: GetCurrenciesResponse | {};
    convertedCurrency: ConvertCurrencyResponse | {};

}