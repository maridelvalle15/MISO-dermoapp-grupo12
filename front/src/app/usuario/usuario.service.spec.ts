import { TestBed, async, inject } from '@angular/core/testing';
import { UsuarioService } from './usuario.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from "@angular/router/testing";
import { AppHeaderModule } from 'app/app-header/app-header.module';
import { MaterialModule } from 'app/material/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { faker } from '@faker-js/faker';

describe('Service: Usuario', () => {
  let service : UsuarioService;
  beforeEach(() => {
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
    });
    service = TestBed.inject(UsuarioService)
  });

  it('should ...', inject([UsuarioService], (service: UsuarioService) => {
    expect(service).toBeTruthy();
  }));

  it( 'Login al sitio web', () => {

    service.userLogIn('raul@gmail.com','Odeft2nu').subscribe( login => {
      login = login;

      })

  });

  it( 'Registro de un médico', () => {

    service.userSignUp('MEDICO','juan@gmail.com','Juan','Calle 4','co','bog','General','12456987').subscribe( login => {
      login = login;

      })

  });
});
