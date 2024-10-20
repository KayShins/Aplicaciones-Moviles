import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  login : boolean = false;
  usuario = '';

  constructor() { }

  login_user(username:string, password : string){
    if(username=='Juan' && password=='1234'){
      this.login=true;
      this.usuario=username;
    }else{
      this.login = false;
    }
  }
  logout_user(){
    this.login=false;
  }
  isLogged() {
    return this.login;
  }
}