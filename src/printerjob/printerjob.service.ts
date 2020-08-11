import { Injectable } from '@nestjs/common';
import { CronExpression, Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

import { UpdateResult, DeleteResult } from  'typeorm';
import { Printjob } from './printjob.entity';

const ptp = require("pdf-to-printer");
const fs = require('fs');
const request = require('request');
const SHA2 = require("sha2");

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
        
        console.log(`Jobs found: ${jobs.length}`);

        jobs.forEach(job => {
            this.print(job);
        });
        // TODO: handle the printer queue
    }

    /**
     * Download a file from url and store it in the temp folder
     * @param url 
     */
    async downloadFile(url: string): Promise<string> {

        let id = SHA2.SHA_224(url);

        return new Promise((resolve, reject) => {
            try {
                request.head(url, (err, res, body) => {
                    request(url)
                    .pipe(fs.createWriteStream(`temp/${id.toString("hex")}.pdf`))
                    .on('close', () => {
                        resolve(id.toString("hex"));
                    })
                });
            } catch (err) {
                reject(null);
            }
        })
    }

    async print(job: Printjob) {

        let id: string = await this.downloadFile(job.url);

        // Mark document to be in print job line
        job.inProgress = true;
        this.update(job);

        try {

            await ptp.print(`temp/${id}.pdf`);
            fs.unlinkSync(`temp/${id}.pdf`);

            // Mark document as printed
            job.inProgress = false;
            job.isDone = true;
            this.update(job);

        } catch(err) {

            console.error(err);

        }

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
