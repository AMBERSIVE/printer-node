import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrinterController } from './printer.controller';
import { Printer } from './printer.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Printer]),],
    controllers:[PrinterController],
    providers: [{provide: 'CONFIG_OPTIONS', useValue: ConfigService},],
})
export class PrinterModule {

    configure(consumer: MiddlewareConsumer) {
    }
    
}
