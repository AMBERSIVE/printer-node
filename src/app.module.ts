import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { ConfigurationModule } from './configuration/configuration.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

import { PrinterController } from './printer/printer.controller';

import configuration from './configuration/configuration';

import { PrinterModule } from './printer/printer.module';
import { PrinterjobService } from './printerjob/printerjob.service';
import { PrinterjobModule } from './printerjob/printerjob.module';

@Module({
  imports: [
    ConfigModule.forRoot({
        isGlobal: true,
        load: [configuration],
        envFilePath: ['.env']
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: __dirname + '/../database/database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ScheduleModule.forRoot(),
    PrinterModule,
    PrinterjobModule,
    ConfigurationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
