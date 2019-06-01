import {Controller, Get, Res, Req, Post, Body} from '@nestjs/common';
import { AppService } from './app.service';
import {LoginService} from "./Login/login.service";
import {ResponseError} from "superagent";
import {TiendaServices} from "./Tienda/tienda.services";

@Controller('/api')
export class AppController {
  constructor(private readonly _loginService:LoginService,private readonly _tiendaServices:TiendaServices) {}

  @Get()
  inicio(
      @Res() res,
      @Req() req) {

      res.redirect('/api/login')

  }

  @Get('menu')
  menu(@Res() res,
       @Req() req){
    if(this._loginService.validarCookies(req,res)){
      res.render('menu.ejs',{
        usuario:req.signedCookies.usuario

      });
    }
  }

  @Get('login')
  login(
      @Res() res,
      @Req() req){
    if(req.usuario){
      req.usuario(
          'usuario',
          null
      )
    }
    res.render('Login/login.ejs');
  }

  @Post('ingresar')
  ingresar(
      @Body('usuario')usuario:string,
      @Res() res
  ){
    res.cookie(
        'usuario',
        usuario,
        {
          // expires: horaFechaServidor
          signed: true
        }
    ).redirect('/api/menu');
  }


  @Get('lista')
  gestion(
      @Res() res,
      @Req() req
  ){
    const listaTienda = this._tiendaServices.bddTiendas;
    if(this._loginService.validarCookies(req,res)){
      res.render('Tienda/gestiontienda.ejs',{
        usuario:req.signedCookies.usuario,
        listaTienda:listaTienda
      });
    }
  }




}
