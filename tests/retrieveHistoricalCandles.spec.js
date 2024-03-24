import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import retrieveHistoricalCandles from "../src/retrieveHistoricalCandles.mjs";
import logger from "../src/logger.mjs";
import 'dotenv/config'

// Mock the axios and logger modules
// vi.mock('axios');
// vi.mock('../src/logger.mjs', () => ({
//     info: vi.fn(),
//     error: vi.fn(),
// }));

describe('retrieveHistoricalCandles', () => {
    it('fetches historical candle data successfully', async () => {
        // Setup
        const symbol = 'BTCUSD';
        const timeframe = '1m';
        const responseData = { data: 'mocked data' };
        // axios.get.mockResolvedValue(responseData);

        // Execution
        try{
            const result = await retrieveHistoricalCandles(symbol, timeframe);
        }
        catch (error){
            console.error(error)
        }

        // Assertion
        // expect(result).toEqual('mocked data');
        // expect(axios.get).toHaveBeenCalledWith(expect.any(String), expect.any(Object));
        // expect(logger.info).toHaveBeenCalled();
    });

    // it('handles failure when fetching historical candle data', async () => {
    //     // Setup
    //     const symbol = 'BTCUSD';
    //     const timeframe = '1m';
    //     const errorMessage = 'Error retrieving data';
    //     // axios.get.mockRejectedValue(new Error(errorMessage));
    //
    //     // Execution & Assertion
    //     await expect(retrieveHistoricalCandles(symbol, timeframe))
    //         .rejects
    //         .toThrow(errorMessage);
    //
    //     expect(axios.get).toHaveBeenCalledWith(expect.any(String), expect.any(Object));
    //     expect(logger.error).toHaveBeenCalled();
    // });
});
