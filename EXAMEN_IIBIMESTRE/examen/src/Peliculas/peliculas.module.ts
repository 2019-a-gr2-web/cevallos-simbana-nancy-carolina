import {Module} from "@nestjs/common";
import {PeliculasEntity} from "./peliculas.entity";
import {PeliculasService} from "./peliculas.service";
import {PeliculasController} from "./peliculas.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {LoginModule} from "../Login/login.module";

@Module({
    imports:[LoginModule,
        TypeOrmModule.forFeature(
            [
                PeliculasEntity
            ],
            'default'
        ),
    ],
    controllers:[
        PeliculasController
    ],
    providers:[
        PeliculasService
    ],
    exports:[
        PeliculasService
    ]
})
 export  class PeliculasModule {

}