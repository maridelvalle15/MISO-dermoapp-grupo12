import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasoPopupComponent } from './caso-popup.component';

describe('CasoPopupComponent', () => {
  let component: CasoPopupComponent;
  let fixture: ComponentFixture<CasoPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasoPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CasoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
