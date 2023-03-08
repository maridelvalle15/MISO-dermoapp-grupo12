/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CasoReclamadoDetallePopupComponent } from './caso-reclamado-detalle-popup.component';

describe('CasoReclamadoDetallePopupComponent', () => {
  let component: CasoReclamadoDetallePopupComponent;
  let fixture: ComponentFixture<CasoReclamadoDetallePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasoReclamadoDetallePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasoReclamadoDetallePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
