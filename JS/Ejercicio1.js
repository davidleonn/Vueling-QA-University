// Ejercicio 1- Crear function javascript que calcule si eres mayor de edad o no

const MAYORIA_EDAD = 18;
const AÑO_ACTUAL = 2023;

const esMayorDeEdad = (edad) => {
  return edad >= MAYORIA_EDAD;
};

const mayorDeEdad = (edadPersona) => {
  if (edadPersona >= MAYORIA_EDAD) {
    return "Es mayor de edad!";
  } else return "No eres mayor de edad!";
};

calcularSiEsMayorDeEdad = (añoNacimiento) => {
  if (AÑO_ACTUAL - añoNacimiento >= 18) {
    return "Es mayor de edad!";
  } else return "No eres mayor de edad!";
};

console.log(esMayorDeEdad(19));
console.log(esMayorDeEdad(15));

console.log(mayorDeEdad(19));
console.log(mayorDeEdad(13));

console.log(calcularSiEsMayorDeEdad(1993));
console.log(calcularSiEsMayorDeEdad(2010));
