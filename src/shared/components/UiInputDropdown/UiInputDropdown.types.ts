
export type SelectValue = string ;

export interface SelectOption {
    value: SelectValue;
    text: string;
}

export interface Props {
    label?: string;
    value: string;
    options?: SelectOption[];
    name: string;
    readonly?: boolean;
}

export interface UiInputDropdownEmits {
    (event: 'update:value', value: SelectValue): void;
    (event: 'change'): void;
}