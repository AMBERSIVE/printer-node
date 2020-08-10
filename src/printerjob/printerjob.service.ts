import { Injectable } from '@nestjs/common';
import { CronExpression, Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

import { UpdateResult, DeleteResult } from  'typeorm';
import { Printjob } from './printjob.entity';

@Injectable()
export class PrinterjobService {

    constructor(
        @InjectRepository(Printjob)
            private repository: Repository<Printjob>,
            private configService: ConfigService
        ) {}

    @Cron(CronExpression.EVERY_5_SECONDS)
    async handlePrintQueue() {
        let jobs = await this.repository.find({isDone: false, inProgress: false});
        // TODO: handle the printer queue
    }

    async findAll(): Promise<Printjob[]> {
        return await this.repository.find();
    }
  
    async find(Id: string): Promise<Printjob> {
        return await this.repository.findOne(Id);
    }
  
    async create(Printjob: Printjob): Promise<Printjob> {
        return await this.repository.save(Printjob);
    }
  
    async update(Printjob: Printjob): Promise<UpdateResult> {
        return await this.repository.update(Printjob.id, Printjob);
    }
  
    async delete(id): Promise<DeleteResult> {
        return await this.repository.delete(id);
    }

}
