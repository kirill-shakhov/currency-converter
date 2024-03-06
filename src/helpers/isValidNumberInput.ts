export const isValidNumberInput = (value: string, decimalPlaces:number = 2): boolean => {
    const regex = new RegExp(`^\\d*\\.?\\d{0,${decimalPlaces}}$`);
    return regex.test(value);
};
