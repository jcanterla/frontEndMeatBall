import { Component, OnInit } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { NavbarInferiorComponent } from "../navbar-inferior/navbar-inferior.component";
import { NavbarSuperiorComponent } from "../navbar-superior/navbar-superior.component";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { addIcons } from "ionicons";
import { notificationsOutline } from "ionicons/icons";
import { ParatiService } from "../services/parati.service";
import { Publicacion } from "../modelos/Publicacion";

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
  selectedFilter: string | null = null; // Filtro seleccionado

  // Opciones para el filtro
  filters: string[] = ['Todos', 'Empiezan con A', 'Empiezan con B'];

  constructor(private router: Router, private paratiService: ParatiService) {
    addIcons({ "notifications-outline": notificationsOutline });
  }

  ngOnInit() {
    this.getPublicaciones();
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

    // Aplicar el filtro adicional (si corresponde)
    if (this.selectedFilter === 'Empiezan con A') {
      this.filteredItems = this.filteredItems.filter((item) =>
        item.titulo?.toLowerCase().startsWith('a')
      );
    } else if (this.selectedFilter === 'Empiezan con B') {
      this.filteredItems = this.filteredItems.filter((item) =>
        item.titulo?.toLowerCase().startsWith('b')
      );
    }
  }

  // Método para navegar a Notificaciones
  navigateToNotificaciones() {
    this.router.navigate(['/notificaciones']);
  }

  navigateToVerPublicacion() {
    this.router.navigate(['/verPublicacion']);
  }
}
