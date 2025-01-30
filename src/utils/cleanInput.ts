export const cleanInput = (input: string): string => {
    return input.trim().replace(/\s{2,}/g, " ");
};
