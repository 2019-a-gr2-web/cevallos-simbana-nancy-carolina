import {Controller, Get, Req, Res} from "@nestjs/common";
import {ActorService} from "./actor.service";
import {LoginService} from "../Login/login.service";

@Controller('api/padre')

export class ActorController {
    constructor(private readonly _actorServices:ActorService,private readonly _loginService:LoginService){

    }



}