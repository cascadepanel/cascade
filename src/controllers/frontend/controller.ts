import { Controller, ClassMiddleware, Get } from '@overnightjs/core';
import Logger from '@ayana/logger';
import { Request, Response } from 'express';
import * as path from 'path';

@Controller('') // handles /
export class FrontendController {
    private logger: Logger;

    constructor() {
        this.logger = Logger.get(FrontendController);
    }

    @Get()
    public rootPageHandler(req: Request, res: Response) {
        return res.redirect('/login');
    }

    @Get('login')
    public loginHandler(req: Request, res: Response) {
        return this.sendReactFile(res, 'login');
    }

    private sendReactFile(res: Response, page: string) {
        return res.sendFile('./parcel/' + page + '.html', {
           root: path.join(__dirname, '../../..')
        });
    }
}