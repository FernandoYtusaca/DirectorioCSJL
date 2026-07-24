import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dependencias } from './dependencias';

describe('Dependencias', () => {
  let component: Dependencias;
  let fixture: ComponentFixture<Dependencias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dependencias]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dependencias);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
