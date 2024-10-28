import { Component, EventEmitter, Output } from '@angular/core';
import { Computadora } from '../models/computadora';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { fromEvent, map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-form-computadora',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './form-computadora.component.html',
  styleUrl: './form-computadora.component.css'
})
export class FormComputadoraComponent {
  @Output() onItemAdded: EventEmitter<Computadora>;
  fg: FormGroup;
  searchResults: string[];

  constructor(fb: FormBuilder){
    this.onItemAdded = new EventEmitter();
    this.fg = fb.group({
      nombre: ['', Validators.compose([
        Validators.required,
        this.nombreValidatorPArametrizable(4)       // nombre de la funcion custom validator

      ])],
      ram: ['']
    });
    this.fg.valueChanges.subscribe((f: any) => {
      console.log(f)
    })
  };

  ngOnInit(){
    let elementNombre = <HTMLInputElement>document.getElementById('nombre');
    fromEvent(elementNombre, 'input')
    .pipe(
      // @ts-ignore
      map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
      filter(text => text.length > 4),
      debounceTime(200),
      distinctUntilChanged(),
     // switchMap(()=> ajax('/assets/datos.json'))
    ).subscribe(ajaxResponse => {
      // @ts-ignore
      this.searchResults = ["lenovo", "compaq", "hewlet packard"];
      console.log(this.searchResults)
    })
  };

  guardar(nombre: string, ram: string){
    const comp = new Computadora(nombre, ram);
    this.onItemAdded.emit(comp);
    return false;
  };

  nombreValidator(control: AbstractControl): { [s: string]: boolean } | null {
    const long = control.value.toString().trim().length;
    if(long > 0 && long < 10)
      return { invalidNombre: true};

    return null;
  };

  nombreValidatorPArametrizable(minLength: number): ValidatorFn | null {
    return (control: AbstractControl): { [s: string]: boolean } | null => {
      const long = control.value.toString().trim().length;
      if(long > 0 && long < minLength)
        return { numLongName: true};
  
      return null;
    }
  };

}
