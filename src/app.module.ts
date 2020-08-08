import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { ConfigurationModule } from './configuration/configuration.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { PrinterController } from './printer/printer.controller';

import configuration from './configuration/configuration';


import { PrinterModule } from './printer/printer.module';

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
    PrinterModule,
    ConfigurationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
