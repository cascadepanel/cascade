import Logger, { LogLevel } from '@ayana/logger';
import { CascadeServer } from './server';

const cascadeLogger = Logger.get('bootstrap');

if (process.env.NODE_ENV !== 'production') {
    Logger.getDefaultTransport().setLevel(LogLevel.DEBUG); // globally sets the min log level to debug, in production this doesn't happen
    cascadeLogger.warn('Cascade is running in development mode. Set NODE_ENV to "production" to disable debug output.');

    // this is a hack
    global.console.info = (str: string) => { // express-vue uses this (annoyingly)
        cascadeLogger.debug(str);
    };
} else {
    global.console.info = () => {}; // mutes express-vue
}

cascadeLogger.info('Cascade is starting now.');

const server = new CascadeServer();
server.start(8000, () => {
    cascadeLogger.info('Cascade is running on port 8000.');
});