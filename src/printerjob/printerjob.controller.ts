import { Controller, Get, Param, Req, Res, HttpStatus } from '@nestjs/common';
import { PrinterjobService } from './printerjob.service';
import { Response, Request } from 'express';
import { Printjob } from './printjob.entity';

@Controller()
export class PrinterjobController {

    constructor(
        private readonly printerjobService: PrinterjobService
    ) {
        
    }

    @Get("api/printer/:id/jobs")
    async getPrinterJobs(@Param() params, @Req() req: Request, @Res() res: Response) {

        let jobs = await this.printerjobService.findEntries({printer_id: params.id});

        return res.status(HttpStatus.OK).json(jobs); 

    }

}
