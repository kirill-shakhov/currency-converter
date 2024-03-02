import CurrencyService from "../services/CurrencyService.ts";
import { CurrencyState } from "./types.ts";
import { ActionTree, GetterTree, MutationTree } from "vuex";
import { RootState } from "../../../store/types.ts";

const state:CurrencyState = {
    currencies: {},
    convertedCurrency: {}
};

const getters:GetterTree<CurrencyState, RootState> = {
    allCurrencies: (state) => state.currencies,
    convertedCurrency: (state) => state.convertedCurrency
};

const actions:ActionTree<CurrencyState, RootState> = {
    async getCurrencies({ commit }, baseCurrency = 'RUB') {
        try {
            const currencyService = new CurrencyService();
            const currencies = await currencyService.getCurrencies(baseCurrency);
            commit('setCurrencies', currencies);
        } catch (error) {
            console.error("Error getting currencies:", error);
        }
    },
    async convertCurrencies({ commit }, { from, to, amount } ) {
        try {
            const currencyService = new CurrencyService();
            const convertedCurrency = await currencyService.convertCurrencies(from, to, amount);
            commit('setConvertedCurrency', convertedCurrency);
        } catch (error) {
            console.error("Error Converting currency:", error);
        }
    }
};

const mutations:MutationTree<CurrencyState> = {
    setCurrencies(state, currencies) {
        state.currencies = currencies;
    },
    setConvertedCurrency(state, convertedCurrency) {
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
