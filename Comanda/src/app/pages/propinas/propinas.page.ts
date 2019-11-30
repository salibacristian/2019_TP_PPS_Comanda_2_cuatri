import { Component, OnInit } from '@angular/core';
import { ZBar, ZBarOptions } from '@ionic-native/zbar/ngx';
import { NavController, AlertController, ModalController } from '@ionic/angular';
import {PedidosService} from '../../services/pedidos.service';
import { Pedido } from '../../model/pedido';
import { AuthService } from 'src/app/services/auth.service';
import { AlertModalPage } from 'src/app/modals/alert-modal/alert-modal.page';
import { Router } from '@angular/router';


@Component({
  selector: 'app-propinas',
  templateUrl: './propinas.page.html',
  styleUrls: ['./propinas.page.scss'],
})
export class PropinasPage implements OnInit {
    porcentajePropina:number = 0;
    pedidos = [];
  constructor(
      private zbar: ZBar, 
      public alertController: AlertController,
      public navCtrl: NavController,
      public pedidosService:PedidosService,
      public auth:AuthService,
      private modalController: ModalController,
      public router: Router) { }

  async ngOnInit() {
    //this.setPropinaBD(); //esto se llamaria en caso de exito en la funcion scanner
     this.scanner();
   
  }
  private scanner() {
    let options: ZBarOptions = {
      flash: 'off',
      drawSight: false
    };
    this.zbar.scan(options)
      .then(result => {
          if(result == '0' || result  == '5' || result == '10' || result =='15' || result =='20') {
            this.porcentajePropina = Number(result);
            this.setPropinaBD();
            this.presentModalCustom("Info","Se aplico una propina del  " + this.porcentajePropina + " % ");
            // this.setPropinaBD();
          }
          else
          {
            this.presentModalCustom('Error', 'El codigo qr no es valido');
          }
      })
      .catch(error => {
        this.presentModalCustom('Error', error.message);
      });
  }

  async presentModalCustom(header: string, message: string) {
    const modal = await this.modalController.create({
      component: AlertModalPage,
      cssClass: header === 'Error' ? 'my-custom-modal-css-error' : 'my-custom-modal-css',
      componentProps: {
        header: header,
        message: message,
        action: header == 'Error' ? 'error' : header == 'Info' ? 'info' : 'confirm',
      }
    });

    modal.onDidDismiss()
      .then((data) => {
        this.router.navigate(['home']);
      });

    return await modal.present();
  }





  /*async presentAlert(headerMsj, msj) {
    const alert = await this.alertController.create({
      header: headerMsj,
      message: msj,
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.navCtrl.navigateRoot('home');
        }
      }]
    });
        await alert.present();
    }*/


     setPropinaBD() {
      this.pedidosService.getPedidosBase().subscribe( (pedido) => {
      
        this.pedidos = [];
        pedido.forEach(auxPedido => {
          console.log(auxPedido);
          if(auxPedido.idAuth != undefined && auxPedido.estado == "CONFIRMADO" && auxPedido.propina != undefined) //creo que es cofirmado
          {
            console.log("Push");
            this.pedidos.push(auxPedido);
          }
          
        });
        // console.log(this.pedidos);
        // console.log(this.auth.currentUserId());
        this.pedidos.forEach(element => {
      
          if(element.idAuth == this.auth.currentUserId())
          {
              element.propina = this.porcentajePropina;
              element.totalPropina = (element.total) / (100) * (100 + element.propina);
              this.pedidosService.SetPropina(element);
          }
        });
      });
     
    }

  }
