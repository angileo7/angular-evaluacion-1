import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListadoComputadoraComponent } from './listado-computadora/listado-computadora.component';
import { map, Observable, shareReplay, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListadoComputadoraComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-evaluacion-1';
  
  time = new Observable( observer => {
    setInterval(() => observer.next(new Date().toString()), 1000);
  });
}
