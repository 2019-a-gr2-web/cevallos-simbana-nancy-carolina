import {Module} from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import {FiestaEntity} from "./fiesta.entity";
@Module({
    imports:[
        TypeOrmModule.forFeature(
            [
                FiestaEntity
            ],
            'default'
        ),
    ],//modulos
    controllers:[

    ],//controladores
    providers:[

    ],//servicios
    exports:[

    ]//websockets
})
export class  FiestaModule {

}