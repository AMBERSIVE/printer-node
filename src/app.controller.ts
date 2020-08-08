import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

const printer = require("pdf-to-printer");

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
     
  }

}
