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

  it('Campo correo de tipo texto', () => {
    const fixture = TestBed.createComponent(UsuarioIngresoComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges()
    expect(fixture.debugElement.query(By.css('#submit')).attributes['type']).toEqual('text');
  });

  it('Campo password de tipo password', () => {
    const fixture = TestBed.createComponent(UsuarioIngresoComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges()
    expect(fixture.debugElement.query(By.css('#password')).attributes['type']).toEqual('text');
  });




});
