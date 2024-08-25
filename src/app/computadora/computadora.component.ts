import { Component, Input, HostBinding } from '@angular/core';
import { Computadora } from '../models/computadora';


@Component({
  selector: 'app-computadora',
  standalone: true,
  imports: [],
  templateUrl: './computadora.component.html',
  styleUrl: './computadora.component.css'
})
export class ComputadoraComponent {
  @Input()
  computadora!: Computadora;
  @HostBinding('attr.class') cssClass = 'col-md-4';

  constructor(){
    
  }
}
