import {Component, HostListener, OnInit} from '@angular/core';
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
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Agregar} from "../modelos/Agregar";
import {AgregarService} from "../servicios/agregar.service";
import {NavbarInferiorComponent} from "../navbar-inferior/navbar-inferior.component";
import {NavbarSuperiorComponent} from "../navbar-superior/navbar-superior.component";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {IngredienteDTO} from "../modelos/IngredienteDTO";
import {EtiquetaDTO} from "../modelos/EtiquetaDTO";
import {Router} from "@angular/router";

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
    IonItem,
    FormsModule,
    NgIf,
    NgForOf,
    NgClass
  ]
})
export class AgregarComponent  implements OnInit {
  agregarForm: FormGroup;
  agregar: Agregar = new Agregar();
  imagenUrl: string = "";

  ingredientes: string[] = [];
  ingredientesFiltrados: string[] = [];
  etiquetas: string[] = [];
  etiquetasFiltradas: string[] = [];
  isAdmin: boolean = false;


  constructor(private fb: FormBuilder, private agregarService: AgregarService, private router: Router) {
    this.agregarForm = this.fb.group({
      titulo: [this.agregar.titulo, Validators.required],
      imagen: [this.agregar.imagenLink, Validators.required],
      descripcion: [this.agregar.descripcion, Validators.required],
      receta: [this.agregar.receta, Validators.required],
      dificultad: [this.agregar.dificultad, Validators.required],
      tiempo_preparacion: [this.agregar.tiempoPreparacion, Validators.required],
      tiempo_coccion: [this.agregar.tiempoCoccion, Validators.required],
      raciones: [this.agregar.raciones, Validators.required],
      estado: [this.agregar.estado, Validators.required],
      ingredienteBusqueda: [''],
      cantidad: [''],
      unidad: [''],
      etiquetaBusqueda: [''],
      etiquetas: [''],
      ingredientes: ['']
    });
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.actualizarPlaceholder();
  }


  ngOnInit() {
    this.cargarYFiltrarIngredientes();
    this.cargarYFiltrarEtiquetas();

    this.actualizarPlaceholder();
  }


  // Placeholder
  actualizarPlaceholder() {
    const descripcionInput = document.querySelector('.descripcionInput');
    if (descripcionInput) {
      if (window.innerWidth <= 410) {
        descripcionInput.setAttribute('placeholder', 'Descripción');
      } else {
        descripcionInput.setAttribute('placeholder', 'Introduce la descripción de la receta');
      }
    }

    const ingredientesInput = document.querySelector('.ingredientesInput, .recetaInput');
    if (ingredientesInput) {
      if (window.innerWidth <= 410) {
        ingredientesInput.setAttribute('placeholder', 'Ingredientes');
      } else {
        ingredientesInput.setAttribute('placeholder', 'Ingredientes de la receta');
      }
    }

    const recetaInput = document.querySelector('.recetaInput');
    if (recetaInput) {
      if (window.innerWidth <= 410) {
        recetaInput.setAttribute('placeholder', 'Receta');
      } else {
        recetaInput.setAttribute('placeholder', 'Introduce los pasos para preparar la receta');
      }
    }

    const busquedaEtiq = document.querySelector('.busquedaEtiq');
    if (busquedaEtiq) {
      if (window.innerWidth <= 410) {
        busquedaEtiq.setAttribute('placeholder', ' ');
      } else {
        busquedaEtiq.setAttribute('placeholder', 'Buscar etiquetas');
      }
    }
  }


  // Ingredientes
  cargarYFiltrarIngredientes() {
    this.agregarService.obtenerIngredientes().subscribe(
      (ingredientes) => {
        this.ingredientes = ingredientes;

        console.log('Ingredientes:', ingredientes);
      },
      (error) => {
        console.error('Error obteniendo ingredientes:', error);
      }
    );


    this.agregarForm.get('ingredienteBusqueda')?.valueChanges.subscribe(value => {
      this.ingredientesFiltrados = value
        ? this.ingredientes.filter(ingrediente =>
          typeof ingrediente === 'string' && ingrediente.toLowerCase().startsWith(value.toLowerCase())
        )
        : [];
    });
  }


