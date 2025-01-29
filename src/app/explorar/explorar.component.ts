import { Component, OnInit } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { NavbarInferiorComponent } from "../navbar-inferior/navbar-inferior.component";
import { NavbarSuperiorComponent } from "../navbar-superior/navbar-superior.component";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';

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

  // Lista de URLs de imágenes
  items: { url: string, name: string }[] = [
    { url: 'https://www.lavanguardia.com/files/og_thumbnail/uploads/2018/07/17/5e997a42b5463.jpeg', name: 'Albondiga' },
    { url: 'https://elikaeskola.com/wp-content/uploads/me-siento-culpable-por-comer.png', name: 'Tortilla' },
    { url: 'https://www.hola.com/horizon/landscape/b746be5ae38a-adobestock496117067.jpg', name: 'Ensaladilla' },
    { url: 'https://imag.bonviveur.com/macarrones-con-bacon-y-nata.jpg', name: 'Macarrones' },
    { url: 'https://www.laespanolaaceites.com/wp-content/uploads/2019/06/croquetas-de-jamon-1080x671.jpg', name: 'Croquetas' },
    { url: 'https://recetasdecocina.elmundo.es/wp-content/uploads/2020/01/lentejas-con-chorizo.jpg', name: 'Lentejas' }
  ];
  filteredItems: { url: string, name: string }[] = [];
  searchText: string = ''; // Texto ingresado por el usuario
  selectedFilter: string | null = null; // Filtro seleccionado

  // Opciones para el filtro
  filters: string[] = ['Todos', 'Empiezan con A', 'Empiezan con B'];

  constructor(private router: Router) {}

  ngOnInit() {
    // Inicializar la lista filtrada con todos los elementos
    this.filteredItems = [...this.items];
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
    this.filteredItems = this.items.filter((item) =>
      item.name.toLowerCase().includes(lowerCaseSearchText)
    );

    // Aplicar el filtro adicional (si corresponde)
    if (this.selectedFilter === 'Empiezan con A') {
      this.filteredItems = this.filteredItems.filter((item) =>
        item.name.toLowerCase().startsWith('a')
      );
    } else if (this.selectedFilter === 'Empiezan con B') {
      this.filteredItems = this.filteredItems.filter((item) =>
        item.name.toLowerCase().startsWith('b')
      );
    }
  }

  // Método para navegar a Notificaciones
  navigateToNotificaciones() {
    this.router.navigate(['/notificaciones']);
  }
}
