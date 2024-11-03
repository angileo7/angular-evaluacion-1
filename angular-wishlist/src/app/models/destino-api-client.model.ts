import { DestinoViaje } from './destino-viaje.model';
import { Store } from '@ngrx/store';
import { APP_CONFIG, AppConfig, AppState, MyDatabase, db } from '../app.module';
import { ElegidoFavoritoAction, NuevoDestinoAction } from './destino.viajes.state.model';
import { Inject, Injectable, forwardRef } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DestinosApiClient {
  destinos: DestinoViaje[] = [];
  
  constructor(private store: Store<AppState>,
    @Inject(forwardRef(() => APP_CONFIG)) private config: AppConfig,
    private http: HttpClient) {
      this.store
      .select(state => state.destinos)
      .subscribe((data) => {
        //console.log('destinos sub store');
        //console.log(data);
        this.destinos = data.items;
      });
    /*this.store
      .subscribe((data) => {
        console.log('all store');
        console.log(data);
      });*/
  }

  add(d: DestinoViaje) {
    const headers: HttpHeaders = new HttpHeaders({'X-API-TOKEN': 'token-seguridad'});
  
    this.http.post(this.config.apiEndpoint + '/my', { nuevo: d.nombre }, { headers, observe: 'response' })
      .subscribe((response: HttpResponse<{}>) => {
        if (response.status === 200) {
          this.store.dispatch(new NuevoDestinoAction(d));

          const myDb = db;
          myDb.destinos.add(d);
          console.log('todos los destinos de la db!');
          myDb.destinos.toArray().then(destinos => console.log(destinos));
        }
      });
  }

  getAll(): DestinoViaje[] {
    return this.destinos;
  }

  getById(id: String): DestinoViaje {
    return this.destinos.filter(function(d) { return d.id === id; })[0];
  }

  elegir(d: DestinoViaje){
    this.store.dispatch(new ElegidoFavoritoAction(d));
  }
}