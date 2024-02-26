// Import the promisify utility from the 'util' module to work with promises
import { promisify } from 'util';
import { exec } from 'child_process';

// Promisify the exec function so we can use it with async/await
const execAsync = promisify(exec);

async function runCommands() {
    try {
        // Run 'git pull' to update your local repository
        const { stdout: gitPullOutput } = await execAsync('git pull');
        console.log('Git Pull Output:', gitPullOutput);

        // Flush PM2 logs
        const { stdout: pm2FlushLogsOutput } = await execAsync('pm2 flush');
        console.log('PM2 Flush Logs Output:', pm2FlushLogsOutput);

        // Restart all PM2 processes
        const { stdout: pm2RestartAllOutput } = await execAsync('pm2 restart all');
        console.log('PM2 Restart All Output:', pm2RestartAllOutput);
    } catch (error) {
        // Log any errors that occur during the execution of the commands
        console.error('An error occurred:', error);
    }
}

// Run the function to execute the commands
runCommands();
