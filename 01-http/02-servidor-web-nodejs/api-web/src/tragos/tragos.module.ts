import {Module} from "@nestjs/common";
import {TragosController} from "./tragos.controller";
import {TragosServices} from "./tragos.services";
import { TypeOrmModule } from '@nestjs/typeorm';
import {TragosEntity} from "./tragos.entity";
@Module({
    imports:[
        TypeOrmModule.forFeature(
            [
                TragosEntity
            ],
            'default'
        ),
    ],//modulos
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