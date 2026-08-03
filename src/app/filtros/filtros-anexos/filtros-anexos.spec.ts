import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosAnexos } from './filtros-anexos';

describe('FiltrosAnexos', () => {
  let component: FiltrosAnexos;
  let fixture: ComponentFixture<FiltrosAnexos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosAnexos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltrosAnexos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
