interface SaludoDavid {
  (sonmbre: string): string;
}

const saludoDavid: SaludoDavid = (nombre: string) => {
  return `Hola, mi nombre es ${nombre}`;
};

type SaludoClase = (name: string) => string;

const saludoClase: SaludoClase = function (nombre) {
  return `Hola, mi nombre es ${nombre}`;
};

interface Libro {
  titulo: string;
  autor: string;
  paginas: number;
}

interface BestSeller extends Libro {
  ventas: number;
}

const cleanCode: BestSeller = {
  titulo: "The Clean Code",
  autor: "Robert C. Martin",
  paginas: 1000,
  ventas: 300000,
};

type LibroType = {
  titulo: string;
  autor: string;
  paginas?: number;
};

type BestSellerType = LibroType & { ventas: number };

const planningXtreme: BestSellerType = {
  titulo: "Planning extreme programming",
  autor: "Martin Fowler",
  paginas: 1000,
  ventas: 1000000,
};
