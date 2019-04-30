import {Body, Controller, Delete, Get, Headers, HttpCode, Post, Put, Response,Query,Request} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/suma')
  @HttpCode(200)
  suma(@Headers() headers,@Response() response, @Request() request ){
    const cookies=request.cookies;
    const cookiesSeguras=request.signedCookies;
    if(cookiesSeguras.puntos){
      if(headers.numeroUno!=null && headers.numeroDos!=null){
        const totalSuma=Number(headers.numeroUno)+Number(headers.numeroDos);
        //return  response.status(200).send('la suma de :'+headers.numeroUno+' + '+headers.numeroDos+' es: '+totalSuma);
        if(cookies.puntos>0){
          const puntosSobrantes=Number(cookiesSeguras.puntos)-Number(totalSuma);
          response.cookie('puntos',puntosSobrantes,{signed:true});
        }else {
          const jsonRespuesta={
            'nombreUsuario':cookies.usuario,
            'resultado':totalSuma,
            'mensaje':'Se le terminaron los puntos'
          }
          response.send(jsonRespuesta);
        }
      }else {
        return response.status(400).send({mensaje:'Error, parámetros incorrecots',error:400})
      }
    }else {
      response.cookie('puntos',100,{signed:true});
      if(!cookies.usuario){
        response.cookie('usuario','Carolina');
      }

    }
  }

  @Post('/resta')
  @HttpCode(201)
  resta(@Body() parametros,
        @Response() response){
    if(parametros.numeroUno!=null && parametros.numeroDos!=null){
      const totalResta=Number(parametros.numeroUno)-Number(parametros.numeroDos);
      return response.status(201).send('El resultado de la resta es: '+totalResta);
    }else {
      return response.status(400).send({mensaje:'Error, parámetros incorrectos',error:400})
    }
  }

  @Put('/producto')
  @HttpCode(203)
  producto(@Query() query,
           @Response() response){
    if(query.numeroUno!=null && query.numeroDos!=null){
      const totalProducto=Number(query.numeroUno)*Number(query.numeroDos);
      return response.status(203).send('El resultado de roducto es:'+totalProducto);
    }else {
      return response.status(400).send({mensaje:'Error, parámetros incorrectos',error:400})
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
