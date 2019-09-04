import { TestBed } from '@angular/core/testing';

import { ListaUsuariosService } from './lista-usuarios.service';

describe('ListaUsuariosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListaUsuariosService = TestBed.get(ListaUsuariosService);
    expect(service).toBeTruthy();
  });
});
