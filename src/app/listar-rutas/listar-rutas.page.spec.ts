import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarRutasPage } from './listar-rutas.page';

describe('ListarRutasPage', () => {
  let component: ListarRutasPage;
  let fixture: ComponentFixture<ListarRutasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarRutasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarRutasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
