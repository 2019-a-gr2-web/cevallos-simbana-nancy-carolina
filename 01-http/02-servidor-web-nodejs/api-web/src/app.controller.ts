import {Controller,Get,HttpCode,Post,Put, Delete,Headers,Query,Param,Body,Request,Response} from '@nestjs/common';
import {AppService} from './app.service';


import * as Joi from '@hapi/joi';
import {map} from "rxjs/operators";

// const Joi = require('@hapi/joi');


// http://192.168.1.10:3000/segmentoInicial/segmentoAccion
// http://192.168.1.10:3000/mascotas/crear
// http://192.168.1.10:3000/mascotas/borrar
// @Controller(segmentoInicial)
@Controller('/api')
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    // @Controller(segmentoAccion)
    @Get('/hello-world')  // METODO HTTP
    helloWorld(): string {
        return 'Hello world';
    }

    // POST http://localhost:3000/api
    @Post('/hola-mundo')  // METODO HTTP
    holaMundo() {
        return 'Hola mundo';
    }

    @Put('/salut-monde')  // METODO HTTP
    salutMonde() {
        return 'Salut monde';
    }

    @Delete('/ola-mundo')  // METODO HTTP
    olaMundo() {
        return 'Olá mundo';
    }


    @Get('/adivina')  // METODO HTTP
    adivina(@Headers() headers): string {
        console.log('Headers: ', headers);
        const numeroRandomico = Math.round(Math.random() * 10);
        const numeroDeCabecera = Number(headers.numero);

        if (numeroDeCabecera == numeroRandomico) {
            return 'Ok';
        } else {
            return ':(';
        }


    }

    // ?llave=valor&llave2=valor2
    @Post('/consultar')
    consultar(@Query() queryParams) {
        console.log(queryParams);
        if (queryParams.nombre) {
            return `Hola ${queryParams.nombre}`
        } else {
            return 'Hola extraño'
        }
    }

    @Get('/ciudad/:idCiudad')
    ciudad(@Param() parametrosRuta) {
        switch (parametrosRuta.idCiudad.toLowerCase()) {
            case 'quito':
                return 'Que fueff';
            case 'guayaquil':
                return 'Que maah ñañoshh';
            default:
                return 'Buenas tardes';
        }
    }

    @Post('registroComida')
    registroComida(
        @Body() parametrosCuerpo,
        @Response() response
    ) {
        if (parametrosCuerpo.nombre && parametrosCuerpo.cantidad) {
            const cantidad = Number(parametrosCuerpo.cantidad);
            if (cantidad > 1) {
                response.set('Premio', 'Fanesca');
            }
            return response.send({mensaje: 'Registro Creado'});
        } else {
            return response.status(400)
                .send({
                    mensaje: 'ERROR, no envia nombre o cantidad',
                    error: 400
                });
        }

    }

    @Get('/semilla')
    semilla(
        @Request() request,
        @Response() response
    ) {
        console.log(request.cookie);
        const cookies = request.cookie; // JSON

        const esquemaValidacionNumero = Joi
            .object()
            .keys({
                numero: Joi.number().integer().required()
            });

        const objetoValidacion = {
            numero: cookies.numero
        };
        const resultado = Joi.validate(objetoValidacion,
            esquemaValidacionNumero);

        if (resultado.error) {
            console.log('Resultado: ', resultado);
        } else {
            console.log('Numero valido');
        }

        const cookieSegura = request.signedCookies.fechaServidor;
        if(cookieSegura){
            console.log('Cookie segura');
        }else{
            console.log('No es valida esta cookie');
        }

        if (cookies.micookie) {

            const horaFechaServidor = new Date();
            const minutos = horaFechaServidor.getMinutes();
            horaFechaServidor.setMinutes(minutos + 1);

            response.cookie(
                'fechaServidor',      // NOMBRE (key)
                new Date().getTime(),  // VALOR  (value)
                {    // OPCIONES
                    // expires: horaFechaServidor
                    signed: true
                }
            );

            return response.send('ok');
        } else {
            return response.send(':(');
        }

    }

    @Get('inicio')
    inicio(
        @Response() res
    ){
        return res.render('inicio');
    }

    // js -> ts


    /*
    const nombre: string = 'Adrian'; // string
    const edad = 29;  // number
    const sueldo = 1.20;  // number
    const casado = false;  // boolean
    const hijos = null;  // null
    const alas = undefined;  // undefined
    */


    /*
    * Segmento inicial: /api
    * 1) Segmento Accion: GET 'hello-world' -> 'Hello world'
    * 2) Segmento Accion: POST 'hola-mundo' -> 'Hola mundo'
    * 3) Segmento Accion: PUT '...' -> '....'
    * 4) Segmento Accion: DELETE '..' -> '....'
    * */


}


