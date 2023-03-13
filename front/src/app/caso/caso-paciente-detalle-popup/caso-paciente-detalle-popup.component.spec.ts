/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from "@angular/router/testing";
import { AppHeaderModule } from 'app/app-header/app-header.module';
import { MaterialModule } from 'app/material/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDialogModule } from '@angular/material/dialog';
import { faker } from '@faker-js/faker';
import { Caso } from '../caso';
import { CasoService } from '../caso.service';
import { TranslateModule } from '@ngx-translate/core';

import { CasoPacienteDetallePopupComponent } from './caso-paciente-detalle-popup.component';

describe('CasoPacienteDetallePopupComponent', () => {
  let component: CasoPacienteDetallePopupComponent;
  let fixture: ComponentFixture<CasoPacienteDetallePopupComponent>;
  let debug: DebugElement;

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
        BrowserAnimationsModule,
        MatDialogModule,
        TranslateModule.forRoot()
      ],
      declarations: [
        CasoPacienteDetallePopupComponent
      ],
      providers : [
        CasoService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasoPacienteDetallePopupComponent);
    component = fixture.componentInstance;

    let testCasos : Array<Caso>=[];

    for (let i=0; i<2; i++){
      testCasos[i] = new Caso(
        faker.lorem.sentence(),
        faker.lorem.sentence(),
        faker.datatype.number(),
        faker.lorem.sentence(),
        faker.lorem.sentence(),
        faker.datatype.number(),
        faker.lorem.sentence(),
        faker.datatype.number(),
        faker.lorem.sentence(),
        faker.lorem.sentence(),
        faker.lorem.sentence(),

      )
    }
    component.caso = testCasos;
    fixture.detectChanges();
    debug = fixture.debugElement;

  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CasoPacienteDetallePopupComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
