import {Injectable} from "@nestjs/common";
import {Tienda} from "../interfaces/tienda";

@Injectable()
export class TiendaServices {
    bddTiendas:Tienda[]=[];

    numTiendas=1;

    crear(nuevaTienda:Tienda){
        nuevaTienda.tiendaId=this.numTiendas;
        this.numTiendas++;
        this.bddTiendas.push(nuevaTienda);
        return nuevaTienda;
    }

    eliminar(id:number){
        const indice=this.bddTiendas.findIndex(
            (tienda)=>{
                return tienda.tiendaId===id;
            }
        );
        this.bddTiendas.splice(indice,1);
        return this.bddTiendas
    }

    buscarPorNombre(nombre: string):Tienda[] {
        if(nombre!=='' && nombre!==null){
            return this.bddTiendas.filter(
                (tienda) => {
                    return tienda.nombres.toUpperCase().includes(nombre.toUpperCase());
                }
            );
        }else{
            return this.bddTiendas
        }

    }

    constructor(){
        const miTienda:Tienda = {
            nombres:'Viveres Charito',
            direccion:'Carapungo av.geovany calles',
            fechaApertura:new Date(2018,1,1),
            ruc:1712138393,
            matriz:true
        };
        this.crear(miTienda);
    }
}