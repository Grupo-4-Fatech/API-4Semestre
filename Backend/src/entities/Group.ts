import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Teams } from "./Teams";


@Entity()
export class Group {
    @PrimaryGeneratedColumn()
    id: number

    @Column({})
    name: String

    @Column({})
    descricao: String

    @OneToMany(()=> Teams, (teams)=> teams.group)
    @JoinTable()
    teams: Array<Teams>


}