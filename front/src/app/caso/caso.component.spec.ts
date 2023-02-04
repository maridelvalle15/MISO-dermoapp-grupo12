/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CasoComponent } from './caso.component';

describe('CasoComponent', () => {
  let component: CasoComponent;
  let fixture: ComponentFixture<CasoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
