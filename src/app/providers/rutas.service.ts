import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Rutas } from '../model/RutasModel';
@Injectable({
  providedIn: 'root'
})
export class RutasService {
  rootRef: firebase.database.Reference;
  constructor(public afDB: AngularFireDatabase) {
    this.rootRef = this.afDB.database.ref();
  }
  crearRuta(mdlRutas: Rutas): Promise<any> {
    if(!mdlRutas.id){
      mdlRutas.id = Date.now();
    }
   return this.afDB.database.ref('rutas/' + mdlRutas.id).set(mdlRutas);
  }
  obtenerRutas() {
    return this.afDB.list<Rutas>('rutas').valueChanges();
  }
  rutasPorUsuario(idUsuario: number) {
    return this.afDB.list('rutas', ref =>
      ref.orderByChild('idUsuario').equalTo(idUsuario)).valueChanges();
  }
}
