import { SelectOption } from "../../../../shared/components/UiInputDropdown";
import { computed, ref, watch } from "vue";
import { handleError } from "../../../../utils/handleError.ts";
import { useStore } from '@/store';
import { GetCurrenciesResponse } from '@/services/api/controllers';
import { Currency } from '@/modules/currency/static/types/index.ts';

export function useCurrenciesView() {
    const store = useStore();

    const currenciesOptions: SelectOption[] = [{ text: 'RUB', value: 'RUB' }];
    const currenciesList: Currency[] = [];

    const isInitialLoad = ref(true);
    const loading = ref(false);

    const inputSearchValue = ref('');
    const currentCurrency = ref(currenciesOptions[0].value);

    async function fetchData() {
        try {
            loading.value = true

            await store.dispatch('currency/getCurrencies');

            const currencies = store.getters['currency/allCurrencies'];

            for (const key of Object.keys(currencies['results'])) {
                const value = currencies['results'][key];

                currenciesList.push({
                    currency: key,
                    value: value
                });
                if (key !== "RUB") {

                    currenciesOptions.push({
                        text: key,
                        value: key
                    });
                }
            }

            isInitialLoad.value = false;
        } catch (e: unknown) {
            handleError(e)
        } finally {
            loading.value = false;
        }
    }

    watch(() => currentCurrency, async (newVal, oldValue) => {
        if (isInitialLoad.value || newVal === oldValue) return;

        try {
            loading.value = true;
            inputSearchValue.value = ''
            await store.dispatch('currency/getCurrencies', newVal);

            updateCurrenciesList();
        } catch (e: unknown) {
            handleError(e)
        } finally {
            loading.value = false;
        }
    });

    function updateCurrenciesList() {
        const updatedCurrencies: GetCurrenciesResponse = store.getters['currency/allCurrencies'];
        currenciesList.splice(0, currenciesList.length);

        for (const key of Object.keys(updatedCurrencies.results)) {
            const value = updatedCurrencies.results[key];
            currenciesList.push({
                currency: key,
                value: value,
            });
        }
    }


    const filteredCurrencies = computed<Currency[]>(() => {
        if (inputSearchValue.value.trim() === '') {
            return currenciesList;
        }

        return currenciesList.filter(currency =>
            currency.currency.toLowerCase().includes(inputSearchValue.value.toLowerCase())
        );
    });


    return {
        currenciesOptions,
        loading,
        inputSearchValue,
        currentCurrency,
        filteredCurrencies,

        fetchData,
    }
}
