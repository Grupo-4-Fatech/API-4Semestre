import {Entity, Column, PrimaryGeneratedColumn} from  'typeorm'

@Entity({name:"call"})
export class Call {
    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar2", {length: 200})
    title: string;

    @Column("varchar2", {length: 12})
    type: string;

    @Column("varchar2", {length: 600})
    description: string;

    @Column("varchar2", {length: 10})
    status: string;

} 