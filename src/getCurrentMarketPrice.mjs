import axios from "axios";
import logger from "./logger.mjs";

export async function getCurrentMarketPrice(symbol, actionType) {
    const metaApiToken = process.env.META_API_TOKEN;
    const accountId = process.env.ACCOUNT_ID;
    const url = process.env.META_URL + `/users/current/accounts/${accountId}/symbols/${symbol}/current-price`;

    logger.info('fetching price from ' + url)

    const config = {
        headers: {
            'Accept': 'application/json',
            'auth-token': metaApiToken
        }
    };

    try {
        const response = await axios.get(url, config);
        // Assuming a buy action uses the 'ask' price and a sell action uses the 'bid' price
        return actionType === 'ORDER_TYPE_BUY' ? response.data.ask : response.data.bid;
    } catch (error) {
        logger.error('Error fetching current market price:', error);
        return null; // or handle the error appropriately
    }
}
