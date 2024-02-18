import {onMessage} from "./src/onMessage.mjs";

console.log('start')
import 'dotenv/config'
import TelegramBot from 'node-telegram-bot-api'
import {logError} from "./src/errorLogger.mjs";

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_BOT_TOKEN;

console.log('token')

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

bot.on('message', onMessage);

bot.on('error', (error) => {
    logError (error)
})


function extractCurrentPriceFromPositions(positionsData, symbol) {
    // Find the position with the matching symbol
    const position = positionsData.find(pos => pos.symbol === symbol);
    if (position) {
        return position.currentPrice; // Extract the current price
    }
    return null; // Return null if the symbol is not found
}

