import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany} from 'typeorm';
import { Teams } from './Teams';
import { InspectionGroup } from './InspectionGroup';
import { Ticket } from './Ticket';
import { Solution } from './Solution';
import { Log } from './Log';

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    gender: string;

    @Column()
    role:number

    @ManyToMany(() => Teams, (team) => team.users)
    team: Array<Teams>

    @ManyToMany(() => InspectionGroup, (inspectionGroup) => inspectionGroup.users)
    inspectionGroup: Array<InspectionGroup>

    @OneToMany(() => Ticket, (ticket) => ticket.id)
    ticket: Array<Ticket>

    @OneToMany(() => Solution, (solution) => solution.id)
    solutions: Array<Solution>;

    @OneToMany(() => Log, (log) => log.id)
    logs : Array<Log>;

}