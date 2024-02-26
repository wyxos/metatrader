import axios from "axios";
import logger from "./logger.mjs";

export async function sendTradeCommand(tradeParams) {
    const metaApiToken = process.env.META_API_TOKEN;
    const accountId = process.env.ACCOUNT_ID;
    const url = process.env.META_URL + `/users/current/accounts/${accountId}/trade`;

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'auth-token': metaApiToken
        }
    };

    const data = {
        actionType: `ORDER_TYPE_${tradeParams.actionType}`,
        symbol: tradeParams.symbol,
        volume: 0.1,
        stopLoss: tradeParams.stopLoss,
        takeProfit: tradeParams.takeProfit,
        stopLossUnits: null,
        takeProfitUnits: null,
        trailingStopLoss: null,
        comment: null,
        clientId: null,
        magic: null,
        slippage: null,
        fillingModes: null,
    };

    console.log('payload', data)

    logger.info(`connecting to ${url} to send ${JSON.stringify(data)}`)

    const response = await axios.post(url, data, config);
    return response.data;
}
