import Logger, { LogLevel } from '@ayana/logger';
import { CascadeServer } from './server';
import TOML from 'toml';
import * as path from 'path';
import Configuration from './configuration';

const cascadeLogger = Logger.get('bootstrap');
const config = TOML.parse(path.join(__dirname, '../config.toml')) as Configuration;

if (config.debug) {
    Logger.getDefaultTransport().setLevel(LogLevel.DEBUG); // globally sets the min log level to debug, in production this doesn't happen
    cascadeLogger.warn('Cascade is running in development mode. Set the "debug" property in the config file to false to disable debug output.');
}

cascadeLogger.info('Cascade is starting now.');

const server = new CascadeServer();
server.start(config.port, () => {
    cascadeLogger.info(`Running on port ${config.port}.`);
});