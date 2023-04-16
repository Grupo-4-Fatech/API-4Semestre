import {Entity, PrimaryGeneratedColumn, Column, ManyToMany} from 'typeorm';
import { Teams } from './Teams';

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

    @ManyToMany(() => Teams, (team) => team.users)
    team: Array<Teams>

}