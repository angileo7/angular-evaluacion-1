export class Computadora {
/* old way to set/get variables
    nombre:string;
    ram:string;

    constructor(a:string, b:string){
        this.nombre = a;
        this.ram = b;
    } */
   private selected: boolean;
   public servicios: string[];
   id:string;
   constructor(public nombre: string, public ram: string) {
    this.servicios = ['uno', 'dos', 'tres']
   }

   isSelected(): boolean {
    return this.selected;
  }

  setSelected(s: boolean): void  {
    this.selected = s;
  } 
}
