import reformatTradeMessages from "./reformatTradeMessages.mjs";
import {getCurrentMarketPrice} from "./getCurrentMarketPrice.mjs";
import {isWithinRange} from "./isWithinRange.mjs";
import {sendTradeCommand} from "./sendTradeCommand.mjs";
import calculateATR from "./calculateATR.mjs";
import logger from "./logger.mjs";

function differenceLog(currentPrice, action){
    logger.info(`TP difference: ${currentPrice - action.takeProfit}`)

    logger.info(`SL difference: ${currentPrice - action.stopLoss}`)
}

export async function onMessage(msg) {
    const today = new Date();
    const dayOfWeek = today.getDay();

    // Check if the current day is Saturday (6) or Sunday (0)
    if (dayOfWeek === 0 || dayOfWeek === 6) {
        logger.info('It is the weekend. No trade actions will be processed.');

        return;
    }

    if (msg.text) {
        logger.info(`Original message ${msg.text}`)

        const tradeActions = reformatTradeMessages(msg.text);

        if(!tradeActions.length){
            logger.error('No trade action found.')
        }

        for (const action of tradeActions) {
            const currentPrice = await getCurrentMarketPrice(action.symbol, action.actionType);

            logger.info('Current price: ' + currentPrice)

            // const profitThreshold = 100; // Define profit threshold here
            // const trailingStopPoints = 50; // Define trailing stop points here
            //
            // const shouldTrailStop = (action.actionType.toUpperCase() === 'BUY' && currentPrice - action.entry >= profitThreshold) ||
            //     (action.actionType.toUpperCase() === 'SELL' && action.entry - currentPrice >= profitThreshold);
            //
            // if (shouldTrailStop) {
            //     if (action.actionType.toUpperCase() === 'BUY') {
            //         action.trailingStopLoss = currentPrice - trailingStopPoints;
            //     } else {
            //         action.trailingStopLoss = currentPrice + trailingStopPoints;
            //     }
            // }

            // try{
            //     const atr = await calculateATR(action.symbol);
            //
            //     logger.info(`Calculated atr: ${JSON.stringify(atr)}`)
            //
            //     const atrMultiplier = 1; // Define your ATR multiplier here
            //     const trailingStopDistance = atr * atrMultiplier;
            //
            //     if (action.actionType.toUpperCase() === 'BUY') {
            //         action.trailingStopLoss = currentPrice - trailingStopDistance;
            //     } else if (action.actionType.toUpperCase() === 'SELL') {
            //         action.trailingStopLoss = currentPrice + trailingStopDistance;
            //     }
            // }
            // catch (error){
            //     logger.error('Failed to calculate ATR, proceeding without trailing stop loss.')
            // }

            if(Array.isArray(action.entry)){
                logger.info(`Trade is range, evaluating range min ${action.entry[0]} and max ${action.entry[1]}`)

                if(isWithinRange(action.entry, currentPrice)){
                    try {
                        action.entry = currentPrice
                        const data = await sendTradeCommand(action);

                        logger.info(`Trade command sent successfully.`)

                        differenceLog(currentPrice, action)
                    } catch (error) {
                        logger.error(`Error sending trade command: ${error}`)
                    }
                } else {
                    let error = `Entry value is not within the specified range. Trade not executed.`;
                    logger.error(error);
                }
            }
            else{
                logger.info('Trade is single value')

                if(!action.entry){
                    logger.info('Trade entry not defined, using current price.')
                    action.entry = currentPrice
                }

                try {
                    const data = await sendTradeCommand(action);

                    logger.info(`Trade command sent successfully.`)

                    differenceLog(currentPrice, action)
                } catch (error) {
                    logger.error(`Error sending trade command: ${error}`)
                }
            }
        }
    }
}
