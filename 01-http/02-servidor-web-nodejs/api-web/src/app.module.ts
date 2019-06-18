import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TragosModule} from "./tragos/tragos.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import {TragosEntity} from "./tragos/tragos.entity";
import {DistribuidorModule} from "./distribudor/distribuidor.module";
import {FiestaModule} from "./fiesta/fiesta.module";
import {DistribuidorEntity} from "./distribudor/distribuidor.entity";
import {FiestaEntity} from "./fiesta/fiesta.entity";

@Module({
  imports: [
    TragosModule,
    DistribuidorModule,
    FiestaModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3310,
      username: 'root',
      password: '',
      database: 'test',
      entities: [
          TragosEntity,
          DistribuidorEntity,
          FiestaEntity],
      synchronize: true,
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
