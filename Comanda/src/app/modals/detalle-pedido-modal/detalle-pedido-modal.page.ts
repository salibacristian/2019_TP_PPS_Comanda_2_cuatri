import { Component, OnInit, Input } from '@angular/core';
import { Pedido } from '../../model/pedido';
import { Table } from '../../model/table';
import { ModalController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PedidosService } from '../../services/pedidos.service';
import { MesaService } from '../../services/mesa.service';
import { AuthService } from '../../services/auth.service';
import { Detalle } from 'src/app/model/detalle';


@Component({
  selector: 'app-detalle-pedido-modal',
  templateUrl: './detalle-pedido-modal.page.html',
  styleUrls: ['./detalle-pedido-modal.page.scss'],
})

export class DetallePedidoModalPage implements OnInit {

  @Input() pedido: Pedido;
  currentRol: string;
  auxArrayDetalle: Array<Detalle>;

  constructor(
    public router: Router,
    public alertController: AlertController,
    public modalController: ModalController,
    private pedidosService: PedidosService,
    private authService: AuthService,
    private mesaService: MesaService) { }

  ngOnInit() {
    this.filterList();
  }

  async cambiarEstado(pedido: Pedido, estado: string) {
    await this.pedidosService.SetEstado(pedido.id, estado);
    this.presentAlert(estado);
  }


  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  async presentAlert(estado: string) {
    const alert = await this.alertController.create({
      header: estado,
      message: 'operación realizada exitosamente'    
    });

    await alert.present();

    this.dismiss();
  }

  filterList(){
    
    this.authService.getRolwithEmail(this.authService.currentUserId()).subscribe(async (res: any) => {
      res.forEach(r => {
        if (r.idAuth == this.authService.currentUserId()) {
          this.currentRol = r.rol;
        }
      });
      switch (this.currentRol) {
        case 'COCINERO':
            this.auxArrayDetalle = this.pedido.arrayDetalle.filter(detalle =>
              detalle.type == 'COMIDA');
          break;
        case 'BARTENDER':
            this.auxArrayDetalle = this.pedido.arrayDetalle.filter(detalle =>
              detalle.type == 'BEBIDA');
          break;
          case 'MOZO':
            this.auxArrayDetalle = this.pedido.arrayDetalle;
          break;
        default:
          break;
      }
    });
  }

  cerrarMesa(pedido: Pedido){
    this.cambiarEstado(pedido, 'PAGADO');
    this.mesaService.DesocuparMesa(pedido.mesa.id);
    
  }

  async cambiarEstadoDetalle(pedido: Pedido, detalle: Detalle, estado: string){
    var det = pedido.arrayDetalle.find(x => x.nombre == detalle.nombre);
    det.estado = estado;
    await this.pedidosService.UpdateArrayDetalle(pedido);
    if(estado == 'EN PROGRESO'){
      await this.pedidosService.SetEstado(pedido.id, 'EN PROGRESO');
    }
    else if(estado == 'TERMINADO' && !pedido.arrayDetalle.some(x => x.estado != 'TERMINADO')){

      await this.pedidosService.SetEstado(pedido.id, 'TERMINADO');
    }

    this.dismiss();

  }

}


