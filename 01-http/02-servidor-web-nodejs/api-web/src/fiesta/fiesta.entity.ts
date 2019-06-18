import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('db_fiesta')
export class FiestaEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre:string;
}