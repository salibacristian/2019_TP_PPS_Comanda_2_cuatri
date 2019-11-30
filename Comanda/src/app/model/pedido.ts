import { Detalle } from './detalle';
import { Table } from './table';


export class Pedido {
    id?: string;
    idAuth:string;
    arrayDetalle:Array<Detalle>;
    estado:string;
    total:number; 
    totalPropina:number; //precio final con propina incluida

    mesa: Table;//no se persiste en la base
    propina:number; //porcentaje de propina a aplicar

    constructor(idAuth: string,arrayDetalle:Array<Detalle>,estado:string,total:number) {
        this.idAuth= idAuth;
        this.arrayDetalle = arrayDetalle;
        this.estado= estado;
        this.total = total;
    }
}
