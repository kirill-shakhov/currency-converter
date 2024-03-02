interface Currency {
    currency: string;
    value: number;
}

export interface CurrencyListProps {
    currencies: Currency[]
}