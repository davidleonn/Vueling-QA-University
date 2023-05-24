/*  6- Crea una función que tome un objeto y devuelva una nueva versión del objeto donde todos los valores son duplicados. Array numeros * 2. Strings doble de caracteres */

const doblarValorArrayNumeros = (miArrayNumeros) => {
  let arrayNumerosDoblado = [];
  for (let i = 0; i < miArrayNumeros.length; i++) {
    arrayNumerosDoblado.push(miArrayNumeros[i] * 2);
  }
  return arrayNumerosDoblado;
};

let numero = [1, 2, 3];
let numerosDuplicado = doblarValorArrayNumeros(numero);
console.log(numerosDuplicado);

const doblarValorArrayString = (miArrayString) => {
  for (let i = 0; i < miArrayString.length; i++) {
    miArrayString[i] = miArrayString[i].repeat(2);
  }
  return miArrayString;
};

let array = ["Hoa", "que", "tal"];
let arrayDuplicado = doblarValorArrayString(array);
console.log(arrayDuplicado);

const doblarValorObjeto = () => {};
