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
  segment = "mis-datos";
  username = { usuario: '', password: '' };  // Define el tipo como string

  constructor(private router: Router, public alertController: AlertController, private animationCtrl: AnimationController) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.username = navigation.extras.state['username'];
      console.log(this.username);
    }
  }

  ngAfterViewInit() {
    this.animateTitle();
  }

  animateTitle() {
    const titleElement = document.querySelector('.title-animation');

    if (titleElement) {  // Que titleElement no sea null
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


  Inicio(){
    this.router.navigate(['/login'], {
    });
  }

  onChangeSegment(event: any){
    this.segment = event.detail.value;
  }
  
  navegarAMisDatos() {
    console.log('Navegar con state:', {
      username: this.username,
    });
    this.router.navigate(['/mis-datos'], {
      state: {
        username: this.username,
      },
    });
  }
}