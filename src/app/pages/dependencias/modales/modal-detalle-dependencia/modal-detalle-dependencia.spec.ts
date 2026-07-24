import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetalleDependencia } from './modal-detalle-dependencia';

describe('ModalDetalleDependencia', () => {
  let component: ModalDetalleDependencia;
  let fixture: ComponentFixture<ModalDetalleDependencia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDetalleDependencia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDetalleDependencia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
