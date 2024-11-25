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
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { QrCodeModule } from 'ng-qrcode';
import { QrCodeComponent } from '../qr-code/qr-code.component';
import { ScanComponent } from '../scan/scan.component';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    QrCodeModule
  ],
  declarations: [HomePage,MisDatosComponent, ConsultarDatosComponent, UsuariosComponent,QrCodeComponent,ScanComponent,BarcodeScanningModalComponent]
})
export class HomePageModule {}
