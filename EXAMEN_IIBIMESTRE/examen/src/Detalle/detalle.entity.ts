import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {PeliculasEntity} from "../Peliculas/peliculas.entity";
import {ActorEntity} from "../Actores/actor.entity";
import {PedidoEntity} from "../Pedido/pedido.entity";

@Entity('detalle')
export  class DetalleEntity {

    @PrimaryGeneratedColumn()
    detalleId:number;

    @ManyToOne(type => PeliculasEntity,
        pelicula=> pelicula.detalles)
    peliculaId:PeliculasEntity;

    @ManyToOne(type => PedidoEntity,
        pedido=> pedido.detalles)
    pedidoId:PedidoEntity;

}