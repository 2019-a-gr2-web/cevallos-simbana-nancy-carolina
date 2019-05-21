import {Injectable} from "@nestjs/common";
import {Trago} from "./interfaces/trago";

@Injectable()
export class TragosServices{

    bddTragos:Trago[]=[];
    recnum=1;

    crear(nuevoTrago:Trago){
        nuevoTrago.id=this.recnum
        this.recnum++;
        this.bddTragos.push(nuevoTrago);
        return nuevoTrago
    }
    buscarPorId(id:number){
        this.bddTragos.find(
            (trago)=>{
                return trago.id===id;
            }
        )
    }
    eliminar(id:number){
        const indice= this.bddTragos.findIndex(
            (trago)=>{
                return trago.id===id;
            }
        );
        this.bddTragos.splice(indice,1);
        return this.bddTragos;
    }
    actualizar(tragoActualizado:Trago,id:number){
        const indice= this.bddTragos.findIndex(
            (trago)=>{
                return trago.id===id;
            }
        );
        tragoActualizado.id=this.bddTragos[indice].id;
        this.bddTragos[indice]=tragoActualizado;
        return this.bddTragos;
    }

    buscarPorNombre(nombre: string):Trago {
        return this.bddTragos.find(
            (trago) => {
                return trago.nombre.toUpperCase().includes(nombre.toUpperCase());
            }
        );
    }

    constructor(){
        const traguito:Trago = {
            nombre:'Pilsener',
            gradoAlcohol:4.6,
            fechaCaducidad:new Date(2019,5,17),
            precio:1.75,
            tipo:'Cerveza'
        };
        this.crear(traguito);
    }
}