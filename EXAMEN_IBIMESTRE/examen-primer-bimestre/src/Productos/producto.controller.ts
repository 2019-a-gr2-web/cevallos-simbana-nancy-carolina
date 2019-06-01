import {Controller, Get, Param, Req, Res} from "@nestjs/common";
import {ProductoService} from "./producto.service";

@Controller('api/producto')
export  class ProductoController {
    constructor(private readonly _ProductoServices:ProductoService){

    }

    @Get('gestionar/:id')
    gestionar(
        @Res() res,
        @Req() req
    ){
        console.log(req.params.id);
        res.render('Productos/gestionproductos.ejs')
    }
}