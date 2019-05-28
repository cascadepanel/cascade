import { Controller, ClassMiddleware, Get } from '@overnightjs/core';
import * as path from 'path';

import Logger from '@ayana/logger';

import { Response } from 'express';


@Controller('/')
export class FrontendController {
    private logger: Logger;

    constructor() {
        this.logger = Logger.get(FrontendController);
    }

    @Get('/')
    public rootPageHandler(req: Request, res: Response) {
    }
}