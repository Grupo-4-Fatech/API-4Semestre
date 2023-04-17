import {Entity, PrimaryGeneratedColumn, Column, ManyToMany} from 'typeorm';
import { Teams } from './Teams';
import { InspectionGroup } from './InspectionGroup';



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

    @ManyToMany(() => Teams, (team) => team.users)
    team: Array<Teams>

    @ManyToMany(() => InspectionGroup, (inspectionGroup) => inspectionGroup.users)
    inspectionGroup: Array<InspectionGroup>

}