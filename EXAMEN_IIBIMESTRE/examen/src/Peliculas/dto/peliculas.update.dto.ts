import {IsDate, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {ActorEntity} from "../../Actores/actor.entity";

export class PelculasUpdateDto{

    @IsEmpty()
    identificadprPelicula?:number;

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