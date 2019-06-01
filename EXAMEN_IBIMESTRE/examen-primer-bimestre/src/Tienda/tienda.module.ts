import {Module} from "@nestjs/common";
import {TiendaController} from "./tienda.controller";
import {TiendaServices} from "./tienda.services";
import {LoginModule} from "../Login/login.module";
import {LoginService} from "../Login/login.service";
import {ProductoService} from "../Productos/producto.service";

@Module({
    imports:[LoginModule],
    controllers:[
        TiendaController
    ],
    providers:[
        TiendaServices,
        LoginService,
        ProductoService
    ],
    exports:[
        TiendaServices,
        LoginService,
        ProductoService
    ]
})

export class TiendaModule {

}