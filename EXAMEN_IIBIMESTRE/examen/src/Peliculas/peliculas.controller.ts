import {Body, Controller, Get, Post, Render, Req, Res, Session} from "@nestjs/common";
import {PeliculasService} from "./peliculas.service";
import {Pelicula} from "../interfaces/Pelicula";
import {LoginService} from "../Login/login.service";
import {PeliculasEntity} from "./peliculas.entity";
import {PeliculasCreateDto} from "./dto/peliculas.create.dto";
import {validate, ValidationError} from "class-validator";
import {error} from "util";
import {Query} from "@nestjs/common/decorators/http/route-params.decorator";

@Controller('api/actor/gestion')
export class PeliculasController {
    constructor(private readonly _peliculasService:PeliculasService, private  readonly _loginService:LoginService){

    }
    @Get(':idPadre')
    async gestionar(
        @Res() res,
        @Req() req,
        @Session() session
    ){
        console.log(Number(req.params.idPadre));

        try{

            const listaPeliculas= await this._peliculasService.listarPeliculas(Number(req.params.idPadre));
            console.log(listaPeliculas);
            //if(this._loginService.validarCookies(req,res)){
                res.render('Administrador/gestionPeliculas.ejs',{
                    //usuario:req.signedCookies.usuario,
                    usuario:session.username,
                    listaPeliculas:listaPeliculas,
                    idPadre:Number(req.params.idPadre)
                });
            //}
        }
        catch (e) {
            console.error(e)
        }
    }

    @Get('crear/:idPadre')
    crear(
        @Res() res,
        @Req() req,
        @Query() query,
        @Session() session

    ){
        const hoy=new Date();

        let fecha;
        //console.log(query.anioLanzamiento)
        if(query.anioLanzamiento==null){
            fecha=hoy
        }else{
            fecha=new Date(query.anioLanzamiento)
        }

        let mes=fecha.getMonth()+1;
        let dia=fecha.getDate();
        if(mes<10){
            mes="0"+mes;
        };
        if(dia<10){
            dia="0"+dia;
        }
        const anioLanzamiento=fecha.getFullYear()+"-"+mes+"-"+dia;

        //console.log(fecha);
        //if(this._loginService.validarCookies(req,res)){
            res.render('Administrador/crear-editar.ejs',{
                //usuario:req.signedCookies.usuario,
                usuario:session.username,
                idPadre:req.params.idPadre,
                mensaje:query.mensaje,
                campos:query.campos,
                nombre:query.nombre,
                anioLanzamiento:anioLanzamiento,
                rating:query.rating,
                actoresPrincipales:query.actoresPrincipales,
                sinopsis:query.sinopsis
            });
        //}
    }

    @Post('crear/:idPadre')
    async crearPost(
        @Res() res,
        @Body() pelicula:PeliculasEntity,
        @Req() req
    ){
        pelicula.anioLanzamiento=pelicula.anioLanzamiento? new Date(pelicula.anioLanzamiento):undefined;
        pelicula.actorId=req.params.idPadre;
        pelicula.rating=Number(pelicula.rating);
        //console.log(pelicula);
        let peliculaValidar=new PeliculasCreateDto()

        peliculaValidar.nombre=pelicula.nombre;
        peliculaValidar.anioLanzamiento=pelicula.anioLanzamiento;
        peliculaValidar.rating=pelicula.rating;
        peliculaValidar.sinopsis=pelicula.sinopsis
        peliculaValidar.actoresPrincipales=pelicula.actoresPrincipales;
        peliculaValidar.actorId=pelicula.actorId;
        try{
            const errores=await validate(peliculaValidar);
            if(errores.length>0){
                const valores= (<PeliculasCreateDto>errores[0].target)

                const campos=[]
                errores.forEach(value => {
                    console.log(value.property);
                    campos.push(value.property);
                });
                const inputs="&nombre="+valores.nombre+"&anioLanzamiento="+valores.anioLanzamiento+"&rating="+valores.rating+"&actoresPrincipales="+valores.actoresPrincipales+"&sinopsis="+valores.sinopsis
                res.redirect('/api/actor/gestion/crear/'+Number(req.params.idPadre)+"?mensaje=Complete los campos obligatorios "+inputs);
            }else{
                const  respuestaCrear=await this._peliculasService.crear(pelicula);
                res.redirect('/api/actor/gestion/'+Number(req.params.idPadre));
            }


        }catch (e) {
            //console.error(e);
            res.status(500);
            res.send({mensaje: 'Error', codigo: 500});
        }
    }

    @Post('eliminar/:idPadre')
    async eliminar(
        @Res () res,
        @Req () req,
        @Body('peliculaId') peliculaId:number
    ){
        //console.log(peliculaId)

        try{
            const respuestaEliminar=await this._peliculasService.eliminarPorId(peliculaId);
            //console.log(respuestaEliminar);
            res.redirect('/api/actor/gestion/'+Number(req.params.idPadre));
        }catch (e) {
            console.error(e)
        }

    }

    @Post('editar/:idPadre')
    async editar(
        @Res () res,
        @Req () req,
        @Body('peliculaId') peliculaId:number,
        @Session() session
    ){
        //console.log(peliculaId)

        try{
            //const respuestaEditar=await this._peliculasService.eliminarPorId(peliculaId);

            res.render('Administrador/crear-editar.ejs',{
                //usuario:req.signedCookies.usuario,
                usuario:session.username,
                idPadre:req.params.idPadre,

            });
        }catch (e) {
            console.error(e)
        }

    }

    @Post('buscar/:idPadre')
    async buscar(
        @Res() res,
        @Req() req,
        @Body() body,
        @Session() session
    ){

        console.log(body);

        //if(this._loginService.validarCookies(req,res)){


            try {
                const listaPeliculas=await this._peliculasService.buscar(body.nombreBusqueda,body.fechaBusqueda);
                res.render('Administrador/gestionPeliculas.ejs',{
                    //usuario:req.signedCookies.usuario,
                    usuario:session.username,
                    listaPeliculas:listaPeliculas,
                    idPadre:req.params.idPadre
                });
            }catch (e) {
                console.log(e)
            }
        //}
    }

    @Get('consultaPeliculas')
    async peliculas(@Res() res,
                    @Req() req
    ){
        console.log(Number(req.params.idPadre));

        try{

            const listaPeliculas= await this._peliculasService.listarTodo();

            console.log(listaPeliculas);
            res.render({
                listaPeliculas:listaPeliculas
            });

        }
        catch (e) {
            console.error(e)
        }
    }

    @Post('consultar-por-id/:pedido')
    //@Render ('api/menu')
    async consultar(
        @Req() req,
        @Body() body,
        @Session() session,
        @Res() res
    ){
        try{

            const listaPeliculas= await this._peliculasService.listarPeliculas(Number(body.actorId));
            console.log(listaPeliculas);
            res.redirect('/api/menu?pedido='+req.params.pedido+"&actor="+body.actorId);
        }
        catch (e) {
            console.error(e)
        }
    }


}