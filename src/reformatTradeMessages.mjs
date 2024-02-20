import {logError} from "./errorLogger.mjs";

const currencies = {
    'AUDCAD' : 'AUDCAD',
    'AUDCHF' : 'AUDCHF',
    'AUDJPY' : 'AUDJPY',
    'AUDNZD' : 'AUDNZD',
    'AUDUSD' : 'AUDUSD',
    'BTC.USD' : 'BTC.USD',
    'BTCUSD' : 'BTCUSD',
    'CHFEUR' : 'CHFEUR',
    'Chfjpy' : 'Chfjpy',
    'DXY' : 'DXY',
    'EURAUD' : 'EURAUD',
    'EURCAD' : 'EURCAD',
    'EURCHF' : 'EURCHF',
    'EURGBP' : 'EURGBP',
    'EURJPY' : 'EURJPY',
    'EURNZD' : 'EURNZD',
    'EURUSD' : 'EURUSD',
    'GBPAUD' : 'GBPAUD',
    'GBPCAD' : 'GBPCAD',
    'GBPJPY' : 'GBPJPY',
    'GBPNZD' : 'GBPNZD',
    'GBPUSD' : 'GBPUSD',
    'GOLD' : 'XAUUSD',
    'NASDAQ' : 'NASDAQ',
    'NZDCAD' : 'NZDCAD',
    'NZDCHF' : 'NZDCHF',
    'NZDJPY' : 'NZDJPY',
    'NZDUSD' : 'NZDUSD',
    'US30' : 'NASDAQ',
    'USDCAD' : 'USDCAD',
    'USDCHF' : 'USDCHF',
    'USDJPY' : 'USDJPY',
    'XAGUSD' : 'XAGUSD',
    'XAU.USD' : 'XAUUSD',
    'XAUUSD' : 'XAUUSD'
}

export function extractCurrency(message) {
    // Attempt to match the beginning of the message with any currency key
    for (const currencyKey in currencies) {
        if (message.includes(currencyKey)) {
            return currencies[currencyKey];
        }
    }

    throw new Error('No currency found.');
}

export function cleanMessage(message) {
    // Split the message by newline, filter out empty lines.
    const lines = message.split('\n').filter(line => line.trim() !== '');

    // Process each line for consistency and formatting.
    const processedLines = lines.map(line => {
        // Replace 'STOP LOSS' with 'SL' for consistency.
        line = line.replace('STOP LOSS', 'SL');
        // Remove numbers after 'TP' to standardize it.
        line = line.replace(/TP\d*\s/g, 'TP ');
        return line;
    });

    // Join the processed lines back together with spaces.
    return processedLines.join(' ').trim();
}

export function extractProfit(message) {
    const tpPattern = /TP (\d+\.?\d*)/g; // Matches "TP" followed by a space and then a number
    let matches;
    const profits = [];

    // Use a loop to extract all matches of the TP pattern from the message
    while ((matches = tpPattern.exec(message)) !== null) {
        // Parse the number from the match and push it to the profits array
        profits.push(parseFloat(matches[1]));
    }

    return profits;
}

export function extractLoss(message) {
    const slPattern = /SL (\d+\.?\d*)/; // Matches "SL" followed by a space and then a number
    const match = message.match(slPattern);

    if (match) {
        return parseFloat(match[1]);
    }

    throw new Error('No stop loss found');
}

export function extractCommand(message) {
    const upperMessage = message.toUpperCase();

    // Check for "BUY" or "SELL" and "NOW" separately
    const hasBuy = upperMessage.includes("BUY");
    const hasSell = upperMessage.includes("SELL");
    const hasNow = upperMessage.includes("NOW");

    // Determine command based on what was found
    if (hasSell && hasNow) {
        return "SELL NOW";
    } else if (hasBuy && hasNow) {
        return "BUY NOW";
    } else if (hasSell) {
        return "SELL";
    } else if (hasBuy) {
        return "BUY";
    }

    throw new Error("No trading command found");
}

export function extractTradeValue(message) {
    // Use previously defined functions to extract and remove known parts of the message
    const currency = extractCurrency(message);
    const command = extractCommand(message);
    const profits = extractProfit(message); // Assuming this returns an array of TP values
    const loss = extractLoss(message);

    console.log(currency, command, profits, loss)

    // Remove the extracted parts from the message
    let cleanedMessage = message.replace(currency, '')
        .replace(new RegExp(`SL ${loss}`, 'gi'), '');

    // Remove TP values
    command.split(' ').forEach((text) => {
        cleanedMessage = cleanedMessage.replace(text, '')
    })

    // Remove TP values more flexibly
    profits.forEach(profit => {
        // Remove the profit value, accounting for potential formatting differences
        let profitRegex = new RegExp(`TP ${profit.toString().replace('.', '\\.')}`, 'gi');
        cleanedMessage = cleanedMessage.replace(profitRegex, '');
        // Attempt to remove trailing .00 parts if they become isolated
        cleanedMessage = cleanedMessage.replace(/\.00\b/g, '');
    });
    //
    // Clean up any remaining identifiers and whitespace to isolate the trade value/range
    cleanedMessage = cleanedMessage.replace(/[^\d\.\/\s-]/g, '').trim();

    console.log('cleaned', cleanedMessage)

    // Assuming the trade values or range are now leading the cleaned message,
    // split by space, slash, or dash to account for different range formats
    let potentialRange = cleanedMessage.split(/\s+|[-\/]/).map(Number).filter(Boolean);

    // Determine and return the appropriate format based on the extracted numbers
    if (potentialRange.length > 1) {
        // Return as range if more than one number is found
        return potentialRange.slice(0, 2); // Take only the first two numbers for the range
    } else if (potentialRange.length === 1) {
        // Return a single number if only one is found
        return potentialRange[0];
    }

    throw new Error("No trade value or range found");
}

export function extractActions(message){
    const cleanedMessage = cleanMessage(message)

    const symbol = extractCurrency(cleanedMessage)

    const actionType = extractCommand(cleanedMessage);
    const profits = extractProfit(cleanedMessage); // Assuming this returns an array of TP values
    const stopLoss = extractLoss(cleanedMessage);

    const entry = extractTradeValue(cleanedMessage)

    return profits.map(takeProfit => ({
        entry,
        symbol,
        actionType,
        takeProfit,
        stopLoss
    }))
}

export default function reformatTradeMessages(message) {
    return extractActions(message)
}
