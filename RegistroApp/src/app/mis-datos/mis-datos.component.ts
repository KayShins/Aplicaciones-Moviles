import { Component, AfterViewInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { ElementRef, ViewChild } from '@angular/core';
import { SqliteService } from '../services/sqlite.service';
import type { Animation } from '@ionic/angular';
import { defineCustomElements as jeepSqlite } from 'jeep-sqlite/loader';
import { IonInput } from '@ionic/angular';

jeepSqlite(window);
// ||
@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styleUrls: ['./mis-datos.component.scss'],
})
export class MisDatosComponent {
  @ViewChild('titulo', { read: ElementRef }) titulo: ElementRef<HTMLIonTitleElement> | undefined;
  @ViewChild('rut_', { read: ElementRef }) rut_: ElementRef<IonInput> | undefined;
  @ViewChild('nombre_:', { read: ElementRef }) nombre_: ElementRef<IonInput> | undefined;

  private animation: Animation | undefined;
  private animation_nombre: Animation | undefined;

  username = { usuario: '', password: '' }; // Inicializa como objeto
  public nombre: string;
  public edad: string;
  public rut: string;
  public ruteliminar: string;
  public direccion: string;
  public correo: string;
  public telefono: string;
  public alumnos: string[] = [];

  constructor(private router: Router, public alertController: AlertController, private animationCtrl: AnimationController, private sqlite: SqliteService) {
    this.nombre = '';
    this.rut = '';
    this.ruteliminar = '';
    this.edad = '';
    this.direccion = '';
    this.correo = '';
    this.telefono = '';
    this.alumnos = [];
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.username = { usuario: navigation.extras.state['username'], password: navigation.extras.state['password'] };
    }
  }

  ionViewWillEnter() {
    this.read();
    this.animateTitle();
    this.sqlite.init();
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
    this.rut = '';
    this.nombre = '';
    this.edad = '';
    this.direccion = '';
    this.correo = '';
    this.telefono = '';
    const inputs = document.querySelectorAll('ion-input');
    inputs.forEach((input: HTMLIonInputElement) => {
      input.value = ''; // Limpia el valor de cada input
    });
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

  Inicio() {
    this.router.navigate(['/login']);
  }

  guardar() {
    if (!this.rut.trim() || !this.nombre.trim() || !this.edad.trim() || !this.direccion.trim() || !this.correo.trim() || !this.telefono.trim()) {
      this.presentAlert("Error", "Todos los campos son requeridos y no pueden estar vacíos.");
      return; // Terminar la función si hay campos vacíos
    }
    this.sqlite.create(
      this.rut.toLocaleUpperCase(),
      this.nombre.toLocaleUpperCase(),
      this.edad.toLocaleUpperCase(),
      this.direccion.toLocaleUpperCase(),
      this.correo.toLocaleUpperCase(),
      this.telefono.toLocaleUpperCase()
    ).then((changes) => {
      console.log(changes);
      console.log("Creado");
      this.read();
      this.limpiar();
    }).catch(err => {
      console.error(err);
      this.presentAlert("Error", "El rut es unico por lo tanto no puede ingresar el mismo rut dos");
    });
  }

  read() {
    this.sqlite.read().then((alumnos: string[]) => {
      this.alumnos = alumnos;
      console.log("Leído");
      console.log(this.alumnos);
    }).catch(err => {
      console.error(err);
      console.error("Error al leer");
    });
  }

  update(nombre: string) {
    this.sqlite.update(this.nombre.toLocaleUpperCase(), nombre).then((changes) => {
      console.log(changes);
      console.log("Actualizado");
      this.read();  // Leer nuevamente para obtener la lista actualizada
    }).catch(err => {
      console.error(err);
      console.error("Error al actualizar");
    });
  }

  borrado() {
    if (!this.ruteliminar) {
      this.presentAlert("Error", "Debe ingresar un RUT para eliminar.");
      return; 
    }
  
    this.sqlite.delete(this.ruteliminar).then(() => {
      this.presentAlert("Exito", "Datos Eliminados Correctamente.");
      this.limpiar(); 
      this.read(); 
    }).catch(err => {
      console.error("Error al eliminar datos", err);
    });
  }
}
