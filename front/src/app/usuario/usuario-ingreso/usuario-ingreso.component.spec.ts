import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, inject , fakeAsync, tick,ComponentFixture } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioIngresoComponent } from './usuario-ingreso.component';
import { By } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { UsuarioService } from '../usuario.service';
import { DebugElement } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe(`TEST del componente "UsuarioIngresoComponent"`, () => {
  let component: UsuarioIngresoComponent;
  let fixture: ComponentFixture<UsuarioIngresoComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),

      ],
      declarations: [
        UsuarioIngresoComponent
      ],
      providers : [
        UsuarioService
      ]
    }).compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioIngresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



  it('should create', () => {
    expect(UsuarioIngresoComponent).toBeTruthy();
  });



  it('Debe retornar formulario valido', () => {
    const fixture = TestBed.createComponent(UsuarioIngresoComponent);
    const app = fixture.componentInstance
    fixture.detectChanges()


    let correo = app.usuarioForm.controls['correo']
    let password = app.usuarioForm.controls['password']

    correo.setValue('juan@gmail.com')
    password.setValue('xxxxxxx')

    expect(app.usuarioForm.invalid).toBeFalse();
  });

  it('Debe retornar formulario invalido', () => {
    const fixture = TestBed.createComponent(UsuarioIngresoComponent);
    const app = fixture.componentInstance
    fixture.detectChanges()


    let correo = app.usuarioForm.controls['correo']
    let password = app.usuarioForm.controls['password']

    correo.setValue('')
    password.setValue('')

    expect(app.usuarioForm.invalid).toBeTrue();
  });



  // it('should delete customer feed', () => {
  //   const mySpy = spyOn<any>(UsuarioService,'userLogIn');

  //   component.onLogInUsuario('emial12','WRMCjiFh');

  //   expect(mySpy).toHaveBeenCalledTimes(1);
  // });





});
