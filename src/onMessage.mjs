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
            if (tradeActions) {
                const currentPrice = await getCurrentMarketPrice(tradeActions.symbol, tradeActions.actionType);
                console.log(`Evaluating if ${tradeActions.entry} is within range of ${tradeActions.entry} && ${currentPrice}`);


                if(Array.isArray(tradeActions.entry)){
                    if(isWithinRange(tradeActions.entry, currentPrice)){
                        try {
                            const data = await sendTradeCommand(tradeActions);
                            console.log(`${new Date().getTime()} - Trade command sent successfully`);
                            console.log('Data:', data);
                        } catch (error) {
                            console.error(`${new Date().getTime()} - Error sending trade command:`, error);
                        }
                    } else {
                        console.log(`${new Date().getTime()} - Entry value is not within the specified range. Trade not executed.`);
                    }
                }
                else{
                    if(!tradeActions.entry){
                        tradeActions.entry = currentPrice
                    }

                    try {
                        const data = await sendTradeCommand(tradeActions);
                        console.log(`${new Date().getTime()} - Trade command sent successfully`);
                        console.log('Data:', data);
                    } catch (error) {
                        console.error(`${new Date().getTime()} - Error sending trade command:`, error);
                    }
                }
            }
        }
    }
}
