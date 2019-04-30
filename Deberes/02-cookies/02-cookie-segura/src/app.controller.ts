import {Body, Controller, Delete, Get, Headers, HttpCode, Post, Put, Response,Query,Request} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

    @Get('/suma')
    suma(@Headers() header,@Response() respuesta,@Request() req) {
        const cookie = req.cookies;
        const cookieSeg = req.signedCookies;

        if(!cookieSeg.puntos){
            respuesta.cookie('puntos',100,{signed:true});
        }
        if(!cookie.nombreUsuario) {
            respuesta.cookie('nombreUsuario', 'Carolina');
        }
        if(cookieSeg.puntos <= 0){
            respuesta.send("Se termino los puntos");
        }
        if(header.numero1!=null && header.numero2!=null){
            const resultado = Number(header.numero1) + Number(header.numero2);
            console.log("Resultado de la suma es: "+resultado);
            const resultadoJson = {
                'nombreUsuario':cookie.nombreUsuario,
                'resultado':resultado
            }
            const resCookie=cookieSeg.puntos;
            if(!isNaN(resCookie)){
                const resto = Number(cookieSeg.puntos) - Number(resultado);
                cookieSeg.puntos = resto;
                console.log(cookieSeg.puntos);
                respuesta.cookie('puntos',resto,{signed:true})
            }


            return respuesta.status(200).send(resultadoJson);
        }
        else{
            return respuesta.status(400).send('Error de parametros');
        }

    }

  @Post('/resta')
  @HttpCode(201)
  resta(@Body() parametros,
        @Response() respuesta,@Request() req) {
      const cookie = req.cookies;
      const cookieSeg = req.signedCookies;
      if(!cookieSeg.puntos){
          respuesta.cookie('puntos',100,{signed:true});
      }
      if(!cookie.nombreUsuario) {
          respuesta.cookie('nombreUsuario', 'Carolina');
      }
      if(cookieSeg.puntos <= 0){
          respuesta.send("Se termino los puntos");
      }
      if(parametros.numero1!=null && parametros.numero2!=null){
          const resultado = Number(parametros.numero1) - Number(parametros.numero2);
          console.log("Resultado de la suma es: "+resultado);
          const resultadoJson = {
              'nombreUsuario':cookie.nombreUsuario,
              'resultado':resultado
          }
          const resto = cookieSeg.puntos - resultado;
          cookieSeg.puntos = resto;
          console.log(cookieSeg.puntos);
          respuesta.cookie('puntos',resto,{signed:true})

          return respuesta.status(200).send(resultadoJson);
      }
      else{
          return respuesta.status(400).send('Error de parametros');
      }

  }

  @Put('/producto')
  @HttpCode(203)
  producto(@Query() query,
           @Response() respuesta,@Request() req) {
    const cookie = req.cookies;
    const cookieSeg = req.signedCookies;
    if(!cookieSeg.puntos){
    respuesta.cookie('puntos',100,{signed:true});
    }
    if(!cookie.nombreUsuario) {
        respuesta.cookie('nombreUsuario', 'Carolina');
    }
    if(cookieSeg.puntos <= 0){
        respuesta.send("Se termino los puntos");
    }
    if(query.numero1!=null && query.numero2!=null){
        const resultado = Number(query.numero1) * Number(query.numero2);
        console.log("Resultado de la suma es: "+resultado);
        const resultadoJson = {
            'nombreUsuario':cookie.nombreUsuario,
            'resultado':resultado
        }
        const resto = cookieSeg.puntos - resultado;
        cookieSeg.puntos = resto;
        console.log(cookieSeg.puntos);
        respuesta.cookie('puntos',resto,{signed:true})

        return respuesta.status(200).send(resultadoJson);
    }
    else{
        return respuesta.status(400).send('Error de parametros');
    }

    }

  @Delete('/division')
  @HttpCode(203)
  division(@Headers() headers,
           @Body() body,
           @Query() query,
           @Response() response){
    if(headers.numero==null && body.numero!=null && query.numero!=null){
      const totalDivision=Number(body.numero)/Number(query.numero);
      return response.status(203).send('El resultado de '+body.numero+'/'+query.numero+' es:'+totalDivision);
    }else if(body.numero==null && headers.numero!=null && query.numero!=null){
      const totalDivision=Number(headers.numero)/Number(query.numero);
      return response.status(203).send('El resultado de '+headers.numero+'/'+query.numero+' es:'+totalDivision);
    }else if(query.numero==null && headers.numero!=null && body.numero!=null){
      const totalDivision=Number(headers.numero)/Number(body.numero);
      return response.status(203).send('El resultado de '+headers.numero+'/'+body.numero+' es:'+totalDivision);
    }else {
      return response.status(400).send({mensaje:'Error, parámetros incorrectos',error:400})
    }
  }
}
