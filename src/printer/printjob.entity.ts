import { Entity, Column, PrimaryGeneratedColumn, Generated, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Printjob {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    type: string

    @Column()
    url: string

    @Column({
        default: false
    })
    progress:boolean

    @Column({
        default: false
    })
    done:boolean

}