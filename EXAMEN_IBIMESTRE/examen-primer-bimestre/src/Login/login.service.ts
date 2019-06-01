import {Injectable, Request,Body,Response} from "@nestjs/common";
import {LoginController} from "./login.controller";

@Injectable()
export class LoginService {
    validarCookies(@Request() req, @Response() res):boolean{
        const  cookieSegura= req.signedCookies;
        if(cookieSegura.usuario){
             return true;
        }else{
            res.redirect('/api/login');
        }
    }
}