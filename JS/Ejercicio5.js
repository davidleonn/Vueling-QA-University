// 5- Crea una función que tome una cadena de palabras separadas por espacios y devuelva la palabra más larga.

const palabraLarga = (cadenaDePalabras) => {
  let palabras = cadenaDePalabras.split("o");
  console.log(palabras);
  let palabraLarga = "";

  for (let i = 0; i < palabras.length; i++) {
    if (palabras[i].length > palabraLarga.length) {
      palabraLarga = palabras[i];
    }
  }
  console.log(palabraLarga);
};
