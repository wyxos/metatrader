import reformatTradeMessages from "./reformatTradeMessages.mjs";
import {parseTradeMessage} from "./parseTradeMessage.mjs";
import {getCurrentMarketPrice} from "./getCurrentMarketPrice.mjs";
import {isWithinRange} from "./isWithinRange.mjs";
import {sendTradeCommand} from "./sendTradeCommand.mjs";
import {logError} from "./errorLogger.mjs";

export async function onMessage(msg) {
    console.log('Incoming message', msg.text);
    if (msg.text) {
        // Generate an array of reformatted trade messages
        const tradeActions = reformatTradeMessages(msg.text);

        // Process each trade message individually
        for (const action of tradeActions) {
            const tradeParams = parseTradeMessage(action); // Parse each reformatted message
            if (tradeParams) {
                const currentPrice = await getCurrentMarketPrice(tradeParams.symbol, tradeParams.actionType);
                console.log(`Evaluating if ${tradeParams.entry} is within range of ${tradeParams.entry} && ${currentPrice}`);
                if (isWithinRange(tradeParams.entry || currentPrice, currentPrice)) {
                    try {
                        const data = await sendTradeCommand(tradeParams);
                        console.log(`${new Date().getTime()} - Trade command sent successfully`);
                        console.log('Data:', data);
                    } catch (error) {
                        console.error(`${new Date().getTime()} - Error sending trade command:`, error);
                    }
                } else {
                    console.log(`${new Date().getTime()} - Entry value is not within the specified range. Trade not executed.`);
                }
            }
        }
    }
}
