import { Controller, Get, Post, Body, Res, Req, HttpStatus, Param, UseGuards, UsePipes, ValidationPipe, Delete } from '@nestjs/common';
import { Response, Request } from 'express';


@Controller()
export class PrinterController {

    @Get("api/printer")
    async getPrinter(@Param() params, @Req() req: Request, @Res() res: Response) {

        let result = {};

        res.status(HttpStatus.OK).json(result);

    }

}
