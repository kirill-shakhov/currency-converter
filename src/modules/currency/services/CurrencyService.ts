import $api from "../../../services/api/helpers/createAxiosInstance.ts";
import { ConvertCurrencyResponse, GetCurrenciesResponse } from "../types";
import { AxiosResponse } from "axios";

class CurrencyService {
    async getCurrencies(baseCurrency: string): Promise<GetCurrenciesResponse> {
        return $api
            .get<GetCurrenciesResponse>(`fetch-all?from=${baseCurrency}&api_key=${import.meta.env.VITE_API_KEY}`)
            .then((response: AxiosResponse<GetCurrenciesResponse>) => response.data);
    }

    async convertCurrencies(from: string, to: string, amount: number): Promise<ConvertCurrencyResponse> {
        return $api
            .get<ConvertCurrencyResponse>(`/convert?from=${from}&to=${to}&amount=${amount}&api_key=${import.meta.env.VITE_API_KEY}`)
            .then((response: AxiosResponse<ConvertCurrencyResponse>) => response.data);
    }
}

export default CurrencyService;