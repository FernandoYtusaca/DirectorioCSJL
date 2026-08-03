import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetalleAnexo } from './modal-detalle-anexo';

describe('ModalDetalleAnexo', () => {
  let component: ModalDetalleAnexo;
  let fixture: ComponentFixture<ModalDetalleAnexo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDetalleAnexo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDetalleAnexo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
