export  interface Trago {
    id?:number;
    nombre:string;
    tipo:'Ron'|"Vodka" |"tequila"|"Puntas"|"Cerveza";
    gradoAlcohol:number;
    fechaCaducidad:Date;
    precio:number;
}