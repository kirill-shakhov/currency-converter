import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex';
import { ConvertCurrencyResponse, currencyApi, GetCurrenciesResponse } from '@/services/api/controllers';
import { ConvertCurrencyPayload, CurrencyState } from './currencyStore.types.ts';
import { RootState } from '@/store';

const state: CurrencyState = {
    currencies: undefined,
    convertedCurrency: undefined,
};

const getters: GetterTree<CurrencyState, RootState> = {
    allCurrencies: (state: CurrencyState) => state.currencies,
    convertedCurrency: (state: CurrencyState) => state.convertedCurrency,
};

const actions: ActionTree<CurrencyState, RootState> = {
    async getCurrencies(
        { commit }: ActionContext<CurrencyState, RootState>,
        baseCurrency = 'RUB',
    ) {
        try {
            const currencies = await currencyApi.getCurrencies(baseCurrency);
            commit('setCurrencies', currencies);
        } catch (error) {
            console.error('Error getting currencies:', error);
        }
    },
    async convertCurrencies(
        { commit }: ActionContext<CurrencyState, RootState>,
        { from, to, amount }: ConvertCurrencyPayload) {
        try {
            const convertedCurrency = await currencyApi.convertCurrencies(from, to, amount);
            commit('setConvertedCurrency', convertedCurrency);
        } catch (error) {
            console.error('Error Converting currency:', error);
        }
    },
};

const mutations: MutationTree<CurrencyState> = {
    setCurrencies(state: CurrencyState, currencies: GetCurrenciesResponse) {
        state.currencies = currencies;
    },
    setConvertedCurrency(state: CurrencyState, convertedCurrency: ConvertCurrencyResponse) {
        state.convertedCurrency = convertedCurrency;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
