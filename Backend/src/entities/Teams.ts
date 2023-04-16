import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import {User} from './Users'


@Entity()
export class Teams{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToMany(() => User, (user) => user.id)
    @JoinTable()
    users: Array<User>

}