import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrinterjobService } from './printerjob.service';
import { Printjob } from './printjob.entity';
import { PrinterjobController } from './printerjob.controller';

@Module({
    imports:[TypeOrmModule.forFeature([Printjob]),],
    controllers:[PrinterjobController],
    providers: [
        {provide: 'CONFIG_OPTIONS', useValue: ConfigService}, 
        PrinterjobService
    ],
})
export class PrinterjobModule {

    configure(consumer: MiddlewareConsumer) {
    }
    
}

