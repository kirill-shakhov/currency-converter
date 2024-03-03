export type BaseCurrency = string;

export interface GetCurrenciesResponse {
    base: BaseCurrency;
    ms: number;
    results: Record<string, number>;
    updated: string;
}

export interface ConvertCurrencyResponse {
    base: BaseCurrency;
    ms: number;
    amount: number;
    result: Record<string, number>;
}
