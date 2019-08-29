import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuInicialPage } from './menu-inicial.page';

describe('MenuInicialPage', () => {
  let component: MenuInicialPage;
  let fixture: ComponentFixture<MenuInicialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuInicialPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuInicialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
