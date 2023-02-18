/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CasoReclamadoListarComponent } from './caso-reclamado-listar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from "@angular/router/testing";
import { AppHeaderModule } from 'app/app-header/app-header.module';
import { Caso } from 'app/caso/caso';
import { faker } from '@faker-js/faker';
import { MaterialModule } from 'app/material/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';





describe('CasoReclamadoListarComponent', () => {
  let component: CasoReclamadoListarComponent;
  let fixture: ComponentFixture<CasoReclamadoListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        RouterTestingModule,
        AppHeaderModule,
        MaterialModule,
        BrowserAnimationsModule
      ],
      declarations: [ CasoReclamadoListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasoReclamadoListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
