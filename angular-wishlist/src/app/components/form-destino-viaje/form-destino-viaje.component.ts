import { Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild, forwardRef } from '@angular/core';
import { DestinoViaje } from '../../models/destino-viaje.model';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { APP_CONFIG, AppConfig } from '../../app.module';

@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html',
  styleUrl: './form-destino-viaje.component.css'
})
export class FormDestinoViajeComponent implements OnInit {
  @Output() onItemAdded!: EventEmitter<DestinoViaje>;
  @ViewChild('nombre', { static: true }) nombreInput!: ElementRef;
  fg!: FormGroup;
  minLongitud = 3;
  searchResults!: string[];

  constructor(fb : FormBuilder, @Inject(forwardRef(() => APP_CONFIG)) private config: AppConfig){
    this.onItemAdded = new EventEmitter();
    this.fg = fb.group({
      nombre: ['', Validators.compose([
          Validators.required,
          this.nombreValidator,
          this.nombreValidatorParametrizable(this.minLongitud)
        ])
      ],
      url: ['']
    });

    this.fg.valueChanges.subscribe((form: any) =>{
      console.log("cambio el formulario: " + form);
    });
  }

  ngOnInit(){
    if (typeof document !== 'undefined') {
      let elemNombre = document.getElementById('nombre') as HTMLInputElement;
        fromEvent<KeyboardEvent>(elemNombre, 'input')
          .pipe(
            map((e: KeyboardEvent) => (e.target as HTMLInputElement).value), 
            filter(text => text.length > 2),
            debounceTime(200),
            distinctUntilChanged(),
            switchMap((text: string) => ajax(this.config.apiEndpoint + '/ciudades?q=' + text))
          ).subscribe(ajaxResponse => this.searchResults = ajaxResponse.response as string[]);
    }
  }

  guardar(nombre: string, url: string): boolean {
    const d = new DestinoViaje(nombre, url);
    this.onItemAdded.emit(d);
    return false;
  }

  nombreValidator(control: FormControl): { [s: string]: boolean } {
    let l = control.value.toString().trim().length;
    if (l > 0 && l < 5) {
      return {invalidNombre: true};
    } 
      
    return {};    
  }

  nombreValidatorParametrizable(minLong: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const l = control.value ? control.value.toString().trim().length : 0;
  
      if (l > 0 && l < minLong) {
        return { 'minLongNombre': true };
      }
  
      return null;
    };
  }
}
