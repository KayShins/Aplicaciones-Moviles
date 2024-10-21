import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SqliteService } from '../services/sqlite.service';
import { AnimationController } from '@ionic/angular';
import { AlertController } from '@ionic/angular'; // Asegúrate de importar esto
@Component({
  selector: 'app-consultar-datos',
  templateUrl: './consultar-datos.component.html',
  styleUrls: ['./consultar-datos.component.scss'],
})
export class ConsultarDatosComponent{
  public alumnos: string[] = [];
  public nombre: string;
  public edad: string;
  public rut: string;
  public ruteliminar: string;
  public direccion: string;
  public correo: string;
  public telefono: string;
  alertController: any;

  constructor(private sqlite: SqliteService,private animationCtrl: AnimationController) {
    this.nombre = '';
    this.rut = '';
    this.ruteliminar = '';
    this.edad = '';
    this.direccion = '';
    this.correo = '';
    this.telefono = '';
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

  async consultarDatos() {
    if (!this.rut) {
      console.error('El RUT es requerido');
      return;
    }
  
    try {
      const alumno = await this.sqlite.obtenerAlumnoPorRut(this.rut);
      if (alumno) {
        this.nombre = alumno.nombre;
        this.edad = alumno.edad;
        this.direccion = alumno.direccion;
        this.correo = alumno.correo;
        this.telefono = alumno.telefono;
        console.log('Alumno encontrado:', alumno);
      } else {
        this.presentAlert("Error", "No se encontraron Datos con ese rut.");
        this.limpiar();
      }
    } catch (error) {
      console.error('Error al consultar datos:', error);
    }
  }

  update(nombre: string, edad :string , direccion : string , correo : string , telefono : string) {
    this.sqlite.editarAlumno(this.rut,this.nombre.toLocaleUpperCase(),this.edad.toLocaleUpperCase()
    ,this.direccion.toLocaleUpperCase(),this.correo, this.telefono).then((changes) => {
      console.log(changes);
      this.presentAlert("Exito", "Los datos han sido actualizados.");
      this.sqlite.read(); 
    }).catch(err => {
      console.error(err);
      console.error("Error al actualizar");
    });
  }

  borrado() {
    if (!this.rut) {
      this.presentAlert("Error", "Debe ingresar un RUT para eliminar.");
      return; 
    }
  
    this.sqlite.delete(this.rut).then(() => {
      this.presentAlert("Exito", "Datos Eliminados Correctamente.");
      this.limpiar();
      this.sqlite.read(); 
    }).catch(err => {
      console.error("Error al eliminar datos", err);
    });
  }
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  }

}
