export interface Producto {
    idPadre?:number;
    idProducto?:number;
    nombre:string;
    descripcion:string;
    precio:number;
    fechaLanzamientoProducto:Date;
    anioGarantia:number;
}