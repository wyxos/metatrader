/* eslint-disable max-len */
let MetaApi = require('metaapi.cloud-sdk').default;

// Note: for information on how to use this example code please read https://metaapi.cloud/docs/client/usingCodeExamples

let token = process.env.TOKEN || 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJiMGM5MzllYThkMmYzZjRkNGFiMmU1MjdjMWYxY2VjNCIsInBlcm1pc3Npb25zIjpbXSwiYWNjZXNzUnVsZXMiOlt7ImlkIjoidHJhZGluZy1hY2NvdW50LW1hbmFnZW1lbnQtYXBpIiwibWV0aG9kcyI6WyJ0cmFkaW5nLWFjY291bnQtbWFuYWdlbWVudC1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciIsIndyaXRlciJdLCJyZXNvdXJjZXMiOlsiKjokVVNFUl9JRCQ6KiJdfSx7ImlkIjoibWV0YWFwaS1yZXN0LWFwaSIsIm1ldGhvZHMiOlsibWV0YWFwaS1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciIsIndyaXRlciJdLCJyZXNvdXJjZXMiOlsiKjokVVNFUl9JRCQ6KiJdfSx7ImlkIjoibWV0YWFwaS1ycGMtYXBpIiwibWV0aG9kcyI6WyJtZXRhYXBpLWFwaTp3czpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciIsIndyaXRlciJdLCJyZXNvdXJjZXMiOlsiKjokVVNFUl9JRCQ6KiJdfSx7ImlkIjoibWV0YWFwaS1yZWFsLXRpbWUtc3RyZWFtaW5nLWFwaSIsIm1ldGhvZHMiOlsibWV0YWFwaS1hcGk6d3M6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbIio6JFVTRVJfSUQkOioiXX0seyJpZCI6Im1ldGFzdGF0cy1hcGkiLCJtZXRob2RzIjpbIm1ldGFzdGF0cy1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciJdLCJyZXNvdXJjZXMiOlsiKjokVVNFUl9JRCQ6KiJdfSx7ImlkIjoicmlzay1tYW5hZ2VtZW50LWFwaSIsIm1ldGhvZHMiOlsicmlzay1tYW5hZ2VtZW50LWFwaTpyZXN0OnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIiwid3JpdGVyIl0sInJlc291cmNlcyI6WyIqOiRVU0VSX0lEJDoqIl19LHsiaWQiOiJjb3B5ZmFjdG9yeS1hcGkiLCJtZXRob2RzIjpbImNvcHlmYWN0b3J5LWFwaTpyZXN0OnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIiwid3JpdGVyIl0sInJlc291cmNlcyI6WyIqOiRVU0VSX0lEJDoqIl19LHsiaWQiOiJtdC1tYW5hZ2VyLWFwaSIsIm1ldGhvZHMiOlsibXQtbWFuYWdlci1hcGk6cmVzdDpkZWFsaW5nOio6KiIsIm10LW1hbmFnZXItYXBpOnJlc3Q6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbIio6JFVTRVJfSUQkOioiXX1dLCJ0b2tlbklkIjoiMjAyMTAyMTMiLCJpbXBlcnNvbmF0ZWQiOmZhbHNlLCJyZWFsVXNlcklkIjoiYjBjOTM5ZWE4ZDJmM2Y0ZDRhYjJlNTI3YzFmMWNlYzQiLCJpYXQiOjE2ODc2Mjc0NDZ9.lv1Jr-1PbCjPFWDAe03z2HCGWpaBC1i5z3bWa5WvbxKhTsbFSAoFyN6snX3uAvEd1RXmepy4SjQ3aUcCJNtfdDsm9P98uIHm5vSWzZf0QK8bSRoG4KL1UXqO8pFchtBdvzb9vWZKWkBMWKub_CQhpT6lw-GAOeM2NA_tWwXSfqbk3sUJkvj3ZAaO3FWWfdT9D0zCjyBDyV5GJW8apVnBXvFMUi8Fes8SQEzgSlyBbe7UUwiyPQ86uQHTkeRo0DnQ96ctBKXb8C8Cp0szuO9imJEg-EOAgLgInHDxBI8ia1Lm_4MNLahnG9GKWA79lTRoKZpQ99f5sQxDbdRk3mfj5EwJITkmJPT_7Yin6dXdVuGzawjI3y3FIhY6Bt614Y53Tgly5CLq87PNj34uMEvXbrJ2z6Oo3NXnHckN6offu9D9Bb1JRfOAIXtvoKl1Z7NnxOqy9KNPRGhps4ItgsnC2kjppsfhrHF8elwlRbnhrTllbFHlj5eSaklr8-LiA0oeojq4ZlTNLXmoJ3zgmCj6pv84qrcK4lxyHUDoJAbF3_iq2ZXDHpTD9RamAI3wNv3s9lO637XakT8U4KhQxHGhWhfIf01d8PlSd5KDkGHcgkOg7VMQ-Pt9PAoC89JfEOjUqy-c44tbUWb1iKpoNfGZYLOGwopqscW_DJrU_E4Xxyg';
let login = process.env.LOGIN || "Here should be the login of the server";
let password = process.env.PASSWORD || 'The password of the server';
let serverName = process.env.SERVER || 'Sandbox server';

