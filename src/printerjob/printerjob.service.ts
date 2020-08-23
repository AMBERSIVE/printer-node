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
        @InjectRepository(Printjob) private repository: Repository<Printjob>,
        private configService: ConfigService
        ) {}

    @Cron(CronExpression.EVERY_5_SECONDS)
    async handlePrintQueue() {

        let jobs = await this.repository.find({isDone: false, inProgress: false});
        
        console.log(`[PRINTER:INFO] Jobs found: ${jobs.length}`);

        jobs.forEach(async (job) => {

            let success = false;
            
            try {
                success = await this.print(job);
            } catch(err) {
                success = false;
                console.log('EROR');
            }

            if (success === false) {
                console.error(`[PRINTER:ERROR]: Service was not able to print the document (Job ID: ${job.id})`);
                job.inProgress = false;
                this.update(job);
            }

        });
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

    /**
     * Print a document
     * @param job 
     */
    async print(job: Printjob): Promise<boolean> {

        return new Promise(async(resolve, reject) => {

            let id: string = '';

            switch(job.type) {
                case 'api':
                    id = await this.downloadFile(job.url);
                    break;
                default:
                    break;
            }

            if (id === '') {
                reject('Unsupported type.');
                job.isDone = true;
                job.hasError = true;
                this.update(job);
                return;
            }

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

                resolve(true);

            } catch(err) {
                console.error(err);
                reject(err);
            }

        })

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
