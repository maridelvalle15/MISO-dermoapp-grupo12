import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioRegistroComponent } from './usuario-registro.component';


describe(`(1) TEST del componente "UsuarioIngresoComponent"`, () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule
      ],
      declarations: [
        UsuarioRegistroComponent
      ],
    }).compileComponents();

  });


  it('Debe de existir el AppComponent', () => {
    const fixture = TestBed.createComponent(UsuarioRegistroComponent);
    const app = fixture.componentInstance
    expect(app).toBeTruthy();
  });


  it('Debe retornar formulario invalido', () => {
    const fixture = TestBed.createComponent(UsuarioRegistroComponent);
    const app = fixture.componentInstance
    fixture.detectChanges()

    const correo = app.usuarioForm.controls['correo']
    correo.setValue('juanmonitec@gmail.com')

    expect(app.usuarioForm.invalid).toBeTrue();
  });

  it('Debe retornar formulario valido', () => {
    const fixture = TestBed.createComponent(UsuarioRegistroComponent);
    const app = fixture.componentInstance
    fixture.detectChanges()

    let tipousuario = app.usuarioForm.controls['tipousuario']
    let nombre = app.usuarioForm.controls['nombre']
    let pais = app.usuarioForm.controls['pais']
    let ciudad = app.usuarioForm.controls['ciudad']
    let direccion = app.usuarioForm.controls['direccion']
    let licencia = app.usuarioForm.controls['licencia']
    let especialidad = app.usuarioForm.controls['especialidad']
    let correo = app.usuarioForm.controls['correo']


    tipousuario.setValue('MEDICO')
    nombre.setValue('Juan Oliveros')
    pais.setValue('co')
    ciudad.setValue('bog')
    direccion.setValue('calle')
    licencia.setValue('co')
    especialidad.setValue('Lunares')
    correo.setValue('co')

    expect(app.usuarioForm.invalid).toBeTrue();
  });

});