/*
segmento inicial:/api
1) Segmento Accion: GET 'hello-world'->'Hello world'
2) Segmento Accion: POST 'hola mundo'->'Hola mundo'
3)  Segmento Accion: PUT  'bonjour-le-monde'->'Bonjour le monde'
4) Segmento Accion: DELETE 'ciao-mondo'->'Ciao mondo'
 */


/*
@NombreDecoradorClase() // Decorador -> FUNCION
class usuario{
  @Atributo() // Decorador
  atributoPublico; // Public
  private atributoPrivado;
  protected atributoProtegido;
  constructor(@Parametro() atributoPublico,
              @OtroParametro() atributoPrivado,
              @OtroOtroParametro() atributoProtegido){
    this.atributoPublico = atributoPublico;
    this.atributoPrivado = atributoPrivado;
    this.atributoProtegido = atributoProtegido;
  }
  @MetodoA()
  public metodoPublico(@ParametroA() a){}
  @MetodoB()
  private metodoPrivado(){}
  protected metodoProtegido(){}
}
*/
/*
const json=[
    {
        'llave':"valor",
        "nombre":"Caro",
        "edad":24,
        "sueldo":3.24,
        "casado":false,
        "hijos":null,
        "mascotas":[
            "firulais",
            1,
            1.1,
            true,
            null,
            {
                "nombre":"firulais",
                "edad":1
            }

        ]
    }
    //un json puede soportar onjetos json o arreglos de json
];*/

/*let objeto:any ={
    propiedad:'valor',
    propiedadDos:'valor2'
}
objeto.propiedad
objeto.propiedadDos
 //agregar propiedades a un objeto
objeto.propiedadTres='valor3';
objeto['propiedadTres']='valor 3';
delete objeto.propiedadTres*/

function holaMundo() {
    console.log(('Hola mundo'));
}
 const respuestaHolaMundo = holaMundo();//undefined
console.log('Resp hola mundo:',respuestaHolaMundo);

function suma(a:number,b:number) {
    return a+b;
}
const  respuestaSuma=suma(1,2);
console.log('Respu suma;',respuestaSuma);

if("a"){
    console.log('Verdadero "a"');
}else{
    console.log('Falso "a"');
}
if(0){
    console.log('Verdadero "0"');
}else{
    console.log('Falso "0"');
}
if("0"){
    console.log('Verdadero "0"');
}else{
    console.log('Falso "0"');
}
if(1){
    console.log('Verdadero "1"');
}else{
    console.log('Falso "1"');
}
if(-1){
    console.log('Verdadero "-1"');
}else{
    console.log('Falso "-1"');
}
if(null){
    console.log('Verdadero "null"');
}else{
    console.log('Falso "null"');
}
if({}){//Trutty
    console.log('Verdadero "0"');
}else{
    console.log('Falso "0"');
}


//OPERADORES DE ARREGLOS EN JS

const  arreglo=[
    function () {return '0'

    }
]

const arreglosNumeros=[1,2,3,4,5,6];

//1)imprimir en consola todos los elementos

const arreglosNumerosForEach=[1,2,3,4,5,6];
//const rForEach=arreglosNumerosForEach.forEach(n => console.log(`${n}`));
//console.log(`Respuesta foreach: ${rForEach}`);

//2) Sumar 2 a os pares y 1 a los impares
const  arregloNumerosMap=[1,2,3,4,5,6];
const rMap = arregloNumerosMap
    .map(
        (valorActual)=>{
            const  esPar =valorActual % 2==0;
            if(esPar){
                return; valorActual+2;
            }else {
                return; valorActual+1;
            }
        }
    );
console.log(`RESPUSTA MAP: ${rMap}`);


//3) Encontrar si existe el numero4
    const  arregloNumerosFind=[1,2,3,4,5,6];
    const rFind  =arregloNumerosFind
        .find(
            (valorActual)=>{
                return valorActual==4;
            }
        );

//4) filtrar los numeros menores a 5

//5) todos los valores positivos

//6) Algun valor es menor que2

//7) sumar todos los valores

//8) Restar los valores de 100