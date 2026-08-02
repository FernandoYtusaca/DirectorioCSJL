import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRegistrarAnexo } from './modal-registrar-anexo';

describe('ModalRegistrarAnexo', () => {
  let component: ModalRegistrarAnexo;
  let fixture: ComponentFixture<ModalRegistrarAnexo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalRegistrarAnexo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalRegistrarAnexo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
