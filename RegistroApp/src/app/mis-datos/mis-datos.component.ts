import { Component, AfterViewInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import {ElementRef, ViewChild} from '@angular/core';
import { SqliteService } from '../services/sqlite.service';
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
  data: any={
    rut :"",
    nombre:"",
    edad : "",
    direccion : "",
    correo_electronico :"",
    telefono : ""
  }
  constructor(private router: Router, public alertController: AlertController, private animationCtrl: AnimationController, private sqlite : SqliteService) {
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

  async guardar(){
    const {rut, nombre,edad, direccion,correo_electronico, telefono} = this.data;

    if(!rut || !nombre || !edad || !direccion || !correo_electronico||!telefono === null){
      this.presentAlert('Error','Todos los Campos estan vacios');
      return;
    }
    try{
      await this.sqlite.create(rut,nombre,edad,direccion,correo_electronico,telefono);
      this.presentAlert('Exito', 'Alumno Guardado correctamente');
      this.limpiar();
    } catch(Error){
      this.presentAlert('Error', 'No se Guardaron los datos');
      console.error(Error);
    }
  }

}
//||