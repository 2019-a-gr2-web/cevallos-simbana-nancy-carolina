import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {PeliculasEntity} from "../Peliculas/peliculas.entity";
import {type} from "os";

@Entity('actor')
export  class ActorEntity {
    @PrimaryGeneratedColumn()
    actorId:number;

    @Column({
        length:70
    })
    nombres:string;

    @Column({
        length:70
    })
    apellidos:string;

    @Column({
        default:'2019-06-06'
    })
    fechaNacimiento:Date;

    @Column({
        type: 'int',
    })
    numeroPeliculas:number;

    @Column({
        type:'boolean',
        nullable:false
    })
    retirado:boolean;

    @OneToMany(type => PeliculasEntity,
        pelicula=> pelicula.actorId)
    peliculas:PeliculasEntity[];
}
