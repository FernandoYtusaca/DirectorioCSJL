import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRegistrarDependencia } from './modal-registrar-dependencia';

describe('ModalRegistrarDependencia', () => {
  let component: ModalRegistrarDependencia;
  let fixture: ComponentFixture<ModalRegistrarDependencia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalRegistrarDependencia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalRegistrarDependencia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
