import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioAnexo } from './formulario-anexo';

describe('FormularioAnexo', () => {
  let component: FormularioAnexo;
  let fixture: ComponentFixture<FormularioAnexo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioAnexo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioAnexo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
