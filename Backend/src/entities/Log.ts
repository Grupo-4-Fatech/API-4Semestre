import { Column, Entity,  JoinColumn,  JoinTable,  ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @Column({nullable: true, default: ""})
    value: string;

    @ManyToOne(() => Ticket, (ticket) => ticket.id)
    tickets: Array<Ticket>;

    @ManyToOne(() => User, (user) => user.id)
    @JoinTable()
    users: User;

}