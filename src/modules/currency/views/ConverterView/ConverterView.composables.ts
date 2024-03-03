import { SelectOption } from "@/shared/components/UiInputDropdown";
import { reactive, ref } from "vue";
import { handleError } from "@/utils/handleError.ts";
import { useStore } from '@/store';
import { ConvertCurrencyResponse } from '@/services/api/controllers';
import { useRequestWrapper } from '@/shared/composables';

export function useConverterView() {
    const store = useStore();

    const firstValueDateOptions: SelectOption[] = [{ text: 'RUB', value: 'RUB' }];
    const secondValueDateOptions: SelectOption[] = [{ text: 'USD', value: 'USD' }];

    const isInitialLoad = ref(true);
    let updating = false;

    const data = reactive({
        firstDropdownValue: firstValueDateOptions[0].value,
        secondDropdownValue: secondValueDateOptions[0].value,
        firstCurrencyValue: 0,
        secondCurrencyValue: 1,

    })

    const convertCurrency = async (
        from: string,
        to: string,
        amount: number,
        isReverse = false) => {

        if (updating) return;
        updating = true;

        try {
            await store.dispatch('currency/convertCurrencies', { from, to, amount });

            const conversionResponse: ConvertCurrencyResponse = store.getters['currency/convertedCurrency'];
            if (conversionResponse && conversionResponse.result) {
                const resultValue = conversionResponse.result[to];
                if (isReverse) {
                    data.firstCurrencyValue = resultValue;
                } else {
                    data.secondCurrencyValue = resultValue;
                }
            }
        } catch (error) {
            handleError(error);
        } finally {
            updating = false;
        }
    };

    const [fetchData, isFetchDataLoading] = useRequestWrapper(async () => {
        await store.dispatch('currency/getCurrencies');

        await convertCurrency(data.secondDropdownValue, data.firstDropdownValue, data.secondCurrencyValue, true);


        const currencies = store.getters['currency/allCurrencies'];

        const conversionResponse: ConvertCurrencyResponse = store.getters['currency/convertedCurrency'];

        if (conversionResponse && conversionResponse.result) {
            data.firstCurrencyValue = conversionResponse.result[data.firstDropdownValue];
        }

        for (const key of Object.keys(currencies['results'])) {

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

        isInitialLoad.value = false;
    });

    const handleFirstInputChange = async () => {
        await convertCurrency(data.firstDropdownValue, data.secondDropdownValue, data.firstCurrencyValue);
    };

    const handleSecondInputChange = async () => {
        await convertCurrency(data.firstDropdownValue, data.secondDropdownValue, data.firstCurrencyValue);
    };


    return {
        firstValueDateOptions,
        secondValueDateOptions,
        data,
        isFetchDataLoading,

        handleFirstInputChange,
        handleSecondInputChange,

        fetchData,
    }
}
