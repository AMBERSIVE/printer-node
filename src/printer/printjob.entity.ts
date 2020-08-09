import { Entity, Column, PrimaryGeneratedColumn, Generated, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Printjob {

    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    url: string

    @Column()
    printed:boolean

}