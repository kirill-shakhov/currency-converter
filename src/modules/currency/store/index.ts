import CurrencyService from "../services/CurrencyService.ts";
import { ConvertCurrencyPayload, CurrencyState } from "./types.ts";
import { ActionContext, ActionTree, GetterTree, MutationTree } from "vuex";
import { RootState } from "../../../store/types.ts";
import { ConvertCurrencyResponse, GetCurrenciesResponse } from "../types";

const state: CurrencyState = {
    currencies: {},
    convertedCurrency: {}
};

const getters: GetterTree<CurrencyState, RootState> = {
    allCurrencies: (state: CurrencyState) => state.currencies,
    convertedCurrency: (state: CurrencyState) => state.convertedCurrency
};

const actions: ActionTree<CurrencyState, RootState> = {
    async getCurrencies(
        { commit }: ActionContext<CurrencyState, RootState>,
        baseCurrency = 'RUB'
    ) {
        try {
            const currencyService = new CurrencyService();
            const currencies = await currencyService.getCurrencies(baseCurrency);
            commit('setCurrencies', currencies);
        } catch (error) {
            console.error("Error getting currencies:", error);
        }
    },
    async convertCurrencies(
        { commit }: ActionContext<CurrencyState, RootState>,
        { from, to, amount }:ConvertCurrencyPayload) {
        try {
            const currencyService = new CurrencyService();
            const convertedCurrency = await currencyService.convertCurrencies(from, to, amount);
            commit('setConvertedCurrency', convertedCurrency);
        } catch (error) {
            console.error("Error Converting currency:", error);
        }
    }
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
