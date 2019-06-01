import {Controller, Get, Response, Body, Request, Post, Res, Req} from "@nestjs/common";
import {TiendaServices} from "./tienda.services";
import {LoginService} from "../Login/login.service";
import {TiendaModule} from "./tienda.module";
import {Tienda} from "../interfaces/tienda";

@Controller('/api/tienda')

export class TiendaController {
    constructor(private readonly  _loginService:LoginService, private readonly _tiendaServices:TiendaServices){

    }

    @Get('gestionar')
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

    @Post('eliminar')
    eliminar(
        @Res() res,
        @Body('tiendaId') tiendaId
    ){
        this._tiendaServices.eliminar(Number(tiendaId));
        res.redirect('/api/tienda/gestionar')
    }

    @Get('crear')
    crear(
        @Res() res,
        @Req() req
    ){
        if(this._loginService.validarCookies(req,res)){
            res.render('Tienda/crear.ejs',{
                usuario:req.signedCookies.usuario
            });
        }
    }

    @Post('crear')
    crearPost(
        @Res() res,
        @Body() tienda:Tienda,
        @Req() req
    ){
        tienda.nombres=tienda.nombres;
        tienda.direccion=tienda.direccion;
        tienda.ruc=Number(tienda.ruc);
        tienda.fechaApertura=new Date(tienda.fechaApertura);
        tienda.matriz=tienda.matriz;
        this._tiendaServices.crear(tienda);
        res.redirect('/api/tienda/gestionar');
    }

    @Post('buscar')
    buscar(
        @Res() res,
        @Req() req,
        @Body('busqueda')busqueda
    ){
        const listaBusqueda:Tienda[]=this._tiendaServices.buscarPorNombre(busqueda);
        if(this._loginService.validarCookies(req,res)){
            res.render('Tienda/gestiontienda.ejs',{
                usuario:req.signedCookies.usuario,
                listaTienda:listaBusqueda
            });
        }
    }



}