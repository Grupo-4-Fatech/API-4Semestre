import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ticket } from "./Ticket";

@Entity()
export class Interested {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @ManyToMany(() => Ticket, (ticket) => ticket.id)
    @JoinTable()
    tickets: Ticket

}