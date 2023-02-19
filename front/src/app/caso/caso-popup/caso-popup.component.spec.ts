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
import { CasoPopupComponent } from './caso-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { faker } from '@faker-js/faker';
import { Caso } from '../caso';




describe('CasoPopupComponent', () => {
  let component: CasoPopupComponent;
  let fixture: ComponentFixture<CasoPopupComponent>;
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
        MatDialogModule
      ],
      declarations: [ CasoPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasoPopupComponent);
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
    fixture.detectChanges();
    debug = fixture.debugElement;

  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CasoPopupComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Detalle del caso seleccionado'`, () => {
    const fixture = TestBed.createComponent(CasoPopupComponent);
    expect(fixture.debugElement.nativeElement.querySelector('h4').textContent).toContain('Detalle del caso seleccionado');
  });
});
