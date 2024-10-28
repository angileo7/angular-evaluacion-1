import { Component, EventEmitter, Output } from '@angular/core';
import { ComputadoraComponent } from '../computadora/computadora.component';
import { Computadora } from '../models/computadora';
import { ComputadoraApiClient } from '../models/computadora-api-client';
import { NgFor, NgIf } from '@angular/common';
import { FormComputadoraComponent } from "../form-computadora/form-computadora.component";

@Component({
  selector: 'app-listado-computadora',
  standalone: true,
  imports: [ComputadoraComponent, NgFor, NgIf, FormComputadoraComponent],
  templateUrl: './listado-computadora.component.html',
  styleUrl: './listado-computadora.component.css'
})
export class ListadoComputadoraComponent {
/*   computadoras: Computadora[]; */
updates: string[];
computadoraApiClient;
  constructor() {
    this.computadoraApiClient = new ComputadoraApiClient();
    this.updates = [];
    this.computadoraApiClient.subscribeOnChange((c: Computadora) => {
      if(c != null)
        this.updates.push("Se ha elegido " + c.nombre);
    })
  /*   this.computadoras = []; */
  }
/*   guardar(arg0: string,arg1: string) {
    this.computadoras.push(new Computadora(arg0, arg1))
  return false;
  } */

  agregado(c: Computadora) {
    this.computadoraApiClient.add(c);
  };

  elegir(arg0: Computadora) {
    this.computadoraApiClient.elegir(arg0);
/*     this.computadoras.forEach(function (x) {
      x.setSelected(false);
    });
    arg0.setSelected(true); */
  };
};
