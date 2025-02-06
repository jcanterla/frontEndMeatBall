import { Component, OnInit } from '@angular/core';
import {
  IonButton,
  IonCheckbox,
  IonContent, IonFooter, IonHeader,
  IonInput, IonItem, IonLabel,
  IonList, IonSearchbar, IonSelect, IonSelectOption,
  IonText,
  IonTextarea,
  IonTitle, IonToolbar
} from "@ionic/angular/standalone";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Agregar} from "../modelos/Agregar";
import {AgregarService} from "../servicios/agregar.service";
import {NavbarInferiorComponent} from "../navbar-inferior/navbar-inferior.component";
import {NavbarSuperiorComponent} from "../navbar-superior/navbar-superior.component";

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonContent,
    IonInput,
    IonList,
    IonText,
    IonTitle,
    ReactiveFormsModule,
    IonTextarea,
    IonSearchbar,
    IonSelect,
    IonSelectOption,
    IonHeader,
    IonToolbar,
    NavbarInferiorComponent,
    NavbarSuperiorComponent,
    IonItem
  ]
})
export class AgregarComponent  implements OnInit {
  agregarForm: FormGroup;
  agregar: Agregar = new Agregar();
  imagenUrl: string = "";

  ingredientes: string[] = ['Tomate', 'Cebolla', 'Pimiento', 'Ajo', 'Perejil', 'Sal', 'Pimienta', 'Aceite de oliva', 'Vinagre', 'Huevo', 'Pan', 'Leche', 'Azúcar', 'Harina', 'Mantequilla', 'Levadura', 'Chocolate', 'Cacao', 'Nata', 'Queso', 'Jamón', 'Pollo', 'Ternera', 'Cerdo', 'Pescado', 'Marisco', 'Arroz', 'Pasta', 'Patata', 'Zanahoria', 'Calabacín', 'Berenjena', 'Judía verde', 'Ajo'];
  ingredientesFiltrados: string[] = [];
  etiquetas: string[] = ['Vegetariano', 'Vegano', 'Sin gluten', 'Sin lactosa', 'Rápido', 'Fácil', 'Económico'];
  etiquetasFiltradas: string[] = [];

  constructor(private fb: FormBuilder, private agregarService: AgregarService) {
    this.agregarForm = this.fb.group({
      titulo: [this.agregar.titulo, Validators.required],
      imagen: [this.agregar.imagen_link, Validators.required],
      descripcion: [this.agregar.descripcion, Validators.required],
      receta: [this.agregar.receta, Validators.required],
      dificultad: [this.agregar.dificultad, Validators.required],
      tiempo_preparacion: [this.agregar.tiempo_preparacion, Validators.required],
      tiempo_coccion: [this.agregar.tiempo_coccion, Validators.required],
      raciones: [this.agregar.raciones, Validators.required],
      estado: [this.agregar.estado, Validators.required],
      ingredienteBusqueda: [''],
      cantidad: [''],
      unidad: [''],
      ingredientes: [''],
      etiquetaBusqueda: [''],
      etiquetas: ['']
    });
  }

  ngOnInit() {
    this.agregarForm.get('ingredienteBusqueda')?.valueChanges.subscribe(value => {
      this.filtrarIngredientes(value);
    });

    this.agregarForm.get('etiquetaBusqueda')?.valueChanges.subscribe(value => {
      this.filtrarEtiquetas(value);
    });
  }

  actualizarImagen(event: any) {
    this.imagenUrl = event.target.value;
  }

  NoHayImagen(event: Event) {
    const element = event.target as HTMLImageElement;
    element.src = 'https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';
  }

  doAnyadirPublicacion() {
    this.agregar = this.agregarForm.value;
    this.agregarService.agregar(this.agregar).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  filtrarIngredientes(busqueda: string) {
    this.ingredientesFiltrados = this.ingredientes.filter(ingrediente =>
      ingrediente.toLowerCase().includes(busqueda.toLowerCase())
    );
  }

  anyadirIngrediente() {
    const ingrediente = this.agregarForm.get('ingredienteBusqueda')?.value;
    const cantidad = this.agregarForm.get('cantidad')?.value;
    const unidad = this.agregarForm.get('unidad')?.value;

    if (ingrediente && cantidad && unidad) {
      const nuevoIngrediente = `${ingrediente} - ${cantidad} ${unidad}`;
      const ingredientesActuales = this.agregarForm.get('ingredientes')?.value;
      this.agregarForm.patchValue({
        ingredientes: ingredientesActuales ? `${ingredientesActuales}\n${nuevoIngrediente}` : nuevoIngrediente,
        ingredienteBusqueda: '',
        cantidad: '',
        unidad: ''
      });
    }
  }

  filtrarEtiquetas(busqueda: string) {
    this.etiquetasFiltradas = this.etiquetas.filter(etiqueta =>
      etiqueta.toLowerCase().includes(busqueda.toLowerCase())
    );
  }

  anyadirEtiqueta() {
    const etiqueta = this.agregarForm.get('etiquetaBusqueda')?.value;

    if (etiqueta) {
      const etiquetasActuales = this.agregarForm.get('etiquetas')?.value;
      this.agregarForm.patchValue({
        etiquetas: etiquetasActuales ? `${etiquetasActuales}\n${etiqueta}` : etiqueta,
        etiquetaBusqueda: ''
      });
    }
  }
}
