import axios from "axios";

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
        actionType: tradeParams.actionType,
        symbol: tradeParams.symbol,
        volume: Number(tradeParams.volume),
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

    const response = await axios.post(url, data, config);
    return response.data;
}
