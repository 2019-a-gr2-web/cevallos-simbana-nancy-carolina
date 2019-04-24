import {Controller, Get, Post, Body, Response, Request} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('guardar_usuario')
  guardar_usuario(
      @Body() parametros,
      @Response() response
  ){
    if(parametros.nombre && parametros.numeroUno && parametros.numeroDos){
      const respuesta= Number(parametros.numeroUno)+Number(parametros.numeroDos);
      response.cookie('usuario',parametros.nombre);

      const jsonRespuesta={
        'nombreUsuario':parametros.nombre,
        'resultado':respuesta
      }
      return response.send(jsonRespuesta);
    }else {
      return response.status(400).send({mensaje:'Error, parámetros incorrectos',error:400})
    }
  }
}
