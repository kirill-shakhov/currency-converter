import { useStore } from "vuex";
import { key } from "../../../../store";
import { SelectOption } from "../../../../shared/components/UiInputDropdown";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { Currency, Data } from "./CurrenciesView.types.ts";
import { GetCurrenciesResponse } from "../../types";
import { handleError } from "../../../../utils/handleError.ts";

export function useCurrenciesView() {
    const store = useStore(key)


    const launchDateOptions: SelectOption[] = [{ text: 'RUB', value: 'RUB' }];
    const currenciesList: Currency[] = [];

    const isInitialLoad = ref(true);
    const loading = ref(false);

    const data = reactive<Data>({
        inputSearchValue: '',
        launch_date: launchDateOptions[0].value.toString()
    })


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

                    launchDateOptions.push({
                        text: key,
                        value: key
                    });
                }
            }

            loading.value = false;
            isInitialLoad.value = false;

        } catch (e: unknown) {
            handleError(e)
            loading.value = false
        }
    }


    onMounted(async () => {
        await fetchData();
    })

    watch(() => data.launch_date, async (newVal, oldValue) => {
        if (isInitialLoad.value || newVal === oldValue) return;

        try {
            loading.value = true;
            data.inputSearchValue = ''
            await store.dispatch('currency/getCurrencies', newVal);

            updateCurrenciesList();
            loading.value = false;
        } catch (e: unknown) {
            handleError(e)
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
        if (data.inputSearchValue.trim() === '') {
            return currenciesList;
        }

        return currenciesList.filter(currency =>
            currency.currency.toLowerCase().includes(data.inputSearchValue.toLowerCase())
        );
    });


    return {
        launchDateOptions,
        loading,
        data,

        filteredCurrencies
    }
}