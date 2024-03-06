import { SelectOption } from "@/shared/components/UiInputDropdown";
import { reactive, ref } from "vue";
import { handleError } from "@/utils/handleError.ts";
import { useStore } from '@/store';
import { ConvertCurrencyResponse } from '@/services/api/controllers';
import { useRequestWrapper } from '@/shared/composables';
import debounce from 'debounce-fn';

export function useConverterView() {
    const store = useStore();

    const firstValueDateOptions: SelectOption[] = [{ text: 'RUB', value: 'RUB' }];
    const secondValueDateOptions: SelectOption[] = [{ text: 'USD', value: 'USD' }];

    const isInitialLoad = ref(true);
    let updating = false;

    const data = reactive({
        firstDropdownValue: firstValueDateOptions[0].value,
        secondDropdownValue: secondValueDateOptions[0].value,
        firstCurrencyValue: '0',
        secondCurrencyValue: '1',
    })

    const convertCurrency = async (
        from: string,
        to: string,
        amount: string,
        isReverse = false) => {

        if (updating) return;
        updating = true;

        try {
            await store.dispatch('currency/convertCurrencies', { from, to, amount });

            const conversionResponse: ConvertCurrencyResponse = store.getters['currency/convertedCurrency'];
            if (conversionResponse && conversionResponse.result) {
                const resultValue = conversionResponse.result[to].toString();
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

    const debouncedFetchConversion = debounce(convertCurrency, { wait:200 });

    const [fetchData, isFetchDataLoading] = useRequestWrapper(async () => {
        await store.dispatch('currency/getCurrencies');

        await convertCurrency(data.secondDropdownValue, data.firstDropdownValue, data.secondCurrencyValue, true);


        const currencies = store.getters['currency/allCurrencies'];

        const conversionResponse: ConvertCurrencyResponse = store.getters['currency/convertedCurrency'];

        if (conversionResponse && conversionResponse.result) {
            data.firstCurrencyValue = conversionResponse.result[data.firstDropdownValue].toString();
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
        if (data.firstCurrencyValue !== '') {
            await debouncedFetchConversion(data.firstDropdownValue, data.secondDropdownValue, data.firstCurrencyValue);
        } else {
            data.secondCurrencyValue = '';
        }
    };

    const handleSecondInputChange = async () => {
        if (data.secondCurrencyValue !== '') {
            await debouncedFetchConversion(data.secondDropdownValue, data.firstDropdownValue, data.secondCurrencyValue, true)
        } else {
            data.firstCurrencyValue = '';
        }
    };

    const handleSecondDropdownChange = async () => {
        await debouncedFetchConversion(data.firstDropdownValue, data.secondDropdownValue, data.firstCurrencyValue);
    }


    return {
        firstValueDateOptions,
        secondValueDateOptions,
        data,
        isFetchDataLoading,

        handleFirstInputChange,
        handleSecondInputChange,
        handleSecondDropdownChange,

        fetchData,
    }
}
