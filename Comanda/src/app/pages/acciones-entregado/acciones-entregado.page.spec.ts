import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionesEntregadoPage } from './acciones-entregado.page';

describe('AccionesEntregadoPage', () => {
  let component: AccionesEntregadoPage;
  let fixture: ComponentFixture<AccionesEntregadoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccionesEntregadoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccionesEntregadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
