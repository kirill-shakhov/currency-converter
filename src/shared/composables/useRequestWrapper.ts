import { ref } from 'vue';

export function useRequestWrapper<CallbackArguments extends unknown[]>(
    callback: (...args: CallbackArguments) => Promise<void>,
    { isLoading = true, shouldThrow = false } = {}
) {
    const isRequestLoading = ref(isLoading);
    const isRequestError = ref(false);

    const requestWrapper = async (...args: CallbackArguments) => {
        isRequestError.value = false;
        isRequestLoading.value = true;

        try {
            await callback(...args);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('useRequestWrapper error', error);
            isRequestError.value = true;

            if (shouldThrow) {
                throw error;
            }
        } finally {
            isRequestLoading.value = false;
        }
    };

    return [requestWrapper, isRequestLoading, isRequestError] as const;
}
