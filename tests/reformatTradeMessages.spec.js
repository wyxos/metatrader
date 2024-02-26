import { describe, it, expect } from 'vitest';
import {
    cleanMessage, extractActions,
    extractCommand,
    extractCurrency,
    extractLoss,
    extractProfit, extractTradeValue
} from "../src/reformatTradeMessages.mjs";

describe('reformatTradeMessages', () => {
    it('should clean message', () => {
        const message = '#𝐆𝐎𝐋𝐃 SELL 2030 ' +
            'TP. 2026 ' +
            'TP. 2022 \n' +
            'TP. 2018 \n' +
            'TP. 2014 \n' +
            'TP. 2010 \n' +
            '❌SL. 2055'

        const formatted = cleanMessage(message)

        expect(formatted).toEqual('GOLD SELL 2030 TP 2026 TP 2022 TP 2018 TP 2014 TP 2010 SL 2055')
    })


    it('should clean message', () => {
        const message = '#𝐆𝐎𝐋𝐃 SELL 2030 ' +
            'TAKE PROFIT : 2026 ' +
            'TAKE PROFIT : 2022 \n' +
            'TAKE PROFIT : 2018 \n' +
            'TAKE PROFIT : 2014 \n' +
            'TAKE PROFIT : 2010 \n' +
            '❌STOP LOSS : 2055'

        const formatted = cleanMessage(message)

        expect(formatted).toEqual('GOLD SELL 2030 TP 2026 TP 2022 TP 2018 TP 2014 TP 2010 SL 2055')
    })

    it('should clean message', () => {
        const message = '#𝐆𝐎𝐋𝐃 SELL 2030 ' +
            'TP1 2026 ' +
            'TP2 2022 \n' +
            'TP3 2018 \n' +
            'TP4 2014 \n' +
            'TP5 2010 \n' +
            '❌SL. 2055'

        const formatted = cleanMessage(message)

        expect(formatted).toEqual('GOLD SELL 2030 TP 2026 TP 2022 TP 2018 TP 2014 TP 2010 SL 2055')
    })


    it('should clean message', () => {
        const message = '#𝐆𝐎𝐋𝐃 SELL 2030 ' +
            'TAKE PROFIT 1 : 2026 ' +
            'TAKE PROFIT 2 : 2022 \n' +
            'TAKE PROFIT 3 : 2018 \n' +
            'TAKE PROFIT 4 : 2014 \n' +
            'TAKE PROFIT 5 : 2010 \n' +
            '❌STOP LOSS : 2055'

        const formatted = cleanMessage(message)

        expect(formatted).toEqual('GOLD SELL 2030 TP 2026 TP 2022 TP 2018 TP 2014 TP 2010 SL 2055')
    })

    it('should clean message', () => {
        const message = 'XAUUSD SELL\n' +
            '@ 2030.60\n' +
            '\n' +
            'TP₁ 2028.00\n' +
            'TP₂ 2025.00\n' +
            'TP₃ 2020.00\n' +
            '\n' +
            'STOP LOSS 2035.00'

        const formatted = cleanMessage(message)

        expect(formatted).toEqual('XAUUSD SELL 2030.60 TP 2028.00 TP 2025.00 TP 2020.00 SL 2035.00')
    })

    it('should clean message', () => {
        const message = 'XAUUSD SELL\n' +
            '2030.60 2033.00\n' +
            '\n' +
            'TP1 2028.00\n' +
            'TP2 2025.00\n' +
            'TP3 2020.00\n' +
            '\n' +
            'SL 2035.00'

        const formatted = cleanMessage(message)

        expect(formatted).toEqual('XAUUSD SELL 2030.60 2033.00 TP 2028.00 TP 2025.00 TP 2020.00 SL 2035.00')
    })

    it('should clean message', () => {
        const message = '#𝐆𝐎𝐋𝐃 SELL 2030 TP. 2026 TP. 2022 TP. 2018 TP. 2014 TP. 2010 ❌SL. 2055'

        const formatted = cleanMessage(message)

        expect(formatted).toEqual('GOLD SELL 2030 TP 2026 TP 2022 TP 2018 TP 2014 TP 2010 SL 2055')
    })

    it('should clean message', () => {
        const message = 'XAUUSD SELL\n' +
            '2030.60 2033.00\n' +
            '\n' +
            'TP 2028.00\n' +
            'TP 2025.00\n' +
            'TP 2020.00\n' +
            '\n' +
            'STOP LOSS 2035.00'

        const formatted = cleanMessage(message)

        expect(formatted).toEqual('XAUUSD SELL 2030.60 2033.00 TP 2028.00 TP 2025.00 TP 2020.00 SL 2035.00')
    })

    it('should clean message', () => {
        const message = 'XAUUSD SELL\n' +
            '2030.60 2033.00\n' +
            '\n' +
            'TP₁ 2028.00\n' +
            'TP₂ 2025.00\n' +
            'TP₃ 2020.00\n' +
            '\n' +
            'STOP LOSS 2035.00'

        const formatted = cleanMessage(message)

        expect(formatted).toEqual('XAUUSD SELL 2030.60 2033.00 TP 2028.00 TP 2025.00 TP 2020.00 SL 2035.00')
    })


    it('should clean message', () => {
        const message = 'XAUUSD SELL\n' +
            '2030.60 2033.00\n' +
            '\n' +
            'TAKE PROFIT 2028.00\n' +
            'TAKE PROFIT 2025.00\n' +
            'TAKE PROFIT 2020.00\n' +
            '\n' +
            'STOP LOSS 2035.00'

        const formatted = cleanMessage(message)

        expect(formatted).toEqual('XAUUSD SELL 2030.60 2033.00 TP 2028.00 TP 2025.00 TP 2020.00 SL 2035.00')
    })

    it('should clean message', () => {
        const message = "GOLD SELL 2028-2031\n" +
            "\n" +
            "TP  2020.00\n" +
            "TP  2015.00\n" +
            "\n" +
            "SL  2035.00"

        const formatted = cleanMessage(message)

        expect(formatted).toEqual('GOLD SELL 2028-2031 TP 2020.00 TP 2015.00 SL 2035.00')
    })

    it('should clean message', () => {
        const message = `Sell Gold @2030.2-2034.2

        Sl :2036.2

        Tp1 :2028.7
        Tp2 :2026`

        const formatted = cleanMessage(message)

        expect(formatted).toEqual('SELL GOLD 2030.2-2034.2 SL 2036.2 TP 2028.7 TP 2026')
    })

    it('should extract take profit', () => {
        const message = 'XAUUSD SELL 2030.60 2033.00 TP 2028.00 TP 2025.00 TP 2020.00 SL 2035.00'

        const profits = extractProfit(message)

        expect(profits).toEqual([2028.00, 2025.00, 2020.00])
    });

    it('should extract stop loss', () => {
        const message = 'XAUUSD SELL 2030.60 2033.00 TP 2028.00 TP 2025.00 TP 2020.00 SL 2035.00'

        const profits = extractLoss(message)

        expect(profits).toEqual(2035.00)
    });

    it('should extract currency', () => {
        const message = 'XAUUSD SELL 2030.60 2033.00 TP 2028.00 TP 2025.00 TP 2020.00 SL 2035.00'

        const currency = extractCurrency(message)

        expect(currency).toEqual('XAUUSD')
    });

    it('should extract currency', () => {
        const message = 'SELL GOLD 2030.2-2034.2 SL 2036.2 TP 2028.7 TP 2026'

        const currency = extractCurrency(message)

        expect(currency).toEqual('XAUUSD')
    });

    it('should extract currency', () => {
        const message = '#𝐆𝐎𝐋𝐃 SELL 2030\n' +
            '\n' +
            'TP. 2026\n' +
            'TP. 2022\n' +
            'TP. 2018\n' +
            'TP. 2014\n' +
            'TP. 2010\n' +
            '\n' +
            '❌SL. 2055'

        let cleanedMessage = cleanMessage(message);

        console.log(cleanedMessage)

        const currency = extractCurrency(cleanedMessage)

        expect(currency).toEqual('XAUUSD')
    });

    it('should extract trading command', () => {
        let message = 'XAUUSD SELL 2030.60 2033.00 TP 2028.00 TP 2025.00 TP 2020.00 SL 2035.00'

        let currency = extractCommand(message)

        expect(currency).toEqual('SELL')

        message = 'XAUUSD SELL NOW 2030.60 2033.00 TP 2028.00 TP 2025.00 TP 2020.00 SL 2035.00'

        currency = extractCommand(message)

        expect(currency).toEqual('SELL')

        message = 'SELL XAUUSD NOW 2030.60 2033.00 TP 2028.00 TP 2025.00 TP 2020.00 SL 2035.00'

        currency = extractCommand(message)

        expect(currency).toEqual('SELL')

        message = 'SELL NOW XAUUSD 2030.60 2033.00 TP 2028.00 TP 2025.00 TP 2020.00 SL 2035.00'

        currency = extractCommand(message)

        expect(currency).toEqual('SELL')

        message = 'BUY NOW XAUUSD 2030.60 2033.00 TP 2028.00 TP 2025.00 TP 2020.00 SL 2035.00'

        currency = extractCommand(message)

        expect(currency).toEqual('BUY')

        message = 'buy XAUUSD 2030.60 2033.00 TP 2028.00 TP 2025.00 TP 2020.00 SL 2035.00'

        currency = extractCommand(message)

        expect(currency).toEqual('BUY')
    });

    it('should extract trade value', () => {
        const message = 'BUY NOW XAUUSD 2030.60 TP 2028.00 TP 2025.00 TP 2020.00 SL 2035.00'

        const value = extractTradeValue(message)

        expect(value).toEqual(2030.60)
    });

    it('should extract trade value', () => {
        const message = 'BUY NOW XAUUSD @ 2030.60 TP 2028.00 TP 2025.00 TP 2020.00 SL 2035.00'

        const value = extractTradeValue(message)

        expect(value).toEqual(2030.60)
    });

    it('should extract trade range value', () => {
        const message = 'BUY NOW XAUUSD @ 2030.60 - 2033.00 TP 2028.00 TP 2025.00 TP 2020.00 SL 2035.00'

        const value = extractTradeValue(message)

        expect(value).toEqual([2030.60, 2033.00])
    });

    it('should extract trade range value', () => {
        const message = 'BUY NOW XAUUSD @ 2030.60 2033.00 TP 2028.00 TP 2025.00 TP 2020.00 SL 2035.00'

        const value = extractTradeValue(message)

        expect(value).toEqual([2030.60, 2033.00])
    });

    it('should extract actions', () => {
        const message = 'XAUUSD SELL\n' +
            '2030.60 2033.00\n' +
            '\n' +
            'TP 2028.00\n' +
            'TP 2025.00\n' +
            'TP 2020.00\n' +
            '\n' +
            'STOP LOSS 2035.00'

        const actions = extractActions(message)

        expect(actions).toEqual([
            {
                actionType: 'SELL',
                symbol: 'XAUUSD',
                entry: [2030.60, 2033.00],
                takeProfit: 2028.00,
                stopLoss: 2035.00
            },
            {
                actionType: 'SELL',
                symbol: 'XAUUSD',
                entry: [2030.60, 2033.00],
                takeProfit: 2025.00,
                stopLoss: 2035.00
            },
            {
                actionType: 'SELL',
                symbol: 'XAUUSD',
                entry: [2030.60, 2033.00],
                takeProfit: 2020.00,
                stopLoss: 2035.00
            }
        ])
    })

    it('should extract actions', () => {
        const message = 'XAUUSD SELL\n' +
            '2030.60' +
            '\n' +
            'TP 2028.00\n' +
            'TP 2025.00\n' +
            'TP 2020.00\n' +
            '\n' +
            'STOP LOSS 2035.00'

        const actions = extractActions(message)

        expect(actions).toEqual([
            {
                actionType: 'SELL',
                symbol: 'XAUUSD',
                entry: 2030.60,
                takeProfit: 2028.00,
                stopLoss: 2035.00
            },
            {
                actionType: 'SELL',
                symbol: 'XAUUSD',
                entry: 2030.60,
                takeProfit: 2025.00,
                stopLoss: 2035.00
            },
            {
                actionType: 'SELL',
                symbol: 'XAUUSD',
                entry: 2030.60,
                takeProfit: 2020.00,
                stopLoss: 2035.00
            }
        ])
    })
});
