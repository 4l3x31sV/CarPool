import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RutasPasajeroPage } from './rutas-pasajero.page';

describe('RutasPasajeroPage', () => {
  let component: RutasPasajeroPage;
  let fixture: ComponentFixture<RutasPasajeroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutasPasajeroPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutasPasajeroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
