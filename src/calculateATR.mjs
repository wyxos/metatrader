import retrieveHistoricalCandles from "./retrieveHistoricalCandles.mjs";
import logger from "./logger.mjs";

export default async function calculateATR(symbol, period = '15m', length = 14) {
    const historicalCandles = await retrieveHistoricalCandles(symbol, period);

    logger.info(`Historical candles retrieved ${JSON.stringify(historicalCandles)}`)

    let trueRanges = [];

    for (let i = 1; i < historicalCandles.length; i++) {
        const current = historicalCandles[i];
        const previous = historicalCandles[i - 1];

        const range1 = current.high - current.low;
        const range2 = Math.abs(current.high - previous.close);
        const range3 = Math.abs(current.low - previous.close);

        const trueRange = Math.max(range1, range2, range3);
        trueRanges.push(trueRange);
    }

    return trueRanges.reduce((a, b) => a + b, 0) / length;
}
