export function parseTradeMessage(message) {
    // Updated regex to capture dynamic buy/sell instructions and an optional entry value
    const regex = /(\w{3}\w{3}) (BUY NOW|BUY|SELL NOW|SELL) ?([\d.]*) TP ([\d.]+) SL ([\d.]+)(?: levier (\d+)x)?/;

    const match = message.match(regex);

    console.log('Message match', message)

    if (match) {
        let symbol = match[1];
        let actionType = match[2].startsWith('BUY') ? 'ORDER_TYPE_BUY' : 'ORDER_TYPE_SELL';
        let entry = match[3] ? parseFloat(match[3]) : 0; // Default to 0 if no entry value is provided
        let takeProfit = parseFloat(match[4]);
        let stopLoss = parseFloat(match[5]);
        // let volume = match[6] || 0.01;
        let volume = 0.01;

        let parsed = {
            actionType: actionType,
            symbol: symbol,
            entry: entry,
            takeProfit: takeProfit,
            stopLoss: stopLoss,
            volume: volume
        };

        console.log('Parsed output:', parsed)

        return parsed;
    } else {
        console.error('The message received does not match the format.')
        return null;
    }
}
