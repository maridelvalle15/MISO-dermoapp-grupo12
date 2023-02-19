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
import { Usuario } from '../usuario';
import { faker } from '@faker-js/faker';




describe(`TEST del componente "UsuarioIngresoComponent"`, () => {
  let component: UsuarioIngresoComponent;
  let fixture: ComponentFixture<UsuarioIngresoComponent>;
  let debug: DebugElement;

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

    let testUsuario : Array<Usuario>=[];

    for (let i=0; i<2; i++){
      testUsuario[i] = new Usuario(
        faker.datatype.number(),
        faker.lorem.sentence(),
        faker.lorem.sentence(),
        faker.lorem.sentence(),
        faker.lorem.sentence(),
        faker.datatype.number(),
        faker.lorem.sentence(),


      )
    }

    fixture.detectChanges();
    debug = fixture.debugElement;

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
