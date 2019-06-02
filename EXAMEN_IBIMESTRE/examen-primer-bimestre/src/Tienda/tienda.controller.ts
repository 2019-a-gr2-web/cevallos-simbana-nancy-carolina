import {Controller, Get, Response, Body, Request, Post, Res, Req} from "@nestjs/common";
import {TiendaServices} from "./tienda.services";
import {LoginService} from "../Login/login.service";
import {TiendaModule} from "./tienda.module";
import {Tienda} from "../interfaces/tienda";
import {ProductoService} from "../Productos/producto.service";
import {Producto} from "../interfaces/Producto";

@Controller('/api/tienda')

export class TiendaController {
    constructor(private readonly  _loginService:LoginService, private readonly _tiendaServices:TiendaServices, private readonly _productoServices:ProductoService){

    }

    /*@Get('gestion/:idPadre')
    gestionar(
        @Res() res,
        @Req() req
    ){
        let listaProducto:Producto []= this._productoServices.filtrar(Number(req.params.idPadre));
        console.log(listaProducto);
        if(this._loginService.validarCookies(req,res)){
            res.render('Productos/gestionproductos.ejs',{
                usuario:req.signedCookies.usuario,
                listaProducto:listaProducto,
                idPadre:Number(req.params.idPadre)
            });
        }
    }*/

    @Post('eliminar')
    eliminar(
        @Res() res,
        @Body('tiendaId') tiendaId
    ){
        this._tiendaServices.eliminar(Number(tiendaId));
        res.redirect('/api/lista')
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
        res.redirect('/api/lista');
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