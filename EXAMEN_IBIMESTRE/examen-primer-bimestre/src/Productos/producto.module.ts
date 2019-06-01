import {Module} from "@nestjs/common";
import {ProductoController} from "./producto.controller";
import {ProductoService} from "./producto.service";
import {LoginModule} from "../Login/login.module";

@Module({
    imports:[LoginModule],
    controllers:[
        ProductoController
    ],
    providers:[
        ProductoService
    ],
    exports:[
        ProductoService
    ]
})

export class ProductoModule {

}
