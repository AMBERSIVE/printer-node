import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrinterjobService } from './printerjob.service';
import { Printjob } from './printjob.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Printjob]),],
    controllers:[],
    providers: [
        {provide: 'CONFIG_OPTIONS', useValue: ConfigService}, 
        PrinterjobService
    ],
})
export class PrinterjobModule {

    configure(consumer: MiddlewareConsumer) {
    }
    
}

