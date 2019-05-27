import { Controller, ClassMiddleware, Get } from '@overnightjs/core';
import * as ExpressVue from 'express-vue';
import * as path from 'path';

import Logger from '@ayana/logger';

import { Response } from 'express';

const vue = ExpressVue.init({
    rootPath: path.join(__dirname, '../../vue') // this is the 'vue' directory in the root of the project
} as any) as any; // poor typings unfortunately

@Controller('/')
@ClassMiddleware([vue])
export class FrontendController {
    private logger: Logger;

    constructor() {
        this.logger = Logger.get(FrontendController);
    }

    @Get('/')
    public rootPageHandler(req: Request, res: ExpressVueResponse) {
        res.renderVue('home.vue');
    }
}

// custom typedefs due to Response not having .renderVue

interface ExpressVueResponse extends Response {
    renderVue(componentPath: string, data?: any, vueOptions?: any): void;
}