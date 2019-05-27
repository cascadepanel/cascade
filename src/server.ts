import { Server } from '@overnightjs/core';
import { FrontendController } from './frontend/controller';
import Logger from '@ayana/logger';

import * as util from 'util';

export class CascadeServer extends Server {
    private logger: Logger;

    constructor() {
        super();

        const logger = this.logger = Logger.get(CascadeServer);

        this.app.use(require('morgan')('dev', {
            stream: {
                write(line: string) {
                    logger.debug(line.replace(/[\n\t\r]/g, ''));
                }
            }
        }));

        this.setupControllers();
    }

    private setupControllers() {
        const frontend = new FrontendController();

        const controllers = [frontend];

        this.logger.debug('Controllers registered: ' + util.inspect(controllers, false, 0, true));
        super.addControllers(controllers);
    }

    public start(port: number, callback: () => void) {
        this.app.listen(port, callback);
    }
}