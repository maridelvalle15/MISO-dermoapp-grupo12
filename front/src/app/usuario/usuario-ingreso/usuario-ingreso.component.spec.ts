import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioIngresoComponent } from './usuario-ingreso.component';
import { By } from '@angular/platform-browser';
import { AppComponent } from 'app/app.component';
import { finalize } from 'rxjs';
import { ToastrModule } from 'ngx-toastr';


describe(`TEST del componente "UsuarioIngresoComponent"`, () => {

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
    }).compileComponents();

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




});
