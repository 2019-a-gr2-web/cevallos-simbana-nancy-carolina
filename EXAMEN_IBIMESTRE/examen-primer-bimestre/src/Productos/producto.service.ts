import {Injectable} from "@nestjs/common";
import {Producto} from "../interfaces/Producto";
import {Tienda} from "../interfaces/tienda";

@Injectable()
export class ProductoService {
    bddProducto:Producto[]=[];
    bddTemp:Producto[]=[];
    numProductos=1;

    crear(nuevoProducto:Producto){
        nuevoProducto.idProducto=this.numProductos;
        this.numProductos++;
        this.bddProducto.push(nuevoProducto);
        return nuevoProducto;
    }
    ingresarTemo(listaBusqueda){

    }

    filtrar(id:number):Producto[]{
        this.bddTemp= this.bddProducto.filter(
            (producto)=>{
                return producto.idPadre===id;
            }
        );
        return this.bddTemp;
    }

    eliminar(id:number,idPadre:number){
        const indice=this.bddProducto.findIndex(
            (producto)=>{
                return (producto.idProducto===id && producto.idPadre==idPadre);
            }
        );
        this.bddProducto.splice(indice,1);
        return this.bddProducto
    }

    buscarPorNombre(id:number,nombre: string):Producto[] {
        if(nombre!=='' && nombre!==null){
            this.bddTemp= this.bddProducto.filter(
                (producto)=>{
                     return (producto.idPadre===id && producto.nombre .toUpperCase().includes(nombre.toUpperCase()));
                }
            );
        }else{
            this.bddTemp= this.bddProducto.filter(
                (producto)=>{
                    return producto.idPadre===id;
                }
            )
        }
        return  this.bddTemp
    }

    constructor(){
        const miProducto:Producto = {
            idPadre:1,
            nombre:'Galleta',
            descripcion:'Galleta oreo pequeña',
            fechaLanzamientoProducto:new Date(2019,6,5),
            precio:0.35,
            anioGarantia:1
        };
        this.crear(miProducto);
    }
}