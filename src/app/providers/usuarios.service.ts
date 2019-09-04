import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Rutas } from '../model/RutasModel';
import { Usuarios } from '../model/UsuariosFace';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  rootRef: firebase.database.Reference;
  constructor(public afDB: AngularFireDatabase) {
    this.rootRef = this.afDB.database.ref();
  }
  crearUsuario(mdlUsuarios: Usuarios): Promise<any> {
    if(!mdlUsuarios.id){
      mdlUsuarios.id = Date.now();
    }
    return this.afDB.database.ref('usuarios/' + mdlUsuarios.id).set(mdlUsuarios);
  }
  obtenerUsuarios() {
    return this.afDB.list<Usuarios>('usuarios').valueChanges();
  }
}
