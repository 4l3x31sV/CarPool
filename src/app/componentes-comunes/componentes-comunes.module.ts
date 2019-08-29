

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrintErrorComponent } from './print-error/print-error.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    PrintErrorComponent,
    CabeceraComponent,

  ],
  imports: [
    CommonModule, IonicModule
  ],
  exports: [
    PrintErrorComponent,
    CabeceraComponent,
    
  ]
})
export class ComponentesComunesModule { }
