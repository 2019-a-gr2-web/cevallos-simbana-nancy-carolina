import {Injectable} from "@nestjs/common";
import {Pelicula} from "../interfaces/Pelicula";
import {PeliculasEntity} from "./peliculas.entity";
import {DeleteResult, Repository} from "typeorm";
import {ActorEntity} from "../Actores/actor.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {getConnection} from "typeorm";
import {isArrayLike} from "rxjs/internal-compatibility";

@Injectable()
export class PeliculasService{
    //bddPeliculas: Pelicula[] = [];
    recnum = 1;

    constructor(@InjectRepository(PeliculasEntity)
                private readonly _peliculasRepository: Repository<PeliculasEntity>,){

    }

    listarPeliculas(id):Promise<PeliculasEntity[]>{
        return this._peliculasRepository.find({
            where:{actorId:id}
        });
    }

    crear(nuevaPelicula: PeliculasEntity):Promise<PeliculasEntity> {

        const objetoEntidad = this._peliculasRepository
            .create(nuevaPelicula);

        return this._peliculasRepository.save(objetoEntidad);
    }

    eliminarPorId(id?:number):Promise<object>{

    /*const peliculaEliminar:PeliculasEntity= this._peliculasRepository.findOne({
            peliculaId:id
        });*/
    return this._peliculasRepository.delete({
        peliculaId:id
    });

    }

    buscar(parametrosBusqueda?,fechaBusqueda?):Promise<PeliculasEntity[]>{

        if(parametrosBusqueda!="" && fechaBusqueda!=""){
            return this._peliculasRepository.find({
                nombre:parametrosBusqueda,
                anioLanzamiento:fechaBusqueda}
            );
        }else{
            if(parametrosBusqueda=="" && fechaBusqueda!=""){
                return this._peliculasRepository.find({
                    nombre:parametrosBusqueda}
                );
            }else if(parametrosBusqueda!="" && fechaBusqueda==""){
                return this._peliculasRepository.find({
                    nombre:parametrosBusqueda}
                );
            }else{
                return this._peliculasRepository.find();
            }
        }

    }

    listarTodo():Promise<PeliculasEntity[]>{
        return this._peliculasRepository.find();
    }

}