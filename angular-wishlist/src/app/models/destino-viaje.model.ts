
export class DestinoViaje {
    id: string;
    selected: boolean;
    servicios: string[];
    votes: number;
    
    constructor(public nombre: string, public imagenUrl: string){
        this.selected = false;
        this.servicios = ['pileta', 'desayuno'];
        this.id = crypto.randomUUID();
        this.votes = 0;
    }

    /*
    isSelected() : boolean {
        return this.selected;
    }

    setSelected(s: boolean){
        this.selected = s;
    }

    voteUp() {
        this.votes++;
    }

    voteDown() {
        this.votes--;
    }*/
}