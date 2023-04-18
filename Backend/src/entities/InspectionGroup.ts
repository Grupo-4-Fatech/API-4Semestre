import { Entity, Column, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Teams } from "./Teams";
import { Ticket } from "./Ticket";
import { User } from "./Users";


@Entity()
export class InspectionGroup {
    @PrimaryGeneratedColumn()
    id: number

    @Column({})
    funcao: String

    @Column({})
    descricao: String

    @OneToMany(()=> Ticket, (ticket)=> ticket.inspectionGroups)
    @JoinTable()
    ticket: Array<Ticket>

    @ManyToMany(() => User, (user) => user.id)
    @JoinTable()
    users: Array<User>

}