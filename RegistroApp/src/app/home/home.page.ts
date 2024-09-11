import { Component, AfterViewInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {
  usuario: string = 'Juan';  // Define el tipo como string
  niveles: any[] = [
    {id: 1, nivel: "Basica Incompleta"},
    {id: 2, nivel: "Basica Completa"},
    {id: 3, nivel: "Media Incompleta"},
    {id: 4, nivel: "Media Completa"},
    {id: 5, nivel: "Media Incompleta"},
    {id: 6, nivel: "Superior Completa"}
  ];
  data: any = {
    nombre: "",
    apellido: "",
    education: "",
    nacimiento: ""
  };

  constructor(private router: Router, public alertController: AlertController, private animationCtrl: AnimationController) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.usuario = navigation.extras.state['usuario'];
      console.log(this.usuario);
    }
  }

  ngAfterViewInit() {
    this.animateTitle();
  }

  animateTitle() {
    const titleElement = document.querySelector('.title-animation');

    if (titleElement) {  // Asegúrate de que titleElement no es null
      const titleAnimation = this.animationCtrl.create()
        .addElement(titleElement)
        .duration(2500)
        .iterations(Infinity)
        .keyframes([
          { offset: 0, transform: 'translateX(0)', opacity: '1' },
          { offset: 0.25, transform: 'translateX(50%)', opacity: '0.2' },
          { offset: 0.5, transform: 'translateX(-50%)', opacity: '1' },
          { offset: 1, transform: 'translateX(0)', opacity: '1' },
        ]);

      titleAnimation.play();
    }
  }

  limpiar() {
    const inputs = document.querySelectorAll('ion-input');

    const inputAnimation = this.animationCtrl.create()
      .addElement(inputs)
      .duration(1000)
      .keyframes([
        { offset: 0, transform: 'translateX(0)' },
        { offset: 0.25, transform: 'translateX(-10px)' },
        { offset: 0.5, transform: 'translateX(10px)' },
        { offset: 0.75, transform: 'translateX(-10px)' },
        { offset: 1, transform: 'translateX(0)' },
      ]);

    inputAnimation.play();

    for (let key in this.data) {
      this.data[key] = '';
    }
  }

  mostrar() {
    if (this.data.nombre !== "" && this.data.apellido !== "") {
      this.presentAlert("Usuario", "Su nombre es " + this.data.nombre + " " + this.data.apellido);
    }
  }

  async presentAlert(titulo: string, message: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  Inicio(){
    this.router.navigate(['/login'], {
    });
  }
}