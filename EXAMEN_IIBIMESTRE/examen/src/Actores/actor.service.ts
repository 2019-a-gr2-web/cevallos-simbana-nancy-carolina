import {Injectable} from "@nestjs/common";
import {Actor} from "../interfaces/Actor";
import {ActorEntity} from "./actor.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {tryCatch} from "rxjs/internal-compatibility";

@Injectable()
export class ActorService {

    constructor(@InjectRepository(ActorEntity)
                private readonly _actorRepository:Repository<ActorEntity>){


    }

    finAll():Promise<ActorEntity[]>{
        return this._actorRepository.find();

    }

}