import {Controller, Get, Res} from "@nestjs/common";
import {TragosServices} from "./tragos.services";
import {Trago} from "./interfaces/trago";

@Controller('/api/traguito')

export  class  TragosController {
    constructor(private  readonly _tragosService:TragosServices){

    }

    @Get('lista')
    listarTragos(
        @Res() res
    ){
        const arregloTragos = this._tragosService.bddTragos;
        res.render('tragos/lista-tragos',{
            arregloTragos:arregloTragos
        })
    }
}