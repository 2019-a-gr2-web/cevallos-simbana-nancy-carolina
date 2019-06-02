import {Body, Controller, Get, Param, Post, Req, Res} from "@nestjs/common";
import {ProductoService} from "./producto.service";
import {LoginService} from "../Login/login.service";
import {Tienda} from "../interfaces/tienda";
import {Query} from "@nestjs/common/decorators/http/route-params.decorator";
import {Producto} from "../interfaces/Producto";

@Controller('api/tienda/gestion')
export  class ProductoController {
    constructor(private readonly _productoServices:ProductoService, private readonly _loginService:LoginService){

    }

    @Get(':idPadre')
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
    }

    @Post('eliminar/:idPadre')
    eliminar(
        @Res() res,
        @Req() req,
        @Body('idProducto')idProducto:number ){
        this._productoServices.eliminar(idProducto,Number(req.params.idPadre));
        res.redirect('/api/tienda/gestion/'+Number(req.params.idPadre));
    }

    @Get('crear/:idPadre')
    crear(
        @Res() res,
        @Req() req
    ){
        if(this._loginService.validarCookies(req,res)){
            res.render('Productos/crear.ejs',{
                usuario:req.signedCookies.usuario,
                idPadre:req.params.idPadre
            });
        }
    }

    @Post('crear/:idPadre')
    crearPost(
        @Res() res,
        @Body() producto:Producto,
        @Req() req
    ){
        producto.idPadre=Number(req.params.idPadre);
        producto.nombre=producto.nombre;
        producto.descripcion=producto.descripcion;
        producto.precio=Number(producto.precio);
        producto.fechaLanzamientoProducto=new Date(producto.fechaLanzamientoProducto);
        producto.anioGarantia=Number(producto.anioGarantia);
        this._productoServices.crear(producto);
        res.redirect('/api/tienda/gestion/'+Number(producto.idPadre))
    }

    @Post('buscar/:idPadre')
    buscar(
        @Res() res,
        @Req() req,
        @Body('busqueda') busqueda:string
    ){
        const listaProducto:Producto[]=this._productoServices.buscarPorNombre(Number(req.params.idPadre),busqueda);
        if(this._loginService.validarCookies(req,res)){
            res.render('Productos/gestionproductos.ejs',{
                usuario:req.signedCookies.usuario,
                listaProducto:listaProducto,
                idPadre:req.params.idPadre
            });
        }
    }
}