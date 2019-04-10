import {Controller, Get, HttpCode, Post} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()//metodo HTTP
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()// metodo HTTP
  //para importar un decorador : alt+enter
  @HttpCode(200)
  postHello(){
    return 'Hola mundo en post';
  }
}
/*
@nombreDecoradorClase()//decorador ->función, se utiliza antes de instanciar clase metodo atributos o constructores , sintaxis: @nombre, este decorador es una función que se ejecuta antes de crearse la clase
//existen decoradores para clase, atributos,parametros de funciones o en metodos
class usuario{
  atributoPublico;
  private atributoPrivado;
  protected atributoProtegido;
  constructor(atributoPublico, stributoPrivado, atributoProtegido){
    this.atributoPublico= atributoPublico;
    this.atributoPrivado=atributoProtegido;
    this.atributoProtegido=this.atributoProtegido

  }
  @MetodoA()
  public metodoPublico(@ParametroA() a){}
  @MetodoB()
  public metodoPrivado(){}
  public metodoProtegido(){}
}
*/