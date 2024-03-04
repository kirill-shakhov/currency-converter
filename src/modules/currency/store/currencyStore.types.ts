import { ConvertCurrencyResponse, GetCurrenciesResponse } from '@/services/api/controllers';

export interface CurrencyState {
    currencies: GetCurrenciesResponse | undefined;
    convertedCurrency: ConvertCurrencyResponse | undefined;
}

export interface ConvertCurrencyPayload {
    from: string;
    to: string;
    amount: string;
}
