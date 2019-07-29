import {Module} from "@nestjs/common";
import {PedidoModule} from "../pedido/pedido.module";
import {DespachoController} from "./despacho.controller";

@Module({
    imports:[PedidoModule],
    controllers:[DespachoController],
    providers:[DespachoController],
    exports:[]

})
export class DespachoModule {

}