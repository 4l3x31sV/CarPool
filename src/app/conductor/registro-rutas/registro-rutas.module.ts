import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RegistroRutasPage } from './registro-rutas.page';
import { ComponentesComunesModule } from 'src/app/componentes-comunes/componentes-comunes.module';

const routes: Routes = [
  {
    path: '',
    component: RegistroRutasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentesComunesModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RegistroRutasPage]
})
export class RegistroRutasPageModule {}
