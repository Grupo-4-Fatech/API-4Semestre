import {Entity, Column, PrimaryGeneratedColumn} from  'typeorm'

@Entity()
export class Call {
    @PrimaryGeneratedColumn()
    id: number

    @Column( {})
    title: string;

    @Column( {})
    type: string;

    @Column({})
    description: string;

    @Column( {})
    status: string;

} 