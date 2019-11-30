import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acciones-entregado',
  templateUrl: './acciones-entregado.page.html',
  styleUrls: ['./acciones-entregado.page.scss'],
})
export class AccionesEntregadoPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }
  goTo(route, param) {
    this.router.navigate([route]);
  }
}
