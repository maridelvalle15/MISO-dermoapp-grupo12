/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CasoService } from './caso.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from "@angular/router/testing";

describe('Service: Caso', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        RouterTestingModule
      ],
      providers: [CasoService]
    });
  });

  it('should ...', inject([CasoService], (service: CasoService) => {
    expect(service).toBeTruthy();
  }));
});