  cargarYFiltrarEtiquetas() {
    this.agregarService.obtenerEtiquetas().subscribe(
      (etiquetas) => {
        this.etiquetas = etiquetas;

        console.log('Etiquetas:', etiquetas);
      },
      (error) => {
        console.error('Error obteniendo etiquetas:', error);
      }
    );

    this.agregarForm.get('etiquetaBusqueda')?.valueChanges.subscribe(value => {
      this.etiquetasFiltradas = value
        ? this.etiquetas.filter(etiqueta =>
          typeof etiqueta === 'string' && etiqueta.toLowerCase().startsWith(value.toLowerCase())
        )
        : [];
    });
  }


  // Imagen Publicación
  actualizarImagen(event: any) {
    this.imagenUrl = event.target.value;
  }

  NoHayImagen(event: Event) {
    const element = event.target as HTMLImageElement;
    element.src = 'https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';
  }


  // Añadir Publicación
  doAnyadirPublicacion() {
    this.agregar.titulo = this.agregarForm.get('titulo')?.value;
    this.agregar.imagenLink = this.agregarForm.get('imagen')?.value;
    this.agregar.descripcion = this.agregarForm.get('descripcion')?.value;
    this.agregar.receta = this.agregarForm.get('receta')?.value;
    this.agregar.dificultad = this.agregarForm.get('dificultad')?.value;
    this.agregar.tiempoPreparacion = this.agregarForm.get('tiempo_preparacion')?.value;
    this.agregar.tiempoCoccion = this.agregarForm.get('tiempo_coccion')?.value;
    this.agregar.raciones = this.agregarForm.get('raciones')?.value;
    this.agregar.estado = this.agregarForm.get('estado')?.value;


    console.log('Publicación:', this.agregar);

    this.agregarService.agregar(this.agregar).subscribe({
      next: (agregar) => {
        console.log('Publicación añadida:', agregar);
        this.router.navigate(['/parati']);
      },
      error: (error) => {
        console.error('Error añadiendo publicación:', error);
        this.router.navigate(['/parati']);
      },
      complete: () => {
        console.log('Publicación completada');
      }
    });
  }


  // Ingredientes en el input
  anyadirIngrediente() {
    const ingrediente = this.agregarForm.get('ingredienteBusqueda')?.value;
    const cantidad = this.agregarForm.get('cantidad')?.value;
    const unidad = this.agregarForm.get('unidad')?.value;

    if (ingrediente && cantidad && unidad) {
      const ingredienteDTO: IngredienteDTO = new IngredienteDTO(ingrediente, cantidad, unidad);

      if (!this.agregar.ingredientes) {
        this.agregar.ingredientes = [];
      }

      this.agregar.ingredientes.push(ingredienteDTO);

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

  seleccionarIngrediente(ingrediente: string) {
    this.agregarForm.patchValue({ ingredienteBusqueda: ingrediente });
    this.ingredientesFiltrados = [];
  }


  seleccionarEtiqueta(etiqueta: string) {
    this.agregarForm.patchValue({ etiquetaBusqueda: etiqueta });
    this.etiquetasFiltradas = [];
  }


  anyadirEtiqueta() {
    const etiqueta = this.agregarForm.get('etiquetaBusqueda')?.value;

    if (etiqueta) {
      const etiquetaDTO = new EtiquetaDTO(etiqueta);

      if (!this.agregar.etiquetas) {
        this.agregar.etiquetas = [];
      }

      this.agregar.etiquetas.push(etiquetaDTO);

      const etiquetasActuales = this.agregarForm.get('etiquetas')?.value;
      this.agregarForm.patchValue({
        etiquetas: etiquetasActuales ? `${etiquetasActuales}\n${etiqueta}` : etiqueta,
        etiquetaBusqueda: ''
      });
    }
  }

}
