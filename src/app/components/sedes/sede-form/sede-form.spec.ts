import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SedeForm } from './sede-form';

describe('SedeForm', () => {
  let component: SedeForm;
  let fixture: ComponentFixture<SedeForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SedeForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SedeForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
