// 3- Calcular los primeros 10 numeros primos y mostrarlos por pantalla en una lista (array).

const esNumeroPrimo = (numero) => {
  if (numero < 2) {
    return false;
  }
  for (let i = 2; i * i <= numero; i++) {
    if (numero % i === 0) {
      return false;
    }
  }
  return true;
};

let lista = [];
let numeroPrimo = 2;

const obtenerNumerosPrimos = () => {
  while (lista.length < 10) {
    if (esNumeroPrimo(numeroPrimo)) {
      lista.push(numeroPrimo);
    }
    numeroPrimo++;
  }
  return lista;
};
console.log(obtenerNumerosPrimos());
