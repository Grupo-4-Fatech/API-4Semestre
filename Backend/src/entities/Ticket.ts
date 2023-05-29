import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany, ManyToOne, JoinTable, AfterInsert, JoinColumn, OneToOne } from 'typeorm'
import { Teams } from './Teams';
import { InspectionGroup } from './InspectionGroup';
import { User } from './Users';
import { Log } from './Log';

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

    @Column({})
    status: string;
    
    @Column({nullable: true, default: ''})
    solution: string;

    @Column({ nullable: true, default: "" })
    risk: string;

    @Column({ nullable: true, default: "" })
    impact: string;

    @Column({ nullable: true, default: "" })
    cost: string;

    @ManyToOne(() => Teams, (teams) => teams.id, {onDelete: 'CASCADE'})
    teams: Teams[]

    @ManyToOne(() => InspectionGroup, (inspectionGroup) => inspectionGroup.id, {onDelete: 'CASCADE'})
    inspectionGroup: InspectionGroup;

    @ManyToOne(() => User, (user) => user.id, {onDelete: 'CASCADE'})
    user: User;

    @OneToMany(() => User, (user) => user.id, {onDelete: 'CASCADE'})
    @JoinColumn()
    solver: User;

    @OneToMany(() => Log, (log) => log.id)
    logs: Array<Log>;

} 