export const isValidNumberInput = (value, decimalPlaces = 2) => {
    const regex = new RegExp(`^\\d*\\.?\\d{0,${decimalPlaces}}$`);
    return regex.test(value);
};
