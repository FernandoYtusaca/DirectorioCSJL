import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioDependencia } from './formulario-dependencia';

describe('FormularioDependencia', () => {
  let component: FormularioDependencia;
  let fixture: ComponentFixture<FormularioDependencia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioDependencia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioDependencia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
