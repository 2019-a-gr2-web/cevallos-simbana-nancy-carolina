import {Module} from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import {DistribuidorEntity} from "./distribuidor.entity";
@Module({
    imports:[
        TypeOrmModule.forFeature(
            [
                DistribuidorEntity
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
export class  DistribuidorModule {

}