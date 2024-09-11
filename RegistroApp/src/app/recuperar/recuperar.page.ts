import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  usuario: string = 'Juan';
  

  constructor(private router: Router, public alertController: AlertController, private animationCtrl: AnimationController) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.usuario = navigation.extras.state['username'];
    }
  }

  ngOnInit() {
  }
  RecuperarPassword(){
    if(this.usuario){
      this.Alerta('Mensaje', `Se ha enviado un enlace de recuperación al usuario: ${this.usuario}`);
      
      return;
    }
  }

  Inicio(){
    this.router.navigate(['/login'], {

      state: {

        username: this.usuario,

      },

    });
  }
  async Alerta(titulo: string, mensaje: string) {

    const alert = await this.alertController.create({

      header: titulo,

      message: mensaje,

      buttons: ["Ok"],

    });


    await alert.present();

  }
}