//
const api = new MetaApi(token);

// eslint-disable-next-line max-statements
export default async function testMetaApiSynchronization(command) {
    try {
        // Add test MetaTrader account
        let accounts = await api.metatraderAccountApi.getAccounts();
        let account = accounts.find(a => a.login === login && a.type.startsWith('cloud'));
        if (!account) {
            console.log('Adding MT5 account to MetaApi');
            account = await api.metatraderAccountApi.createAccount({
                name: 'Test account',
                type: 'cloud',
                login: login,
                password: password,
                server: serverName,
                platform: 'mt5',
                magic: 1000
            });
        } else {
            console.log('MT5 account already added to MetaApi', account.id);
        }

        // wait until account is deployed and connected to broker
        // eslint-disable-next-line semi
        console.log('Deploying account');
        await account.deploy();
        // eslint-disable-next-line semi
        console.log('Waiting for API server to connect to broker (may take couple of minutes)');
        await account.waitConnected();

        // connect to MetaApi API
        let connection = account.getRPCConnection();
        await connection.connect();

        // wait until terminal state synchronized to the local state
        console.log('Waiting for SDK to synchronize to terminal state (may take some time depending on your history size)');
        await connection.waitSynchronized();

        // invoke RPC API (replace ticket numbers with actual ticket numbers which exist in your MT account)
        console.log('Testing MetaAPI RPC API');
        console.log('account information:', await connection.getAccountInformation());
        console.log('positions:', await connection.getPositions());
        //console.log(await connection.getPosition('1234567'));
        console.log('open orders:', await connection.getOrders());
        //console.log(await connection.getOrder('1234567'));
        console.log('history orders by ticket:', await connection.getHistoryOrdersByTicket('1234567'));
        console.log('history orders by position:', await connection.getHistoryOrdersByPosition('1234567'));
        console.log('history orders (~last 3 months):', await connection.getHistoryOrdersByTimeRange(new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), new Date()));
        console.log('history deals by ticket:', await connection.getDealsByTicket('1234567'));
        console.log('history deals by position:', await connection.getDealsByPosition('1234567'));
        console.log('history deals (~last 3 months):', await connection.getDealsByTimeRange(new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), new Date()));
        console.log('server time', await connection.getServerTime());

        // calculate margin required for trade
        console.log('margin required for trade', await connection.calculateMargin({
            symbol: 'GBPUSD',
            type: 'ORDER_TYPE_BUY',
            volume: 0.1,
            openPrice: 1.1
        }));

        // trade
        console.log('Submitting pending order');
        try {
            let result = await
                connection.createLimitBuyOrder('GBPUSD', command.volume, command.openPrice, command.stopLoss, command.takeProfit, {
                    comment: 'comm',
                    clientId: 'TE_GBPUSD_7hyINWqAlE'
                });
            console.log('Trade successful, result code is ' + result.stringCode);
        } catch (err) {
            console.log('Trade failed with result code ' + err.stringCode);
        }

        // finally, undeploy account after the test
        console.log('Undeploying MT5 account so that it does not consume any unwanted resources');
        await connection.close();
        await account.undeploy();
    } catch (err) {
        // process errors
        if(err.details) {
            // returned if the server file for the specified server name has not been found
            // recommended to check the server name or create the account using a provisioning profile
            if(err.details === 'E_SRV_NOT_FOUND') {
                console.error(err);
                // returned if the server has failed to connect to the broker using your credentials
                // recommended to check your login and password
            } else if (err.details === 'E_AUTH') {
                console.log(err);
                // returned if the server has failed to detect the broker settings
                // recommended to try again later or create the account using a provisioning profile
            } else if (err.details === 'E_SERVER_TIMEZONE') {
                console.log(err);
            }
        }
        console.error(err);
    }
    process.exit();
}
