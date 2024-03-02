type BaseCurrency = string;

export interface GetCurrenciesResponse {
    base: BaseCurrency,
    ms: number,
    results: Record<string, number>;
    updated: string;
}


export interface ConvertCurrencyResponse {
    base: BaseCurrency,
    amount: number,
    result: Record<string, number>;
    ms: number
}