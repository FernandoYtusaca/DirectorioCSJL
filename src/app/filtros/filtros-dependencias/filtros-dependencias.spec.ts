import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosDependencias } from './filtros-dependencias';

describe('FiltrosDependencias', () => {
  let component: FiltrosDependencias;
  let fixture: ComponentFixture<FiltrosDependencias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosDependencias]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltrosDependencias);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
