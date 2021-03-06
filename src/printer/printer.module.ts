import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrinterController } from './printer.controller';
import { Printer } from './printer.entity';
import { PrinterService } from './printer.service';
import { PrinterjobModule } from 'src/printerjob/printerjob.module';
import { PrinterjobService } from 'src/printerjob/printerjob.service';

@Module({
    imports:[TypeOrmModule.forFeature([Printer])],
    controllers:[PrinterController],
    providers: [
        {provide: 'CONFIG_OPTIONS', useValue: ConfigService}, 
        PrinterService
    ],
})
export class PrinterModule {

    configure(consumer: MiddlewareConsumer) {
    }
    
}
