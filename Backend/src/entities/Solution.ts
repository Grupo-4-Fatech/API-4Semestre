import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, ManyToMany, JoinTable, JoinColumn, OneToOne } from "typeorm";
import { User } from "./Users";
import { Ticket } from "./Ticket";

@Entity()
export class Solution {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: ''})
    solution: string;

    @Column({nullable: true, default: ''})
    problem: string;

    @OneToOne(() => Ticket, (ticket) => ticket.id)
    @JoinColumn()
    ticket: Ticket;

}