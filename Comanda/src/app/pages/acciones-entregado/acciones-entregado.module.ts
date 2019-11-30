import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AccionesEntregadoPage } from './acciones-entregado.page';

const routes: Routes = [
  {
    path: '',
    component: AccionesEntregadoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AccionesEntregadoPage]
})
export class AccionesEntregadoPageModule {}
