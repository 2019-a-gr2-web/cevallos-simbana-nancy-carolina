import {Injectable} from "@nestjs/common";
import {Trago} from "./interfaces/trago";
import {TragosEntity} from "./tragos.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {TragosEntity} from "./tragos.entity";
//import {Repository} from "typeorm";

@Injectable()
export class TragosServices{

    bddTragos:Trago[]=[];
    recnum=1;

   /* constructor(@InjectRepository(TragosEntity)
                private readonly _tragosRepository: Repository<TragosEntity>,){
        const traguito:Trago = {
            nombre:'Pilsener',
            gradoAlcohol:4.6,
            fechaCaducidad:new Date(2019,5,17),
            precio:1.75,
            tipo:'Cerveza'
        };
        //const objetoEntidad=this._tragosRepository.create(traguito);

        console.log('LINEA 1')
        this._tragosRepository
            .save(objetoEntidad) //promesa
            .then(
                (datos)=>{
                    console.log('LINEA 2');
                    //console.log('Dato creado:' ,datos);
                }
            )
            .catch(
                (error)=>{
                    console.log('LINEA 3');
                    //console.error('Error',error);
                }
            );

        console.log('LINEA 4');

        //this.crear(traguito);
    }*/

/*
    buscar(paramentrosBusqueda?):Promise<TragosEntity[]>{
        return this._tragosRepository.find(paramentrosBusqueda);
    }

    crear(nuevoTrago:Trago):Promise<Trago>{
        //nuevoTrago.id=this.recnum
        //this.recnum++;
        //this.bddTragos.push(nuevoTrago);
        //return nuevoTrago

        //const objetoEntidad=this._tragosRepository
        //    .create(nuevoTrago);
        //return  this._tragosRepository.save(objetoEntidad);
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
    }*/


}