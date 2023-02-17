/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DiagnosticoListarComponent } from './diagnostico-listar.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from "@angular/router/testing";
import { AppHeaderModule } from 'app/app-header/app-header.module';
import { faker } from '@faker-js/faker';
import { MaterialModule } from 'app/material/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DiagnosticoListarComponent', () => {
  let component: DiagnosticoListarComponent;
  let fixture: ComponentFixture<DiagnosticoListarComponent>;

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
      declarations: [ DiagnosticoListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticoListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
