import { Injectable } from '@nestjs/common';
import { CronExpression, Cron } from '@nestjs/schedule';
import { Printer } from './printer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

import { UpdateResult, DeleteResult } from  'typeorm';

const ptp = require("pdf-to-printer");

@Injectable()
export class PrinterService {

    constructor(
        @InjectRepository(Printer)
            private repository: Repository<Printer>,
            private configService: ConfigService
        ) {}

    @Cron(CronExpression.EVERY_5_SECONDS)
    async handleCron() {

        let printerList = await ptp.getPrinters();
        let printerSaved = await this.findAll();

        printerList.forEach(async (printer) => {
            try {
                let entry = await this.repository.findOne({name: printer});

                if (!entry) {
                    let newPrinter = new Printer();
                    newPrinter.name = printer;
                    newPrinter.active = true
                    this.create(newPrinter);
                }
            } catch(err) {

            }
        });

        // Deactivate printer which are not available
        printerSaved.forEach(async (item) => {

            if (printerList.indexOf(item.name) > -1) {
                item.active = true;
                this.update(item);
                return;
            }

            item.active = false;
            this.update(item);
            

        });
    }

    async  findAll(): Promise<Printer[]> {
        return await this.repository.find();
    }
  
    async find(Id: string): Promise<Printer> {
      return await this.repository.findOne(Id);
    }
  
    async  create(printer: Printer): Promise<Printer> {
        console.log('CREATE');
        console.log(printer);
        return await this.repository.save(printer);
    }
  
    async update(printer: Printer): Promise<UpdateResult> {
        return await this.repository.update(printer.id, printer);
    }
  
    async delete(id): Promise<DeleteResult> {
        return await this.repository.delete(id);
    }

}
