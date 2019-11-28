import { Detalle } from './detalle';


export class Pedido {
    id?: string;
    idAuth:string;
    arrayDetalle:Array<Detalle>;
    estado:string;
    total:number;

    numeroMesa: number;//no se persiste en la base
    propina:number;

    constructor(idAuth: string,arrayDetalle:Array<Detalle>,estado:string,total:number) {
        this.idAuth= idAuth;
        this.arrayDetalle = arrayDetalle;
        this.estado= estado;
        this.total = total;
    }
}
