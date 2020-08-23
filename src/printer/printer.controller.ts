import { Controller, Get, Post, Body, Res, Req, HttpStatus, Param, UseGuards, UsePipes, ValidationPipe, Delete, Query } from '@nestjs/common';
import { Response, Request } from 'express';
import { PrinterService } from './printer.service';
import { time } from 'console';

@Controller()
export class PrinterController {

    public allowedQueryStrings:Array<string> = [
        'active',
        'isDefault'
    ];

    constructor(
        private readonly printerService: PrinterService
    ) {
        
    }

    @Get("api/printer")
    async getPrinter(@Param() params, @Req() req: Request, @Res() res: Response, @Query("active") isActive, @Query('isDefault') isDefault) {

        let result = await this.printerService.findAll();

        if (result.length > 0) {
            
            if (isActive != undefined) {
                isActive = isActive == 'true';
                result = result.filter(item => {
                    if (item.active === isActive) {
                        return item;
                    }
                });
            }

            if (isDefault != undefined) {
                isDefault = isDefault == 'true';
                result = result.filter(item => {
                    if (item.isDefault === isDefault) {
                        return item;
                    }
                });
            }

        }

        res.status(HttpStatus.OK).json(result);

    }

    @Get("api/printer/:id")
    async getPrinterSingle(@Param() params, @Req() req: Request, @Res() res: Response) {

        let printer = await this.printerService.find(params.id ? params.id : null);

        if (printer === null || printer === undefined) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: `${params.id} cannot be found`
            });
        }

        res.status(HttpStatus.OK).json(printer);
    }

}
