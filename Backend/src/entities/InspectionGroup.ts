import { Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Teams } from "./Teams";
import { Ticket } from "./Ticket";


@Entity()
export class InspectionGroup{
    @PrimaryGeneratedColumn()
    id: number

@OneToOne(() => Teams)
@JoinColumn()
teams: Teams

@ManyToMany(() => Ticket, (ticket) => ticket.id)
@JoinTable()
ticket: Ticket[]

}