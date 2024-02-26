const TelegramBot = require('node-telegram-bot-api');

// Replace 'YOUR_BOT_TOKEN' with your actual bot token
const bot = new TelegramBot('YOUR_BOT_TOKEN', { polling: true });

let sourceChatId = null;
let destinationChatId = null;
let savedMessages = [];

// Listen for commands
bot.onText(/\/setsource (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const newSourceChatId = match[1];

    // Set the new source chat ID
    sourceChatId = newSourceChatId;

    // Clear saved messages when changing the source chat ID
    savedMessages = [];

    // Send confirmation message
    bot.sendMessage(chatId, `Source chat ID set to: ${sourceChatId}`);
});

bot.onText(/\/setdestination (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const newDestinationChatId = match[1];

    // Set the new destination chat ID
    destinationChatId = newDestinationChatId;

    // Send confirmation message
    bot.sendMessage(chatId, `Destination chat ID set to: ${destinationChatId}`);
});

// Listen for the /menu command
bot.onText(/\/menu/, (msg) => {
    const chatId = msg.chat.id;
    const commands = [
        "/setsource [source chat ID] - Set the source chat ID",
        "/setdestination [destination chat ID] - Set the destination chat ID"
        // Add more commands as needed
    ];

    const menuMessage = "Available commands:\n" + commands.join("\n");

    // Send the menu message
    bot.sendMessage(chatId, menuMessage);
});

// Listen for messages from source chat
bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    // Check if the message is from the source chat
    if (String(chatId) === sourceChatId) {
        // Save the message
        savedMessages.push(msg);

        // Inform the user that the message is saved
        bot.sendMessage(chatId, "Message saved.");
    }
});

// Listen for the /send all command
bot.onText(/\/sendall/, (msg) => {
    const chatId = msg.chat.id;

    // Check if there are saved messages
    if (savedMessages.length > 0) {
        // Iterate through saved messages
        savedMessages.forEach((msg, index) => {
            // Remove formatting from the message text
            const plainText = msg.text ? msg.text.replace(/<\/?[^>]+(>|$)/g, "") : "";

            // Send the plain text to the destination chat
            bot.sendMessage(destinationChatId, plainText)
                .then(() => {
                    // Remove the sent message from savedMessages array
                    savedMessages.splice(index, 1);
                })
                .catch((error) => {
                    console.error("Error sending message:", error);
                    bot.sendMessage(chatId, "Failed to send message. Please try again later.");
                });
        });

        // Inform the user that all messages have been sent
        bot.sendMessage(chatId, "All saved messages sent.");
    } else {
        // Inform the user that no messages are saved
        bot.sendMessage(chatId, "No messages are saved.");
    }
});
