export function isWithinRange(entryValue, currentPrice) {
    const upperLimit = entryValue;
    const lowerLimit = entryValue;
    return currentPrice >= lowerLimit && currentPrice <= upperLimit;
}
