import {Controller} from "@nestjs/common";
import {LoginService} from "../../../../EXAMEN_IBIMESTRE/examen-primer-bimestre/src/Login/login.service";

@Controller('api/login')
export class LoginController {
    constructor(private readonly _loginService:LoginService){

    }
}