import { Column, Entity,  ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Ticket } from "./Ticket";
import { User } from "./Users";

@Entity()
export class Log{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @Column()
    action: string;

    @ManyToOne(() => Ticket, (ticket) => ticket.id)
    tickets = Array<Ticket>;

    @ManyToOne(() => User, (user) => user.id)
    users = User;

}