import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from "@angular/router/testing";
import { AppHeaderModule } from 'app/app-header/app-header.module';
import { Caso } from '../caso';
import { faker } from '@faker-js/faker';
import { MaterialModule } from 'app/material/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';

import { CasoAgendaListarComponent } from './caso-agenda-listar.component';

describe('CasoFechaListarComponent', () => {
  let component: CasoAgendaListarComponent;
  let fixture: ComponentFixture<CasoAgendaListarComponent>;

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
        TranslateModule.forRoot()
      ],
      declarations: [ CasoAgendaListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasoAgendaListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
