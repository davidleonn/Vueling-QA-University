// 5- Crea una función que tome una cadena de palabras separadas por espacios y devuelva la palabra más larga.

const palabraMasLarga = (cadenaDePalabras) => {
  let palabras = [];
  let palabraLarga = "";
  palabras = cadenaDePalabras.split(" ");

  palabras.forEach((palabra) => {
    if (palabra.length > palabraLarga.length) {
      palabraLarga = palabra;
    }
  });
  console.log(palabraLarga);
};

palabraMasLarga("Hola que tal soy superman");
