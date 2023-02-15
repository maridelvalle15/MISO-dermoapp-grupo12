/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CasoListarComponent } from './caso-listar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from "@angular/router/testing";
import { AppHeaderModule } from 'app/app-header/app-header.module';
import { Caso } from '../caso';
import { faker } from '@faker-js/faker';
import { MaterialModule } from 'app/material/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CasoListarComponent', () => {
  let component: CasoListarComponent;
  let fixture: ComponentFixture<CasoListarComponent>;
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
      declarations: [ CasoListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasoListarComponent);
    component = fixture.componentInstance;

    let testCasos : Array<Caso>=[];

    for (let i=0; i<10; i++){
      testCasos[i] = new Caso(
        faker.datatype.number(),
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
    fixture.detectChanges();
    debug = fixture.debugElement;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shouldnt have 10 <tr.listar-casos> elements', () => {
    expect(debug.queryAll(By.css('tr.listar-casos')).length == 10).toBeFalse();
  });

  it('should render title in a h4 tag', () => {
    expect(fixture.debugElement.nativeElement.querySelector('h4').textContent).toContain('Hola Dr.');
 });

 it('should render text in a h5 tag', () => {
  expect(fixture.debugElement.nativeElement.querySelector('h5').textContent).toContain('Casos nuevos o sin médico asignado');
});

});
