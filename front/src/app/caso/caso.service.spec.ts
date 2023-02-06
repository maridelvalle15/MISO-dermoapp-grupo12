/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CasoService } from './caso.service';

describe('Service: Caso', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CasoService]
    });
  });

  it('should ...', inject([CasoService], (service: CasoService) => {
    expect(service).toBeTruthy();
  }));
});
