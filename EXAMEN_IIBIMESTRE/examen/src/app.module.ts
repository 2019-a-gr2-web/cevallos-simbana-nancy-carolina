import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ActorModule} from "./Actores/actor.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import {LoginModule} from "./Login/login.module";
import {PeliculasEntity} from "./Peliculas/peliculas.entity";
import {ActorEntity} from "./Actores/actor.entity";
import {DetalleEntity} from "./Detalle/detalle.entity";
import {PedidoEntity} from "./Pedido/pedido.entity";
import {UsuarioEntity} from "./Usuario/usuario.entity";
import {PeliculasModule} from "./Peliculas/peliculas.module";
import {UsuarioModule} from "./Usuario/usuario.module";
import {PedidoModule} from "./Pedido/pedido.module";
import {DespachoController} from "./Despacho/despacho.controller";
import {DespachoModule} from "./Despacho/despacho.module";

@Module({
  imports: [ActorModule,LoginModule,PeliculasModule,UsuarioModule,PedidoModule,DespachoModule,
      TypeOrmModule.forRoot({
        name: 'default', // Nombre cadena conex por defecto de TYPEORM
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'examen',
        entities: [
            PeliculasEntity,
            ActorEntity,
            DetalleEntity,
            PedidoEntity,
            UsuarioEntity
        ],
        synchronize: true,
        insecureAuth : true,
        dropSchema: false
      })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

