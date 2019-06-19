import {Column} from "typeorm";
import {DistribuidorEntity} from "../../distribudor/distribuidor.entity";

export class TragosCreateDto {
    id:number;

    nombre: string;

    tipo: "Ron" | "Vodka" | "tequila" | "Puntas" | "Cerveza";

    gradoAlcohol: number;

    fechaCaducidad: Date;

    precio: number;

    distrbuidorId:DistribuidorEntity;

}