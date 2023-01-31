import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegistroComponent } from './registro/registro.component';
import { RegistroModule } from './registro/registro.module';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        HomeComponent,
        RegistroComponent
      ],
    }).compileComponents();
  });



  it('Validar  título', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('DermoApp');
  });


  it('Validar  texto', () => {
    const fixture = TestBed.createComponent(RegistroComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h4')?.textContent).toContain('Formulario de registro para médicos dermatólogos');
  });

  it('Valdiar texto Botón', () => {
    const fixture = TestBed.createComponent(RegistroComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('button')?.textContent).toContain('Registrarse');
  });

});
