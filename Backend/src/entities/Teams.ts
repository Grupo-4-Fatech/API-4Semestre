import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ticket } from "./Ticket";


@Entity()
export class Teams{
    @PrimaryGeneratedColumn()
    id: number


    @ManyToMany(() => Ticket, (ticket) => ticket.id)
    @JoinTable()
    tickets: Ticket[]

}