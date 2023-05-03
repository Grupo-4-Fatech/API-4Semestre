import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { User } from "./Users";
import { Ticket } from "./Ticket";

@Entity()
export class Solution {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    problem: string;

    @ManyToOne(() => User, (user) => user.id)
    user: User;

    @ManyToMany(() => Ticket, (ticket) => ticket.id)
    @JoinTable()
    ticket: Array<Ticket>

    

}