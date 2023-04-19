import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn,  OneToMany } from "typeorm";
import {User} from './Users'
import { Ticket } from "./Ticket";


@Entity()
export class Teams{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    group: string

    @ManyToMany(() => User, (user) => user.id)
    @JoinTable()
    users: Array<User>

    @OneToMany(() => Ticket, (ticket) => ticket.id)
    ticket: Array<Ticket>

}