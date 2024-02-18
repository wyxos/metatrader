export default function reformatTradeMessages(message) {
    const lines = message.split('\n');
    let actionLine = lines.find(line => /(BUY NOW|BUY|SELL NOW|SELL)/.test(line));
    if (!actionLine) {
        console.log('No recognizable action found in the message.');
        return [];
    }
    const symbolMatch = actionLine.match(/(\w{3}\w{3})/);
    const actionMatch = actionLine.match(/(BUY NOW|BUY|SELL NOW|SELL)/);

    // Check if the matches are not null before accessing
    if (!symbolMatch || !actionMatch) {
        console.log('No symbol or action could be matched in the action line.');
        return [];
    }

    let symbol = symbolMatch[0];
    let action = actionMatch[0];


    const instructions = [];
    let tps = []; // Temporarily store TP values until an SL is encountered
    let currentSL = 'N/A'; // Default SL value

    lines.forEach(line => {
        let tpMatch = line.match(/TP\d* ?:? ([\d.]+)/);
        let slMatch = line.match(/SL ?:? ([\d.]+)/) || line.match(/STOP LOSS ?:? ([\d.]+)/);

        if (tpMatch) {
            tps.push(tpMatch[1]); // Collect TP values
        }

        if (slMatch) {
            currentSL = slMatch[1]; // Update current SL with the most recent value
            // Apply current SL to all collected TP values and reset TP list
            tps.forEach(tp => instructions.push(`${symbol} ${action} TP ${tp} SL ${currentSL}`));
            tps = []; // Reset TP list after assigning them an SL
        }
    });

    // In case there are TP values with no following SL, assign them the last known SL value
    if (tps.length > 0 && currentSL !== 'N/A') {
        tps.forEach(tp => instructions.push(`${symbol} ${action} TP ${tp} SL ${currentSL}`));
    }

    // Remove duplicates
    let uniqueMessages = [...new Set(instructions)];

    console.log('Found the following instructions', uniqueMessages);

    return uniqueMessages;
}
