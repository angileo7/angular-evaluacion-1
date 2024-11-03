import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DestinoViaje } from './destino-viaje.model';

// ESTADO
export interface DestinosViajesState {
  items: DestinoViaje[];
  loading: boolean;
  favorito: DestinoViaje | null;
}

export function initializeDestinosViajesState() {
  return {
    items: [] as any[],
    loading: false,
    favorito: null as any
  };
}

// ACCIONES
export enum DestinosViajesActionTypes {
  NUEVO_DESTINO = '[Destinos Viajes] Nuevo',
  ELEGIDO_FAVORITO = '[Destinos Viajes] Favorito',
  VOTE_UP = '[Destinos Viajes] Vote Up',
  VOTE_DOWN = '[Destinos Viajes] Vote Down',
  INIT_MY_DATA = '[Destinos Viajes] Init My Data'
}

export class NuevoDestinoAction implements Action {
    readonly type = DestinosViajesActionTypes.NUEVO_DESTINO;
    constructor(public destino: DestinoViaje) {}
}
  
export class ElegidoFavoritoAction implements Action {
    readonly type = DestinosViajesActionTypes.ELEGIDO_FAVORITO;
    constructor(public destino: DestinoViaje) {}
}

export class VoteUpAction implements Action {
  type = DestinosViajesActionTypes.VOTE_UP;
  constructor(public destino: DestinoViaje) {}
}

export class VoteDownAction implements Action {
  type = DestinosViajesActionTypes.VOTE_DOWN;
  constructor(public destino: DestinoViaje) {}
}

export class InitMyDataAction implements Action {
  type = DestinosViajesActionTypes.INIT_MY_DATA;
  constructor(public destinos: string[]) {}
}

export type DestinosViajesActions = NuevoDestinoAction | ElegidoFavoritoAction 
  | VoteUpAction | VoteDownAction | InitMyDataAction;

// REDUCERS
export function reducerDestinosViajes(
    state: DestinosViajesState | undefined,
    action: Action<string>
  ): DestinosViajesState {
    // Inicializa el estado si es undefined
    if (state === undefined) {
      state = initializeDestinosViajesState();
    }
  
    switch (action.type) {
        case DestinosViajesActionTypes.INIT_MY_DATA: {
          const destinos: string[] = (action as InitMyDataAction).destinos;
          
          return {
              ...state,
              items: destinos ? destinos.map((d) => new DestinoViaje(d, '')) : []
            };
        }
        case DestinosViajesActionTypes.NUEVO_DESTINO: {
          const nuevoDestino = (action as NuevoDestinoAction).destino;
          
          return {
            ...state,
            items: [...state.items, nuevoDestino]
          };
        }
        case DestinosViajesActionTypes.ELEGIDO_FAVORITO: {
          const fav: DestinoViaje = (action as ElegidoFavoritoAction).destino;
    
          return {
              ...state,
              favorito: fav,
              items: state.items.map(item =>
                  item.id === fav.id
                      ? { ...item, selected: true }
                      : { ...item, selected: false }
              )
          };     
        }
        case DestinosViajesActionTypes.VOTE_UP: {
          const d: DestinoViaje = (action as VoteUpAction).destino;
          const destino = state.items.find(x => x.id == d.id);

          if(destino){
            const updatedItems = state.items.map((item) =>
              item.id === d.id
                ? { ...item, votes: item.votes + 1 }
                : { ...item }
            );

            return {
              ...state,
              items: updatedItems
            };
          }

          return { ...state };
        }
        case DestinosViajesActionTypes.VOTE_DOWN: {
          const d: DestinoViaje = (action as VoteDownAction).destino;
          const destino = state.items.find(x => x.id == d.id);

          if(destino){
            const updatedItems = state.items.map((item) =>
              item.id === d.id
                ? { ...item, votes: item.votes - 1 }
                : { ...item }
            );

            return {
              ...state,
              items: updatedItems
            };
          }

          return { ...state };
        }
        default: {
            return state;
        }
    }
}

@Injectable()
export class DestinosViajesEffects {

  nuevoAgregado$: Observable<Action> = createEffect(() => 
    this.actions$.pipe(
      ofType(DestinosViajesActionTypes.NUEVO_DESTINO),
      map((action: NuevoDestinoAction) => new ElegidoFavoritoAction(action.destino))
    )
  );

  constructor(private actions$: Actions) {}
}
