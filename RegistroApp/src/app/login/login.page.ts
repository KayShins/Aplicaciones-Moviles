import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  usuario: string = '';
  password: string = '';
  progress: number = 0;
  buffer: number = 100;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}

  async ingresar() {
    // Validaciones
    if(this.usuario==='Juan' && this.password==='1234'){
      alert('LoginExitoso');
      this.router.navigate(['/home']);
      const loading = await this.loadingController.create({
        message: 'Iniciando sesión...',
        spinner: 'circles'
      });
      await loading.present();
  
      setTimeout(() => {
        loading.dismiss();
        this.router.navigate(['/home'], {
          state: {
            username: this.usuario,
            password: this.password,
          },
        });
      }, 2000); 
    }else{
      alert('Usuario o contraseña Incorrecta')
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
    if (this.usuario==='Juan') {
      alert('Usuario Encontrado');
      this.router.navigate(['/recuperar'], {
        state: {
          username: this.usuario,
        },
      });
    }else{
      await this.mostrarAlerta('Error', 'El usuario es incorrecto');
      return;
    }
    
  }
}