import {Injectable} from "@nestjs/common";
import {Producto} from "../interfaces/Producto";
import {Tienda} from "../interfaces/tienda";

@Injectable()
export class ProductoService {
    bddProducto:Producto[]=[];
    listaProducto=[];
    numProductos=1;

    crear(nuevoProducto:Producto){
        nuevoProducto.idProducto=this.numProductos;
        this.numProductos++;
        this.bddProducto.push(nuevoProducto);
        return nuevoProducto;
    }

    filtrar(id:number):Producto[]{
        return this.bddProducto.filter(
            (producto)=>{
                return producto.idPadre===id;
            }
        );
    }

    eliminar(id:number){
        const indice=this.bddProducto.findIndex(
            (producto)=>{
                return producto.idProducto===id;
            }
        );
        this.bddProducto.splice(indice,1);
        return this.bddProducto
    }

    buscarPorNombre(id:number,nombre: string):Producto[] {
        if(nombre!=='' && nombre!==null){
            return this.bddProducto.filter(
                (producto)=>{
                     return (producto.idPadre===id && producto.nombre .toUpperCase().includes(nombre.toUpperCase()));
                }
            );
        }else{
            return this.bddProducto.filter(
                (producto)=>{
                    return producto.idPadre===id;
                }
            )
        }

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