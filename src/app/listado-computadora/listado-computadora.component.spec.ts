import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoComputadoraComponent } from './listado-computadora.component';

describe('ListadoComputadoraComponent', () => {
  let component: ListadoComputadoraComponent;
  let fixture: ComponentFixture<ListadoComputadoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoComputadoraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoComputadoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
