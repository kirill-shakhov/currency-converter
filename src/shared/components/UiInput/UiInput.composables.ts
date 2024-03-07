import { ref, watch, computed } from 'vue';
import { InputEmits, InputProps } from './UiInput.types.ts';

export function useInput(props: InputProps, emit: InputEmits) {
    const innerValue = ref(props.value);
    const lastValidValue = ref(props.value);

    watch(() => props.value, (value) => {

        const stringValue = value !== undefined ? value.toString() : '';

        if (props.validator ? props.validator(stringValue) : true) {
            lastValidValue.value = stringValue;
            innerValue.value = stringValue;
        } else {
            innerValue.value = lastValidValue.value;
        }
    });

    const changeValue = (event: Event) => {
        const target = event.target as HTMLInputElement;
        const currentValue = target.value;

        if (props.validator ? props.validator(currentValue) : true) {
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

