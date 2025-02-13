import {IngredienteDTO} from "./IngredienteDTO";
import {EtiquetaDTO} from "./EtiquetaDTO";

export class Agregar {
  id?: number;
  titulo?: string;
  imagenLink?: string;
  descripcion?: string;
  receta?: string;
  dificultad?: string;
  tiempoPreparacion?: number;
  tiempoCoccion?: number;
  raciones?: number;
  estado?: string;
  usuarioId?: number;
  username?: string;
  ingredientes?: IngredienteDTO[];
  etiquetas?: EtiquetaDTO[];
}
