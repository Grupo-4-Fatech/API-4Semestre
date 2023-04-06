import {Entity, Column, PrimaryGeneratedColumn, ManyToMany} from  'typeorm'
import { Teams } from './Teams';
import { InspectionGroup } from './InspectionGroup';

@Entity()
export class Ticket {
    @PrimaryGeneratedColumn()
    id: number

    @Column({})
    title: string;

    @Column({})
    type: string;

    @Column({})
    description: string;

    @Column( {})
    status: string;

    @ManyToMany(() => Teams, (teams) => teams.id)
    teams: Teams[]

    @ManyToMany(() => InspectionGroup, (inspectionGroup) => inspectionGroup.id)
    inspectionGroup: InspectionGroup;

} 