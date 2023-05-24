//Sobreescribir tipos primitivos
type Name = string;
const david: Name = "david";

//Union
type Curso = {
  title: string;
  autor: string;
  chapters: number;
};

interface Book {
  title: string;
  autor: string;
  chapters: number;
}

type RecursosDeAprendizajes = Curso | Book;

//Tuple
type AlumnosCurso = [Curso, number];
