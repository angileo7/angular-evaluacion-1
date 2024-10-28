import { Routes } from '@angular/router';
import { ListadoComputadoraComponent } from './listado-computadora/listado-computadora.component';
import { ComputadoraDetalleComponent } from './computadora-detalle/computadora-detalle.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: ListadoComputadoraComponent},
    { path: 'computadora', component: ComputadoraDetalleComponent}
];
