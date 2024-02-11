import axios from "axios";

export async function getCurrentMarketPrice(symbol, actionType) {
    const metaApiToken = process.env.META_API_TOKEN;
    const accountId = process.env.ACCOUNT_ID;
    const url = process.env.META_URL + `/users/current/accounts/${accountId}/symbols/${symbol}/current-price`;

    const config = {
        headers: {
            'Accept': 'application/json',
            'auth-token': metaApiToken
        }
    };

    try {
        const response = await axios.get(url, config);
        // Assuming a buy action uses the 'ask' price and a sell action uses the 'bid' price
        const marketPrice = actionType === 'ORDER_TYPE_BUY' ? response.data.ask : response.data.bid;
        return marketPrice;
    } catch (error) {
        console.error('Error fetching current market price:', error);
        return null; // or handle the error appropriately
    }
}
