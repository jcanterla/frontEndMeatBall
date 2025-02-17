import { Component, OnInit } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { NgForOf } from "@angular/common";
import { PerfilService } from "../servicios/perfil.service";
import { Perfil } from "../modelos/Perfil";
import { addIcons } from "ionicons";
import { banOutline, eyeOutline } from "ionicons/icons";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-perfiles-admin',
  templateUrl: './perfiles-admin.component.html',
  styleUrls: ['./perfiles-admin.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NgForOf,
    FormsModule
  ]
})
export class PerfilesAdminComponent implements OnInit {
  perfiles: Perfil[] = [];
  filteredItems: Perfil[] = [];
  searchText: string = '';
  selectedEstado: string | null = null;
  isFilterModalOpen: boolean = false;

  constructor(private perfilService: PerfilService) {
    addIcons({
      "ban-outline": banOutline,
      "eye-outline": eyeOutline,
    });
  }

  ngOnInit() {
    this.getPerfiles();
  }

  getPerfiles() {
    this.perfilService.getPerfiles().subscribe({
      next: (perfiles) => {
        this.perfiles = perfiles;
        this.filteredItems = [...perfiles];
        this.applyFilters();
        console.log('Perfiles obtenidos:', perfiles);
      },
      error: (err) => {
        console.error('Error al obtener perfiles:', err);
      }
    });
  }

  setBaneado(id: number | undefined) {
    if (id === undefined) {
      return console.log('ID undefined');
    }

    this.perfilService.setBaneado(id).subscribe({
      next: () => {
        this.getPerfiles();
      },
      error: (err) => {
        console.error('Error al banear perfil:', err);
      }
    });
  }

  setActivo(id: number | undefined) {
    if (id === undefined) {
      return console.log('ID undefined');
    }

    this.perfilService.setActivo(id).subscribe({
      next: () => {
        this.getPerfiles(); // Recargar datos
      },
      error: (err) => {
        console.error('Error al activar perfil:', err);
      }
    });
  }

  onSearch() {
    this.applyFilters();
  }

  onFilterChange() {
    this.applyFilters();
  }

  private applyFilters() {
    const lowerCaseSearchText = this.searchText.toLowerCase().trim();

    this.filteredItems = this.perfiles.filter((item) => {
      const matchesSearch = item.username?.toLowerCase().includes(lowerCaseSearchText);
      const matchesEstado = this.selectedEstado
        ? item.estado?.toLowerCase() === this.selectedEstado.toLowerCase()
        : true; // Si no hay filtro de estado, no se filtra por estado
      return matchesSearch && matchesEstado;
    });

    console.log('Perfiles filtrados:', this.filteredItems);
  }



  openFilterModal() {
    this.isFilterModalOpen = true;
    console.log('Modal abierto');
  }

  closeFilterModal() {
    this.isFilterModalOpen = false;
    console.log('Modal cerrado');
  }
}
