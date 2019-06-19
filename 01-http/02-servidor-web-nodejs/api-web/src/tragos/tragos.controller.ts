import {Body, Controller, Get, Post, Query, Res} from "@nestjs/common";
import {TragosServices} from "./tragos.services";
import {Trago} from "./interfaces/trago";
import {validate} from "class-validator";
import {TragosCreateDto} from "./dto/tragos.create.dto";

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
        @Res() res,
        @Query('mensaje')mensaje:string,
    ){
        res.render('tragos/crear-editar',{
            mensaje: mensaje
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
        trago.fechaCaducidad = trago.fechaCaducidad ? new Date(trago.fechaCaducidad) : undefined;
        console.log(trago)

        let tragoAValidar = new TragosCreateDto();

        tragoAValidar.nombre = trago.nombre;
        tragoAValidar.tipo = trago.tipo;
        tragoAValidar.fechaCaducidad = trago.fechaCaducidad;
        tragoAValidar.precio = trago.precio;
        tragoAValidar.gradosAlcohol = trago.gradosAlcohol;

        try{
            const errores=await validate(tragoAValidar)
            console.log(errores);
            console.log(tragoAValidar);
            console.log(trago);
            if (errores.length > 0) {

                res.redirect('/api/traguito/crear?mensaje=Tienes un error en el formulario&campos=');
            } else {

                const respuestaCrear = await this._tragosService
                    .crear(trago); // Promesa

                console.log('RESPUESTA: ', respuestaCrear);

                res.redirect('/api/traguito/lista');
            }

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