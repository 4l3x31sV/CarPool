import { Injectable } from '@angular/core';
import { Usuarios } from '../model/UsuariosFace';

@Injectable({
  providedIn: 'root'
})
export class ListaUsuariosService {
  private lstUSuarios: Array<Usuarios> = [];
  constructor() { }
  set(lstUSuarios: Array<Usuarios>) {
    this.lstUSuarios = lstUSuarios;
  }
  get() {
    return this.lstUSuarios;
  }
}
