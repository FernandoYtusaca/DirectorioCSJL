import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistritoSelector } from './distrito-selector';

describe('DistritoSelector', () => {
  let component: DistritoSelector;
  let fixture: ComponentFixture<DistritoSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistritoSelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistritoSelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
