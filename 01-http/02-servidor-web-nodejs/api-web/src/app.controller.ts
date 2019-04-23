import {Controller, Delete, Get, Headers, Response,HttpCode, Post, Put} from '@nestjs/common';
import { AppService } from './app.service';
import {consoleTestResultsHandler} from "../node_modules/tslint/lib/test";

//http://192.168.1.10:3000/ segmento inicial
//http://192.168.1.10.3000/mascotas/crear
//http:://192.168.1.10.3000/mascotas/borrar


@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}
  //@Controller(segmentoAccion)

  @Get('/hello-world')  // METODO HTTP
  helloWorld(): string {
    return 'Hello world';
  }
  @Post('/hola-mundo' )  // METODO HTTP
  holaMundo(){
      return 'Hola mundo';
  }
  @Put('/bonjour-le-monde')
  bonjourLeMonde(){
    return 'Bonjour le monde';
  }
  @Delete('/ciao-mondo')
  CiaoMondo(){
    return 'Ciao mondo';
  }
  @Get('/adivina')
  adivina(@Headers() headers):string{
    console.log('Headers: ',headers);
    const numeroRandomico=Math.fround(Math.random()*10);
    const numeroDeCabecera=Number(headers.numero);
    if(numeroDeCabecera==numeroRandomico){
      return 'ok';
    }else {
        return ':('
    }

     /* let nombre = 'Caro'; //String
      let edad=24;//number
      let sueldo = 10.20;//number
      let hijos = null;//null
      let casado = false; //boolean
      let ala = undefined; //undefined
     */


  }

        // ?llave=valor&llave2=valor2
    @Get('/consultar')
    consultar(@Query() queryParams){
        if(queryParams.nombre){
            return `Hola ${queryParams.nombre}`
        }else{
            return  `Hola extraño`
        }
    }

    @Get('/ciudad/:idCiudad')
    ciudad(@Params() parametrosRuta){
      switch (parametrosRuta.idCiudad.toLowerCase()) {
          case 'quito':
              return 'Que fueff';
          case 'quayaquil':
              return 'Que maah ñañoshh';
          default:
              return  'Buenas tardes';
      }
    }

    @Post('registroComida')
    registroComida(
        @Body() parametrosCuerpo,
        @Response() response
        //@Request() request
    ){
      if(parametrosCuerpo.nombre && parametrosCuerpo.cantidad){
          //return 'Registro creado';
          const cantidad=Number(parametrosCuerpo.cantidad);
          if(cantidad>1){
              response.set('Premio','Fanesca');
          }

          return response.send({mensaje:'Registro Creado'});
      }else {
          //return 'ERROR, no envía nombre o cantidad';
          return  response.status(400)
              .send({
                  mensaje: 'ERROR, no envia nombre o cantidad',
                  error:400
              });
      }
    }

    @Get('/semilla')
    semilla(@Request request){
      console.log((request.cookies));
      const cookies = request.cookies;
      if(cookies.micookie){
          return 'ok'
      }else {
          return ':('
      }
    }

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
];

let objeto:any ={
    propiedad:'valor',
    propiedadDos:'valor2'
}
objeto.propiedad
objeto.propiedadDos
 //agregar propiedades a un objeto
objeto.propiedadTres='valor3';
objeto['propiedadTres']='valor 3';
delete objeto.propiedadTres


