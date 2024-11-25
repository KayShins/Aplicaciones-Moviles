import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { AlertController, LoadingController, ModalController, Platform, ToastController } from '@ionic/angular';
import { BarcodeScanningModalComponent } from '../home/barcode-scanning-modal.component';
import { LensFacing,BarcodeScanner} from '@capacitor-mlkit/barcode-scanning';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { Clipboard } from '@capacitor/clipboard';
import { Browser } from '@capacitor/browser';


@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss'],
})
export class ScanComponent  implements OnInit {
  scanResult = '';
  constructor(
     private loadingController : LoadingController,
     private platform : Platform, 
     private modalController : ModalController, 
     private toastController: ToastController,
     private alertController : AlertController) { }

  ngOnInit(): void {
    if(this.platform.is('capacitor')){
      BarcodeScanner.isSupported().then();
      BarcodeScanner.checkPermissions().then();
      BarcodeScanner.removeAllListeners().then();

    }
  }

  async startScan(){
    const modal = await this.modalController.create({
      component : BarcodeScanningModalComponent,
      cssClass: 'barcode-scanning-modal',
      showBackdrop:false,
      componentProps :{
        formats:[],
        lensFacing : LensFacing.Back
      }
    });

    await modal.present();

    const {data} = await modal.onWillDismiss();

    if(data){
      this.scanResult = data?.barcode?.displayValue;
    }
  }
  async readBarcodeFromImage(){

    
    const {files} = await FilePicker.pickImages({});

    const path = files[0]?.path;
    if(!path) return;
    const{barcodes}= await BarcodeScanner.readBarcodesFromImage({
      path,
      formats:[]
    })

    this.scanResult = barcodes[0].displayValue;


      
  }

  
  writeToClipboard = async () => {
  await Clipboard.write({
    string: this.scanResult
    });

    const toast = await this.toastController.create({
    message:'Copiado a Portapapeles',
    duration : 1000,
    color:'tertiary',
    icon:'clipboard-outline',
    position:'middle'
    });
  }

 
 openCapacitorSite = async () => {

    const alert = await this.alertController.create({
      header:'Confirmar',
      message: 'Quieres abrir esta url en tu navegador?',
      buttons: [
        {
          text : 'Cancelar',
          role : 'cancelar'
        },{
          text: 'Okey',
          handler : async () => {
            let url = this.scanResult;

            if (!this.scanResult.startsWith('http://') && !this.scanResult.startsWith('https://')) {
              url = 'https://' + this.scanResult;
            }
            
            await Browser.open({ url });

          }
        }
      ]

    });

    await alert.present();

  }



  isUrl() {
    if (!this.scanResult) return false; // Si no hay resultado, no es URL
    const regex = /^(https?:\/\/)?([\w.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/i;
    return regex.test(this.scanResult);
  }
  
}
