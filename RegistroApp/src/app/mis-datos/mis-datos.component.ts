import { Component, AfterViewInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import {ElementRef, ViewChild} from '@angular/core';

import type { Animation } from '@ionic/angular';


@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styleUrls: ['./mis-datos.component.scss'],
})
export class MisDatosComponent  implements AfterViewInit {
  @ViewChild('titulo', { read: ElementRef }) titulo: ElementRef<HTMLIonTitleElement> | undefined;
  @ViewChild('nombre_', { read: ElementRef }) nombre_: ElementRef<HTMLIonInputElement> | undefined;
  @ViewChild('apellido_', { read: ElementRef }) apellido_: ElementRef<HTMLIonInputElement> | undefined;

  private animation: Animation | undefined;
  private animation_nombre: Animation | undefined;
  
  username = { usuario: '', password: '' }; // Inicializa como objeto
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
      this.username = { usuario: navigation.extras.state['username'], password: navigation.extras.state['password'] };
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