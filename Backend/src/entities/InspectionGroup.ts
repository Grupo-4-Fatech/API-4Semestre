import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Ticket } from "./Ticket";
import { User } from "./Users";


@Entity()
export class InspectionGroup {
    @PrimaryGeneratedColumn()
    id: number

    @Column({})
    name: String

    @Column({})
    descricao: String

    @OneToMany(()=> Ticket, (ticket)=> ticket.inspectionGroup)
    @JoinTable()
    ticket: Array<Ticket>

    @ManyToMany(() => User, (user) => user.id)
    @JoinTable()
    users: Array<User>

}