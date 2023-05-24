// 2- Crea una función que tome un número entero positivo y verifique si es un número primo

const esNumeroPrimo = (numero) => {
  let primo = true;
  if (numero <= 1) {
    primo = false;
  }
  for (let i = 2; i < numero; i++) {
    if (numero % i === 0) {
      primo = false;
    }
  }
  if (primo == true) {
    console.log("Es numero primo.");
  } else {
    console.log("No es numero primo");
  }
};

esNumeroPrimo(3);
esNumeroPrimo(1);
esNumeroPrimo(67);
esNumeroPrimo(19);
esNumeroPrimo(7);
esNumeroPrimo(50);
