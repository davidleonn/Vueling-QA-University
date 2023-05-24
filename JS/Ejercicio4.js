// 4- Encontrar el número más grande en un array de números negativos y positivos

const array = [-2, 13, 4, -65, 77, 54756785, -345345, 564567567568];
let maximo = [0];

for (let i = 1; i < array.length; i++) {
  if (array[i] > maximo) {
    maximo = array[i];
  }
}
console.log(maximo);
