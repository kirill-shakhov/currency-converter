import { ref, watch, computed } from 'vue';
import { InputEmits, InputProps } from './UiInput.types.ts';
import { isValidNumberInput } from "../../../utils/isValidNumberInput.ts";

export function useInput(props: InputProps, emit: InputEmits) {
    const innerValue = ref(props.value);
    const lastValidValue = ref(props.value);

    watch(() => props.value, (value) => {
        if (!props.numberFormat || isValidNumberInput(value)) {
            lastValidValue.value = value;
            innerValue.value = value;
        }
        else {

            innerValue.value = lastValidValue.value;
        }
    });

    const changeValue = (event: InputEvent) => {
        const target = event.target as HTMLInputElement;
        const currentValue = target.value;

        if (!props.numberFormat || isValidNumberInput(currentValue)) {
            lastValidValue.value = currentValue;
            innerValue.value = currentValue;
            emit('update:value', currentValue);
        } else {

            innerValue.value = lastValidValue.value;
        }
    };


    const rootClasses = computed(() => ({
        disabled: props.disabled,
        'readonly': props.readonly
    }));

    return {
        innerValue,
        changeValue,
        rootClasses
    };
}

