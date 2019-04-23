import {Body, Controller, Delete, Get, Headers, HttpCode, Post, Put, Response,Query} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/suma')
  @HttpCode(200)
  suma(@HEADERS() headers,@Response() response ){
    if(headers.numeroUno!=null && headers.numeroDos!=null){
      const totalSuma=Number(headers.numeroUno)+Number(headers.numeroDos);
      return  response.status(200).send('la suma de :'+headers.numeroUno+' + '+headers.numeroDos+' es: '+totalSuma);
    }else {
        return response.status(400).send({mensaje:'Error, parámetros incorrecots',error:400})
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
