export function isWithinRange(array, currentPrice) {
    const lowerLimit = array[0];
    const upperLimit = array[1];
    return currentPrice >= lowerLimit && currentPrice <= upperLimit;
}
