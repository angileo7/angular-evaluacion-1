import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComputadoraComponent } from './form-computadora.component';

describe('FormComputadoraComponent', () => {
  let component: FormComputadoraComponent;
  let fixture: ComponentFixture<FormComputadoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormComputadoraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormComputadoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
