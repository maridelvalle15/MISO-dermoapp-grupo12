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
import { CasoService } from '../caso.service';





describe('CasoReclamadoListarComponent', () => {
  let component: CasoReclamadoListarComponent;
  let fixture: ComponentFixture<CasoReclamadoListarComponent>;
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
        BrowserAnimationsModule
      ],
      declarations: [ CasoReclamadoListarComponent ],
      providers : [
        CasoService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasoReclamadoListarComponent);
    component = fixture.componentInstance;

    let testCasos : Array<Caso>=[];

    for (let i=0; i<10; i++){
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
    component.casos = testCasos;
    fixture.detectChanges();
    debug = fixture.debugElement;

  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(CasoReclamadoListarComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in a h4 tag', () => {
    expect(fixture.debugElement.nativeElement.querySelector('h5').textContent).toContain('Casos reclamados');
 });





});
