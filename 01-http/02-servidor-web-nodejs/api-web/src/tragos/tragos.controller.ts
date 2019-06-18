import {Body, Controller, Get, Post, Res} from "@nestjs/common";
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
        const arregloTragos = this._tragosService.bddTragos;//enviamos la lista guardada
        res.render('tragos/lista-tragos',{
            arregloTragos:arregloTragos
        })
    }

    @Get('crear')
    crear(
        @Res() res
    ){
        res.render('tragos/crear-editar',{

        })
    }

    @Post('crear')
    async crearTragoPost(
        @Body() trago:Trago,
        @Res() res,
        // @Body('nombre') nombre:string,
        // @Body('tipo') tipo:string,
        // @Body('gradosAlcohol') gradosAlcohol:number,
        // @Body('fechaCaducidad') fechaCaducidad:Date,
        // @Body('precio') precio:number,

    ){
        trago.gradoAlcohol=Number(trago.gradoAlcohol);
        trago.precio=Number(trago.precio);
        trago.fechaCaducidad=new Date(trago.fechaCaducidad);
        console.log(trago)

        try{
            const respuestarCrear = await this._tragosService.crear(trago); //Promise

            console.log('RESPUESTA :',respuestarCrear);
            res.redirect('/api/traguito/lista')
        }
        catch (e) {
            console.error((e));
            res.status(500);
            res.send({mensaje:'Error',codigo:500})
        }

        // console.log('Trago: ', trago, typeof trago);
        // console.log('Nombre: ', nombre, typeof nombre);
        // console.log('Tipo: ', tipo, typeof tipo);
        // console.log('GradosAlcohol: ', gradosAlcohol, typeof gradosAlcohol);
        // console.log('FechaCaducidad: ', fechaCaducidad, typeof fechaCaducidad);
        // console.log('Precio: ', precio, typeof precio);

    }

    @Post('eliminar')
    eliminar(
        @Body('id')id:string,
        @Res() res
    ){

        this._tragosService.eliminar(Number(id));
        res.redirect('/api/traguito/lista');
    }
}