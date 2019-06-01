import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TiendaModule} from "./Tienda/tienda.module";
import {ProductoModule} from "./Productos/producto.module";
import {LoginModule} from "./Login/login.module";

@Module({
  imports: [TiendaModule,ProductoModule,LoginModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
