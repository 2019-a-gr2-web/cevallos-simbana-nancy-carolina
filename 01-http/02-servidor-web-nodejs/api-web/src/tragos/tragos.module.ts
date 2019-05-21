import {Module} from "@nestjs/common";
import {TragosController} from "./tragos.controller";
import {TragosServices} from "./tragos.services";

@Module({
    imports:[],//modulos
    controllers:[
        TragosController
    ],//controladores
    providers:[
        TragosServices
    ],//servicios
    exports:[
        TragosServices
    ]//websockets
})
export class  TragosModule {

}