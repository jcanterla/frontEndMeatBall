import { Component, OnInit } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { NavbarInferiorComponent } from "../navbar-inferior/navbar-inferior.component";
import { NavbarSuperiorComponent } from "../navbar-superior/navbar-superior.component";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { addIcons } from "ionicons";
import { notificationsOutline } from "ionicons/icons";
import { ParatiService } from "../servicios/parati.service";
import { AgregarService } from "../servicios/agregar.service";
import { Publicacion } from "../modelos/Publicacion";
import { IngredienteDTO } from "../modelos/IngredienteDTO";
import { EtiquetaDTO } from "../modelos/EtiquetaDTO";

@Component({
  selector: 'app-explorar',
  templateUrl: './explorar.component.html',
  styleUrls: ['./explorar.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NavbarInferiorComponent,
    NavbarSuperiorComponent,
    FormsModule,
    CommonModule
  ]
})
export class ExplorarComponent implements OnInit {
  publicaciones: Publicacion[] = [];
  filteredItems: Publicacion[] = [];
  searchText: string = ''; // Texto ingresado por el usuario
  selectedIngredientes: string[] = []; // Ingredientes seleccionados
  selectedEtiquetas: string[] = []; // Etiquetas seleccionadas

  // Opciones para el filtro
  ingredientes: string[] = [];
  etiquetas: string[] = [];

  isFilterModalOpen: boolean = false;

  constructor(private router: Router, private paratiService: ParatiService, private agregarService: AgregarService) {
    addIcons({ "notifications-outline": notificationsOutline });
  }

  ngOnInit() {
    this.getPublicaciones();
    this.getIngredientes();
    this.getEtiquetas();
  }

  getPublicaciones(): void {
    this.paratiService.getPublicacionesParaTi().subscribe({
      next: (data: Publicacion[]) => {
        this.publicaciones = data;
        this.filteredItems = [...this.publicaciones];
      },
      error: (error: any) => console.error('Error: ', error),
      complete: () => console.log('Petición completada')
    });
  }

  getIngredientes(): void {
    this.agregarService.obtenerIngredientes().subscribe({
      next: (data: string[]) => {
        this.ingredientes = data;
      },
      error: (error: any) => console.error('Error: ', error)
    });
  }

  getEtiquetas(): void {
    this.agregarService.obtenerEtiquetas().subscribe({
      next: (data: string[]) => {
        this.etiquetas = data;
      },
      error: (error: any) => console.error('Error: ', error)
    });
  }

  // Método que se ejecuta al escribir en la barra de búsqueda
  onSearch() {
    this.applyFilters();
  }

  // Método que se ejecuta al cambiar el filtro
  onFilterChange() {
    this.applyFilters();
  }

  // Aplica tanto el texto de búsqueda como los filtros seleccionados
  private applyFilters() {
    const lowerCaseSearchText = this.searchText.toLowerCase();

    // Filtrar por texto ingresado
    this.filteredItems = this.publicaciones.filter((item) =>
      item.titulo?.toLowerCase().includes(lowerCaseSearchText)
    );

    // Aplicar el filtro de ingredientes
    if (this.selectedIngredientes.length > 0) {
      this.filteredItems = this.filteredItems.filter((item) =>
        this.selectedIngredientes.every(ingrediente =>
          item.ingredientes?.some((ing: IngredienteDTO) => ing.nombre === ingrediente)
        )
      );
    }

    // Aplicar el filtro de etiquetas
    if (this.selectedEtiquetas.length > 0) {
      this.filteredItems = this.filteredItems.filter((item) =>
        this.selectedEtiquetas.every(etiqueta =>
          item.etiquetas?.some((etq: EtiquetaDTO) => etq.nombre === etiqueta)
        )
      );
    }
  }

  // Método para abrir el modal de filtros
  openFilterModal() {
    this.isFilterModalOpen = true;
  }

  // Método para cerrar el modal de filtros
  closeFilterModal() {
    this.isFilterModalOpen = false;
  }

  // Método para navegar a Notificaciones
  navigateToNotificaciones() {
    this.router.navigate(['/notificaciones']);
  }

  navigateToVerPublicacion(item: any) {
    sessionStorage.setItem('publicacion', JSON.stringify(item));
    this.router.navigate(['/verPublicacion']);
  }
}
