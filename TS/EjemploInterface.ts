// Creando una Interface
interface Postres {
  nombre: string;
  precio: number;
}
interface Postres {
  stock: number;
}

// Usando la Inteface fusionada
const leerPostre: Postres = {
  nombre: "Tarta de Chocolate",
  precio: 10.5,
  stock: 34,
};

console.log(leerPostre);

/* Obtengo 
  nombre: "Torta de Chocolate", precio: 3.50, stock: 34 */
