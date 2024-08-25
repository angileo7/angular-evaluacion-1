import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputadoraComponent } from './computadora.component';

describe('ComputadoraComponent', () => {
  let component: ComputadoraComponent;
  let fixture: ComponentFixture<ComputadoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComputadoraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComputadoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
