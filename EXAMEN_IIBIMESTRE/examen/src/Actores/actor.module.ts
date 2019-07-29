import {Module} from "@nestjs/common";
import {ActorController} from "./actor.controller";
import {ActorService} from "./actor.service";
import {ActorEntity} from "./actor.entity";
import {LoginModule} from "../Login/login.module";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports:[LoginModule,

        TypeOrmModule.forFeature(
            [
                ActorEntity
            ],
            'default'
        ),
    ],
    controllers:[
        ActorController
    ],
    providers:[
        ActorService,
    ],
    exports:[
        ActorService,
    ]
})

export class ActorModule {

}