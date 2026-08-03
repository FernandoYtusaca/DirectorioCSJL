import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarAnexo } from './modal-editar-anexo';

describe('ModalEditarAnexo', () => {
  let component: ModalEditarAnexo;
  let fixture: ComponentFixture<ModalEditarAnexo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEditarAnexo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditarAnexo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
