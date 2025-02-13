export class IngredienteDTO {
  constructor(ingrediente: any, cantidad: any, unidad: any) {
    this.nombre = ingrediente;
    this.cantidad = cantidad;
    this.unidad = unidad;
  }

  nombre?: string;
  cantidad?: number;
  unidad?: string;
}
