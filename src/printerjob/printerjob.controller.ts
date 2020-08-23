import { Controller, Get, Param, Req, Res, HttpStatus } from '@nestjs/common';
import { PrinterjobService } from './printerjob.service';
import { Response, Request } from 'express';

@Controller()
export class PrinterjobController {

    constructor(
        private readonly printerjobService: PrinterjobService
    ) {
        
    }

    @Get("api/printer/:id/jobs")
    async getPrinterJobs(@Param() params, @Req() req: Request, @Res() res: Response) {

        let jobs = await (await this.printerjobService.findAll()).filter(item => {
            if (item.printer_id) {
                return item;
            }
        });

        return res.status(HttpStatus.OK).json(jobs); 

    }

}
