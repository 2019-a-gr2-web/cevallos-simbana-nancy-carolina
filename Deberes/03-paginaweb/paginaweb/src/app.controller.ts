import { Controller, Get, Response} from '@nestjs/common';
import { AppService } from './app.service';
import * as Joi from '@hapi/joi';
//const Joi=require('@hapi/joi')


@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get('inicio')
  inicio(
      @Response() res
  ){
    return res.render(
        'inicio.ejs');
  }
}
