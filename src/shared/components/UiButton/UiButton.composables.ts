import { UiButtonProps } from "./UiButton.types.ts";
import { computed } from "vue";

export function useUiButton(props: UiButtonProps) {

    const rootClasses = computed(() => [
        {
            'ui-button_primary': props.theme === 'primary',
            'ui-button_secondary': props.theme === 'secondary',
        }
    ]);

    return {
        rootClasses,
    }
}