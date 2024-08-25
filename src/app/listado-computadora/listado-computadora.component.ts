import { Component } from '@angular/core';
import { ComputadoraComponent } from '../computadora/computadora.component';
import { Computadora } from '../models/computadora';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-listado-computadora',
  standalone: true,
  imports: [ComputadoraComponent, NgFor],
  templateUrl: './listado-computadora.component.html',
  styleUrl: './listado-computadora.component.css'
})
export class ListadoComputadoraComponent {
  computadoras: Computadora[];
  constructor() {
    this.computadoras = [];
  }
  guardar(arg0: string,arg1: string) {
    this.computadoras.push(new Computadora(arg0, arg1))
  return false;
  }

}
