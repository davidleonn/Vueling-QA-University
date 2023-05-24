//7- Obtener el promedio de las edades de los usuarios mayores de edad.
const MAYORIA_EDAD = 18;
const esMayorDeEdad = (edad) => {
  return edad >= MAYORIA_EDAD;
};

const promedioMayoresEdad = (arrayEdadUsuarios) => {
  let mayoresEdad = arrayEdadUsuarios.filter((usuario) =>
    esMayorDeEdad(usuario)
  );
  let sumaEdades = 0;
  mayoresEdad.forEach((edad) => {
    sumaEdades += edad;
  });
  let promedio = sumaEdades / mayoresEdad.length;
  return promedio;
};

let test = [11, 22, 35, 67, 4, 9];

console.log(promedioMayoresEdad(test));
