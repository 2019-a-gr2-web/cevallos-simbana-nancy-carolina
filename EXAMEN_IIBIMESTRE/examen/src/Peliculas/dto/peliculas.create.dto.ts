import {IsDate, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {ActorEntity} from "../../Actores/actor.entity";

export class PeliculasCreateDto{

    @IsEmpty()
    identificadprPelicula?:number;

    @IsNotEmpty()
    @IsString()
    nombre:string;

    @IsNotEmpty()
    @IsDate()
    anioLanzamiento:Date;

    @IsNumber()
    @IsOptional()
    rating:number;

    @IsString()
    @IsOptional()
    actoresPrincipales:string;

    @IsString()
    @IsOptional()
    sinopsis:string;

    @IsNotEmpty()
    actorId:ActorEntity;

}