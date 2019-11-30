import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ComandaServiceService } from 'src/app/services/comanda-service.service';
import { AlertController, NavController, ModalController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Table, TableType } from '../../model/table';
import { MesaService } from 'src/app/services/mesa.service';
import { AlertModalPage } from 'src/app/modals/alert-modal/alert-modal.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alta-mesa',
  templateUrl: './alta-mesa.page.html',
  styleUrls: ['./alta-mesa.page.scss'],
})
export class AltaMesaPage implements OnInit {

  myForm: FormGroup;
  image: string;
  table: Table;

  constructor(
    private comandaService: ComandaServiceService,
    private alertController: AlertController,
    private barcodeScanner: BarcodeScanner,
    private camera: Camera,
    public navCtrl: NavController,
    private mesaService: MesaService,
    private modalController: ModalController,
    public router: Router) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      number: new FormControl('', [Validators.required]),
      capacity: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
    });
  }

  /** funcion para tomar la foto con @ionic-native/camera/ngx */
  takePhoto() {
    const options: CameraOptions = {
      quality: 50,
      targetWidth: 400,
      targetHeight: 400,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true,
    };

    this.camera.getPicture(options).then((imageData) => {
      if (imageData) {
        this.image = `data:image/jpeg;base64,${imageData}`;
      }
    }, (err) => {
      this.presentModalCustom('Error',err);
    });
  }

  save() {
    const img = this.image ? this.image : '';
    try {
      this.table = new Table(
        "",
        this.myForm.get('number').value,
        this.myForm.get('capacity').value,
        this.myForm.get('type').value,
        img,
        true);

      this.mesaService.saveTable(this.table);
      var tableCodeStr = "table:" + this.table.number;
      this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, tableCodeStr)
        .then((encodedData) => {
          console.log(encodedData);
        }, (err) => {
          console.log("Error occured : " + err);
        });
      this.presentModalCustom('Home', 'El alta se realizo exitosamente');
    } catch (error) {
      this.presentModalCustom('Home', error.message);
    }
  }

  async presentModalCustom(header: string, message: string) {
    const modal = await this.modalController.create({
      component: AlertModalPage,
      cssClass: header === 'Error' ? 'my-custom-modal-css-error' : 'my-custom-modal-css',
      componentProps: {
        header: header === 'Home' ? 'Info' : header,
        message: message,
        action: header == 'Error' ? 'error' : header == 'Info' ? 'info' : header == 'Home' ? 'home' : 'confirm',
      }
    });

    modal.onDidDismiss()
      .then((data) => {
        if(data['dismissed']) {

        } else
          this.router.navigate(['home']);
      });

    return await modal.present();
  }

  /*async presentAlert(err) {
    const alert = await this.alertController.create({
      header: 'Aviso',
      subHeader: 'Error',
      message: err,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlertSuccess(mensaje) {
    const alert = await this.alertController.create({
      header: 'Aviso',
      message: mensaje,
      buttons: [
        {
          text: '',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.navCtrl.navigateRoot('home');
          }
        }
      ]
    });

    await alert.present();
  }*/


}

