import { Component, Input, HostBinding, Output, EventEmitter } from '@angular/core';
import { Computadora } from '../models/computadora';
import { NgFor, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';


@Component({
  selector: 'app-computadora',
  standalone: true,
  imports: [NgIf, NgFor, NgSwitch, NgSwitchCase, NgSwitchDefault],
  templateUrl: './computadora.component.html',
  styleUrl: './computadora.component.css'
})
export class ComputadoraComponent {
  @Input() computadora: Computadora;
  @Input() position: number;
  @Input('idx') positionRenombrada: number;
  @HostBinding('attr.class') cssClass = 'col-md-4';
  @Output() clicked: EventEmitter<Computadora>;
  constructor(){
    this.clicked = new EventEmitter();
  }

  ir(){
    this.clicked.emit(this.computadora)
    return false;
  }

}
