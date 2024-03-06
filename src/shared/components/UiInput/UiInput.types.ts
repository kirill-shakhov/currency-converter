export type Icon = 'chevron'

export interface InputProps {
    name: string;
    type: string;
    value?: string | number;
    placeholder?: string;
    label?: string;
    disabled?: boolean;
    readonly?: boolean;
    iconRight?: boolean;
    icon?: Icon;
    validator?: Function
}

export interface InputEmits {
    (event: 'update:value', value: InputProps['value']): void;

    (event: 'change'): void;
}
