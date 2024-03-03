import { ConvertCurrencyResponse, GetCurrenciesResponse } from './currencyApi.types.ts';
import { createAxiosInstance } from '@/services/api/helpers';

const $api = createAxiosInstance();

$api.interceptors.request.use((config) => {
    if (config.method === 'get') {
        config.params.api_key = import.meta.env.VITE_API_KEY;
    } else {
        config.data.api_key = import.meta.env.VITE_API_KEY;
    }

    return config;
});

class CurrencyApi {
    async getCurrencies(baseCurrency: string): Promise<GetCurrenciesResponse> {
        const { data } = await $api.get<GetCurrenciesResponse>('/fetch-all', {
            params: {
                from: baseCurrency,
            },
        });

        return data;
    }

    async convertCurrencies(from: string, to: string, amount: number): Promise<ConvertCurrencyResponse> {
        const { data } = await $api.get<ConvertCurrencyResponse>('/convert', {
            params: {
                from,
                to,
                amount,
            }
        });

        return data;
    }
}

export const currencyApi = new CurrencyApi();
