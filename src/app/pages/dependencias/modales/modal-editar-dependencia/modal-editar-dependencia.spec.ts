import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModadlEditarDependencia } from './modal-editar-dependencia';

describe('ModadlEditarDependencia', () => {
  let component: ModadlEditarDependencia;
  let fixture: ComponentFixture<ModadlEditarDependencia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModadlEditarDependencia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModadlEditarDependencia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
