import Logger, { LogLevel } from '@ayana/logger';
import { CascadeServer } from './server';
import TOML from 'toml';
import * as path from 'path';
import * as fs from 'fs';
import Configuration from './configuration';

const cascadeLogger = Logger.get('bootstrap');

var config: Configuration;

try {
    config = TOML.parse(fs.readFileSync(path.join(__dirname, '../config.toml'), 'utf-8')) as Configuration;
} catch (e) {
    cascadeLogger.error('Failed to load config.');
    cascadeLogger.error(new Error(e)); // wrap to prevent crashes
    process.exit(-1);
}

if (config.debug) {
    Logger.getDefaultTransport().setLevel(LogLevel.DEBUG); // globally sets the min log level to debug, in production this doesn't happen
    cascadeLogger.warn('Cascade is running in development mode. Set the "debug" property in the config file to false to disable debug output.');
}

cascadeLogger.info('Cascade is starting now.');

const server = new CascadeServer();
server.start(config.port, () => {
    cascadeLogger.info(`Running on port ${config.port}.`);
});