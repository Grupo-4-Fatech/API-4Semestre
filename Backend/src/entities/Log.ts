import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ticket } from "./Ticket";

@Entity()
export class Log{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: number;

    @Column()
    action: string;

    @ManyToMany(() => Ticket, (ticket) => ticket.id)
    tickets = Array<Ticket>;

}