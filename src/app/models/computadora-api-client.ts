import { Computadora } from "./computadora";
import { Subject, BehaviorSubject, Observer } from "rxjs";

export class ComputadoraApiClient {
  computadoras: Computadora[];
  current: Subject<Computadora> = new BehaviorSubject<Computadora>(null);

  constructor() {
    this.computadoras = [];
  };

  add(c: Computadora) {
    this.computadoras.push(c);
  }

  getAll(): Computadora[]{
    return this.computadoras;
  }
 
  getById(id: String): Computadora{
    return this.computadoras.filter(function(c) { return c.id.toString() === id;})[0];
  }

  elegir(c: Computadora) {
    this.computadoras.forEach(x => x.setSelected(false));
    c.setSelected(true);
    this.current.next(c)
  }
  
  subscribeOnChange(fn: Partial<Observer<Computadora>> | ((value: Computadora) => void) | undefined) {
    this.current.subscribe(fn);
  }
}