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
    inProgress:boolean

    @Column({
        default: false
    })
    isDone:boolean

    @Column({
        default: false
    })
    hasError:boolean

}