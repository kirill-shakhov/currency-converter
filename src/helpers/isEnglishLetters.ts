export const isEnglishLetters = (value: string): boolean => {
    const regex = new RegExp("^[a-zA-Z]*$");
    return regex.test(value);
}