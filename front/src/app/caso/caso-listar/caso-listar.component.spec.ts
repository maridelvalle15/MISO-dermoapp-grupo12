/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CasoListarComponent } from './caso-listar.component';

describe('CasoListarComponent', () => {
  let component: CasoListarComponent;
  let fixture: ComponentFixture<CasoListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasoListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasoListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
