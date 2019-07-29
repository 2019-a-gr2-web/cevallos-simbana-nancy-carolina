import {Body, Controller, Get, Post, Query, Req, Res, Session} from '@nestjs/common';
import { AppService } from './app.service';
import {ActorService} from "./Actores/actor.service";
import {LoginService} from "./Login/login.service";
import {PeliculasService} from "./Peliculas/peliculas.service";
import {UsuarioService} from "./Usuario/usuario.service";
import {PedidoService} from "./Pedido/pedido.service";


@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService, private readonly _actorService:ActorService,private readonly _loginService:LoginService,
              private  readonly _peliculasService:PeliculasService,private readonly _usuarioService:UsuarioService,
              private readonly _pedidoService:PedidoService
  ) {}

  @Get()
  inicio(
      @Res() res,
      @Req() req,
      @Session() session
  ){
   res.redirect('/api/login')
  }

  @Get('login')
  login(
      @Res() res,
      @Req() req,
      @Session() session
      ){
      if(session.usuario){
        session.usuario.destroy();
      }

      res.cookie(
        'tipoRol',0,{
          signed:true
        }).render('login.ejs');
  }

  @Post('ingresar')
  ingresar(
      @Body() body,
      @Res() res
  ){
    console.log(body.tipoRol);
      res.cookie(
          'usuario',
          body.usuario,
          {
            signed:true
          }
      ).cookie(
          'tipoRol',
          body.tipoRol,{
            signed:true
          }
      ).redirect('/api/menu');

    /*switch (body.tipoRol) {
      case '1':{

      }
      case '2':{
        res.cookie(
            'usuario',
            body.usuario,
            {
              signed:true
            }
        ).cookie(
            'tipoRol',
            body.tipoRol,{
              signed:true
            }
        ).redirect('/api/menu')
        break;
      }
      case 3:{
        break;
      }
    }*/
  }

  @Get('menu')
  async menu(
      @Res() res,
      @Req() req,
      @Session() session,
      @Query() query
  ){
    //if(this._loginService.validarCookies(req,res)){
      const rol= Number(req.signedCookies.tipoRol);
      switch (rol) {
        case 1:{
          try{
            const listaActores= await this._actorService.finAll();
            res.render('Administrador/menuAdministrador.ejs',{
              usuario:session.username,
              tipoRol:req.signedCookies.tipoRol,
              listaActores:listaActores
            });
          }
          catch (e) {
            console.error(e)
          }
          break;
        }
        case 2:{
          try{
            const listaActores= await this._actorService.finAll();

            let listaPeliculas;
            if(req.query.actor){
              listaPeliculas=await this._peliculasService.listarPeliculas(req.query.actor);
            }else {
              listaPeliculas=await this._peliculasService.listarTodo();
            }

            let pedido=0;
            if(req.query.pedido){
              pedido=req.query.pedido;
            }

            let actor=0;
            if(req.query.actor){
              actor=req.query.actor
            }
            res.render('Usuario/menu.ejs',{
              usuario:session.username,
              tipoRol:req.signedCookies.tipoRol,
              listaActores:listaActores,
              listaPeliculas:listaPeliculas,
              idPedido:pedido,
              idActor:actor
            });
          }
          catch (e) {
            console.error(e)
          }
          break;
        }
        case 3:{
          try{
            const listaPedidos= await this._pedidoService.listarPedidosDespacho();
            res.render('Despachador/menu.ejs',{
              usuario:session.username,
              tipoRol:req.signedCookies.tipoRol,
              listaPedidos:listaPedidos
            });
          }
          catch (e) {
            console.error(e)
          }
          break;
        }
        default :{
          res.redirect('/api/login');
        }
      }

    //}
  }

  @Get('gestionPeliculas')
  gestionPeliculas(
      @Res() res,
      @Session() session
  ){
    res.render('Administrador/gestionPeliculas.ejs')
  }

  @Post('autenticar')
  async postAutenticar(
      @Body() body,
      @Session() session,
      @Res() res
  ){
    try {
      const respuestaUsuario = await this._usuarioService
          .buscarUsuario(body.usuario,body.password,body.tipoRol);
      console.log(respuestaUsuario);
      if(respuestaUsuario.length>0){
        session.username=body.usuario;
        res.cookie(
            'tipoRol',
            body.tipoRol,{
              signed:true
            }
        ).redirect('/api/menu')

      }else{
        console.log("datos incorrecto");
        res.redirect('/api/login');
      }
    }catch (e) {
      console.log(e)
    }

  }
}



