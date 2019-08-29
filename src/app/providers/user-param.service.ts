import { Injectable } from '@angular/core';
import { Usuarios } from '../model/UsuariosFace';

@Injectable({
  providedIn: 'root'
})
export class UserParamService {
  private usuario: Usuarios;
  constructor() { }

  get(): Usuarios {
    return this.usuario;
  }
  set(usuario: Usuarios) {
    this.usuario = usuario;
  }

}
