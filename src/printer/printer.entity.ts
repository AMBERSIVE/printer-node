import { Entity, Column, PrimaryGeneratedColumn, Generated, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Printer {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @CreateDateColumn({type: "date"})
    created_at: Date;

    @UpdateDateColumn({type: "date"})
    updated_at: Date;

    @Column({ default: false })
    active: boolean

}