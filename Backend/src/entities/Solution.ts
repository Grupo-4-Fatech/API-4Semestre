import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./Users";


@Entity()
export class Solution {

    @PrimaryGeneratedColumn()
    id: Number;

    @Column()
    problem: string;

    @Column()
    solution: string;

    @ManyToOne(() => User, (user) => user.id)
    user: User;

    

}