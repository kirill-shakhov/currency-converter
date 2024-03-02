import { Props, SelectValue, UiInputDropdownEmits } from "./UiInputDropdown.types.ts";
import { computed, ref } from "vue";

export function useUiInputDropdown(props: Props, emit: UiInputDropdownEmits) {

    const isOpen = ref(false);


    const toggleDropdown = (): void => {
        isOpen.value = !isOpen.value;
    };

    const hideDropdown = (): void => {
        isOpen.value = false;
    };

    const selectedOption = computed(() => {
        return props.options.find(option => option.value === props.value);
    })

    const handleClickOption = (value: SelectValue) => {
        hideDropdown();
        emit('update:value', value);
        emit('change',);
    };


    return {
        isOpen,

        toggleDropdown,
        hideDropdown,
        selectedOption,
        handleClickOption
    }
}