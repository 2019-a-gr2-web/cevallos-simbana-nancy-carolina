import {Module} from "@nestjs/common";
import {TiendaController} from "./tienda.controller";
import {TiendaServices} from "./tienda.services";
import {LoginModule} from "../Login/login.module";
import {LoginService} from "../Login/login.service";

@Module({
    imports:[LoginModule],
    controllers:[
        TiendaController
    ],
    providers:[
        TiendaServices,
        LoginService
    ],
    exports:[
        TiendaServices,
        LoginService
    ]
})

export class TiendaModule {

}