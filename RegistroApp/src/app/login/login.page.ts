import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AutenticacionService } from '../services/autenticacion.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  user = {usuario: 'Juan', password: '1234'};
  progress: number = 0;
  buffer: number = 100;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private autenticacion : AutenticacionService
  ) {}

  async ingresar() {
    // Validaciones
    if(this.user.usuario==='Juan'&& this.user.password==='1234'){
      const loading = await this.loadingController.create({
        message: 'Iniciando sesión...',
        spinner: 'circles'
      });
      await loading.present();
  
      setTimeout(() => {
        loading.dismiss();
        this.router.navigate(['/home'], {
          state: {
            username: this.user.usuario,
            password: this.user.password,
          },
        });
      }, 2000); 
    }else{
      alert('Usuario o contraseña incorrecta')
    }

    
  }

  // Mostrar una alerta
  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async Recuperar() {
    if (this.user.usuario==='Juan'){
      this.mostrarAlerta('Mensaje','Usuario ha sido encontrado');
      this.router.navigate(['/recuperar'], {
        state: {
          username: this.user.usuario,
        },
      });
    }else{
      await this.mostrarAlerta('Error','El Usuario no ha sido encontrado');
      return;
    }
    
  }

  validarLogin(){
    if(this.user.usuario.length >= 3 && this.user.usuario.length <= 8 && this.user.password.length == 4 && this.user.password.match(/^\d{4}$/)){
      this.autenticacion.login_user(this.user.usuario, this.user.password);
      this.ingresar();  
    }
    else{
      alert("Usuario y/o contraseña incorrectos");
    }
  }
}