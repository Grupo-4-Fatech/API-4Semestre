import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn,  OneToMany } from "typeorm";
import {User} from './Users'
import { Ticket } from "./Ticket";
import { Group } from "./Group";


@Entity()
export class Teams{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @ManyToOne(() => Group, (group) => group.id)
    group: Group;

    @ManyToMany(() => User, (user) => user.id)
    @JoinTable()
    users: Array<User>

    @OneToMany(() => Ticket, (ticket) => ticket.id)
    ticket: Array<Ticket>

}