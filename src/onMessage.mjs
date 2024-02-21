import reformatTradeMessages, {cleanMessage} from "./reformatTradeMessages.mjs";
import {getCurrentMarketPrice} from "./getCurrentMarketPrice.mjs";
import {isWithinRange} from "./isWithinRange.mjs";
import {sendTradeCommand} from "./sendTradeCommand.mjs";
import logger from "./logger.mjs";

export async function onMessage(msg) {
    if (msg.text) {
        // Generate an array of reformatted trade messages
        const tradeActions = reformatTradeMessages(msg.text);

        if(!tradeActions.length){
            logger.error('No trade action found.')
        }

        // Process each trade message individually
        for (const action of tradeActions) {
            const currentPrice = await getCurrentMarketPrice(tradeActions.symbol, tradeActions.actionType);

            if(Array.isArray(tradeActions.entry)){
                if(isWithinRange(tradeActions.entry, currentPrice)){
                    try {
                        const data = await sendTradeCommand(tradeActions);
                        logger.info(`Trade command sent successfully. ${data}`)
                    } catch (error) {
                        logger.error(`Error sending trade command: ${error}`)
                    }
                } else {
                    let error = `${new Date().getTime()} - Entry value is not within the specified range. Trade not executed.`;
                    logger.error(error);
                }
            }
            else{
                if(!tradeActions.entry){
                    tradeActions.entry = currentPrice
                }

                try {
                    const data = await sendTradeCommand(tradeActions);
                    logger.info(`Trade command sent successfully. ${data}`)
                } catch (error) {
                    logger.error(`Error sending trade command: ${error}`)
                }
            }
        }
    }
}
