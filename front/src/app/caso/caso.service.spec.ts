import { TestBed, async, inject } from '@angular/core/testing';
import { CasoService } from './caso.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from "@angular/router/testing";
import { AppHeaderModule } from 'app/app-header/app-header.module';
import { MaterialModule } from 'app/material/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { faker } from '@faker-js/faker';

describe('Service: Caso', () => {
  let service : CasoService;
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
    service = TestBed.inject(CasoService)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it( 'debe de traer información del paciente mixto 13', () => {

    service.getCaso(44).subscribe( caso => {
      caso = caso;
        expect( caso.id ).toBe('44');

      })
  });

  it( 'debe de traer información del paciente mixto 13', () => {

    service.getPaciente(50).subscribe( caso => {
      caso = caso;
        expect( caso.nombre_paciente ).toBe('mixto 13');

      })
  });

  it( 'Liberar caso', () => {

    service.liberarCaso(38).subscribe( caso => {
      caso = caso;
        expect( caso.nombre_paciente ).toBe('usuario seco');
      })
  });

  it( 'Enviar diagnostico', () => {
    service.sendDiagnostico(38,"Prueba de integracion").subscribe( caso => {
      caso = caso;
        expect( caso.nombre_paciente ).toBe('usuario seco');
      })

  });

  it( 'Enviar Caso a reclamado', () => {
    service.sendCaso(38).subscribe( caso => {
      caso = caso;
        expect( caso.nombre_paciente ).toBe('usuario seco');
      })
  });

  it( 'Traer agenda', () => {

    service.getAgenda().subscribe( agenda => {
      agenda = agenda;

      })
  });


});
