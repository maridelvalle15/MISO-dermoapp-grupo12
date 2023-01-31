import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { UsuarioIngresoComponent } from './usuario/usuario-ingreso/usuario-ingreso.component';
import { UsuarioRegistroComponent } from './usuario/usuario-registro/usuario-registro.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        UsuarioIngresoComponent,
        UsuarioRegistroComponent
      ],
    }).compileComponents();
  });



  it('Validar  título', () => {
    const fixture = TestBed.createComponent(UsuarioIngresoComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('DermoApp');
  });


  it('Validar  texto', () => {
    const fixture = TestBed.createComponent(UsuarioRegistroComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h4')?.textContent).toContain('Formulario de registro para médicos dermatólogos');
  });

  it('Valdiar texto Botón', () => {
    const fixture = TestBed.createComponent(UsuarioRegistroComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('button')?.textContent).toContain('Registrarse');
  });

});
