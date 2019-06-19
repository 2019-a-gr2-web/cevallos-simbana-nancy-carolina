import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {DistribuidorEntity} from "../distribudor/distribuidor.entity";

@Entity('bd_trago') // Nombre tabla
export class TragosEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        type: 'varchar',
        length: 70,
        name: 'nombre_trago',
    })
    nombre: string;

    @Column({
        type: 'varchar',
        length: 10,
        name: 'tipo_trago',
    })
    tipo: 'Ron'|'Vodka'|'Whiskey'|'Tequila'|'Puntas'|'Cerveza';

    @Column({
        type: 'int',
        name: 'grados_alcohol',
    })
    gradoAlcohol: number;

    @Column({
        type: 'date',
        name: 'fecha_caducidad',
        default:'2019-06-19'
    })
    fechaCaducidad: Date;

    @Column({
        type: 'decimal',
        precision: 10,
        scale:2,
        name: 'precio',
        nullable:true
    })
    precio: number;

    @ManyToOne(type => DistribuidorEntity, distribuidor=>distribuidor.tragos)
    distribuidorId:DistribuidorEntity;
}