import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { LoadingController, Platform } from '@ionic/angular';
@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss'],
})
export class QrCodeComponent  implements OnInit {
  qrText= ''
  constructor(private loadingController : LoadingController, private platform : Platform) { }

  ngOnInit() {}

  capturarScreen(){
    const element = document.getElementById('qrImage') as HTMLElement

    html2canvas(element).then((canvas:HTMLCanvasElement)=>{
      this.downloadImage(canvas);
      if(this.platform.is('capacitor')) this.shareImage(canvas);
      else this.downloadImage(canvas);

    })
  }

  downloadImage(canvas:HTMLCanvasElement){
    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = 'qr.png';
    link.click();
  }
   async shareImage(canvas:HTMLCanvasElement){
    let base64 = canvas.toDataURL();
    let path = 'qr.png';

    const loading = await this.loadingController.create({spinner:'crescent'});
    await loading.present();


    await Filesystem.writeFile({
      path,
      data: base64,
      directory: Directory.Cache
    }).then( async (res)=>{
      let uri=res.uri;
      await Share.share({url:uri});

      await Filesystem.deleteFile({
        path,
        directory:Directory.Cache
      })
    }).finally(() => {
      loading.dismiss();
    })

    

  }
}
