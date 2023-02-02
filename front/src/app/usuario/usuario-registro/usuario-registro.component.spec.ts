import { RouterTestingModule } from '@angular/router/testing';
import { UsuarioRegistroComponent } from './usuario-registro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { ToastrModule } from 'ngx-toastr';
import { UsuarioService } from '../usuario.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        UsuarioRegistroComponent
      ],
    }).compileComponents();
  });


  it('should create', () => {
    expect(UsuarioRegistroComponent).toBeTruthy();
  });

});




