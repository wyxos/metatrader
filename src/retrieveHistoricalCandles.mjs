import axios from 'axios';

export default async function retrieveHistoricalCandles(symbol, timeframe, startTime = null, limit = 10) {
    const metaApiToken = process.env.META_API_TOKEN;
    const accountId = process.env.ACCOUNT_ID;

    const url = `${process.env.META_MARKET_URL}/users/current/accounts/${accountId}/historical-market-data/symbols/${symbol}/timeframes/${timeframe}/candles`;

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'auth-token': metaApiToken
        },
        params: {
            startTime: startTime,
            limit: limit
        }
    };

    try {
        const response = await axios.get(url, config);
        return response.data; // Assuming the API responds with an array of candle data
    } catch (error) {
        console.error('Error retrieving historical candles:', error);
        throw error;
    }
}
