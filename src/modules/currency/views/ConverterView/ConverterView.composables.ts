    import { useStore } from "vuex";
    import { key } from "../../../../store";
    import { SelectOption } from "../../../../shared/components/UiInputDropdown";
    import { Currency } from "../CurrenciesView/CurrenciesView.types.ts";
    import { computed, onMounted, reactive, ref, watch } from "vue";
    import { handleError } from "../../../../utils/handleError.ts";
    import { ConvertCurrencyResponse } from "../../types";

    export function useConverterView() {
        const store = useStore(key)

        const firstValueDateOptions: SelectOption[] = [{ text: 'RUB', value: 'RUB' }];
        const secondValueDateOptions: SelectOption[] = [{ text: 'USD', value: 'USD' }];

        const loading = ref(false);
        const isInitialLoad = ref(true);
        let updating = false;

        const data = reactive({
            firstDropdownValue: firstValueDateOptions[0].value,
            secondDropdownValue: secondValueDateOptions[0].value,
            firstCurrencyValue: 0,
            secondCurrencyValue: 0,

        })


        async function fetchData() {
            try {
                loading.value = true

                await store.dispatch('currency/getCurrencies');

                const currencies = store.getters['currency/allCurrencies'];

                for (const key of Object.keys(currencies['results'])) {
                    const value = currencies['results'][key];

                    if (key !== "RUB") {
                        firstValueDateOptions.push({
                            text: key,
                            value: key
                        });
                    }

                    if (key !== "USD") {
                        secondValueDateOptions.push({
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

        const convertFromFirstToSecond = async () => {
            if (updating) return;
            updating = true;

            try {
               await store.dispatch('currency/convertCurrencies', {
                    from: data.firstDropdownValue,
                    to: data.secondDropdownValue,
                    amount: data.firstCurrencyValue,
                });

                const conversionResponse: ConvertCurrencyResponse = store.getters['currency/convertedCurrency'];

                // data.secondCurrencyValue = response.convertedAmount;

                if (conversionResponse && conversionResponse.result) {
                    const results = Object.values(conversionResponse.result);
                    console.log(results)
                    if (results.length > 0) {
                        data.secondCurrencyValue = results[0];

                    }
                }

            } catch (error) {
                handleError(error);
            }

            updating = false;
        };

        const convertFromSecondToFirst = async () => {
            if (updating) return;
            updating = true;

            // Здесь логика для конвертации из второго поля в первое
            try {
                 await store.dispatch('currency/convertCurrencies', {
                    from: data.secondDropdownValue,
                    to: data.firstDropdownValue,
                    amount: data.secondCurrencyValue,
                });

                const conversionResponse: ConvertCurrencyResponse = store.getters['currency/convertedCurrency'];

                if (conversionResponse && conversionResponse.result) {
                    const results = Object.values(conversionResponse.result);
                    if (results.length > 0) {
                        data.firstCurrencyValue = results[0];

                    }
                }
            } catch (error) {
                handleError(error);
            }

            updating = false;
        };

        const handleFirstInputChange = async () => {
            console.log(1)
            await convertFromFirstToSecond();
        };

        const handleSecondInputChange = async () => {
            console.log(1)
            await convertFromSecondToFirst();
        };

        return {
            firstValueDateOptions,
            secondValueDateOptions,
            data,

            handleFirstInputChange,
            handleSecondInputChange
        }
    }