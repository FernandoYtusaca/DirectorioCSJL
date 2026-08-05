import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetalleSede } from './modal-detalle-sede';

describe('ModalDetalleSede', () => {
  let component: ModalDetalleSede;
  let fixture: ComponentFixture<ModalDetalleSede>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDetalleSede]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDetalleSede);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
