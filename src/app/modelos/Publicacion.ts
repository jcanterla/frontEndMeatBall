import {IngredienteDTO} from "./IngredienteDTO";
import {EtiquetaDTO} from "./EtiquetaDTO";

export class Publicacion{
  id?:number;
  titulo?:string;
  imagenLink?:string;
  descripcion?:string;
  receta?:string;
  dificultad?:string;
  tiempoPreparacion?:number;
  tiempoCoccion?:number;
  raciones?:number;
  usuarioId?: number;
  username?: string;
  fotoPerfilLink?: string;
  estado?: string;

  ingredientes?: IngredienteDTO[];
  etiquetas?: EtiquetaDTO[];
}
