import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RutasPasajeroPage } from './rutas-pasajero.page';
import { ComponentesComunesModule } from '../componentes-comunes/componentes-comunes.module';

const routes: Routes = [
  {
    path: '',
    component: RutasPasajeroPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentesComunesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RutasPasajeroPage]
})
export class RutasPasajeroPageModule {}
