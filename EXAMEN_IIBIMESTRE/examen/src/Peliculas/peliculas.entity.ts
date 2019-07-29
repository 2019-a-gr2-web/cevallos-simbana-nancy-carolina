import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ActorEntity} from "../Actores/actor.entity";
import {DetalleEntity} from "../Detalle/detalle.entity";

@Entity('pelicula')
export class PeliculasEntity {
    @PrimaryGeneratedColumn()
    peliculaId:number;

    @Column({
        length:100
    })
    nombre:string;

    @Column({
        default:'2019-06-19',
    })
    anioLanzamiento:Date;

    @Column({
        type: 'int',
    })
    rating:number;

    @Column({
        length:'300'
    })
    actoresPrincipales:string;

    @Column({
        length:'100'
    })
    sinopsis:string;

    @ManyToOne(type => ActorEntity,
            actor=> actor.peliculas)
    actorId:ActorEntity;

    @OneToMany(type => DetalleEntity,
        detalle=> detalle.peliculaId)
        detalles:DetalleEntity[];
}