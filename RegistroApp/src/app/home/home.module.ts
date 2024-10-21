import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HomePageRoutingModule } from './home-routing.module';
import { MisDatosComponent } from '../mis-datos/mis-datos.component';
import { ConsultarDatosComponent } from '../consultar-datos/consultar-datos.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  declarations: [HomePage,MisDatosComponent, ConsultarDatosComponent]
})
export class HomePageModule {}
