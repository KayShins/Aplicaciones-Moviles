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
    if (!this.validarUsuario(this.usuario)) {
      await this.mostrarAlerta('Error', 'El usuario debe tener entre 3 y 8 caracteres alfanuméricos.');
      return;
    }

    if (!this.validarPassword(this.password)) {
      await this.mostrarAlerta('Error', 'La contraseña debe ser numérica y tener 4 dígitos.');
      return;
    }

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
  }

  
  validarUsuario(usuario: string): boolean {
    return /^[a-zA-Z0-9]{3,8}$/.test(usuario);
  }

  validarPassword(password: string): boolean {
    return /^\d{4}$/.test(password);
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
    if (!this.validarUsuario(this.usuario)) {
      await this.mostrarAlerta('Error', 'El usuario debe tener entre 3 y 8 caracteres alfanuméricos.');
      return;
    }
    this.router.navigate(['/recuperar'], {
      state: {
        username: this.usuario,
      },
    });
  }
}