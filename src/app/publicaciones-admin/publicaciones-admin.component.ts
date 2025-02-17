import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {PerfilService} from "../servicios/perfil.service";
import {Perfil} from "../modelos/Perfil";
import {Publicacion} from "../modelos/Publicacion";
import {ParatiService} from "../servicios/parati.service";
import {addIcons} from "ionicons";
import {banOutline, eyeOutline} from "ionicons/icons";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-publicaciones-admin',
  templateUrl: './publicaciones-admin.component.html',
  styleUrls: ['./publicaciones-admin.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ]
})
export class PublicacionesAdminComponent  implements OnInit {

  constructor(private publicacionService: ParatiService) {
    addIcons({
      "ban-outline": banOutline,
      "eye-outline": eyeOutline,
    })
  }
  publicaciones: Publicacion[] = [];
  filteredItems: Publicacion[] = [];
  searchText: string = '';
  selectedEstado: string | null = null;
  isFilterModalOpen: boolean = false;


  ngOnInit() {
    this.getPublicaciones();
    this.getPublicacionesBaneadas();
  }

  getPublicaciones() {
    this.publicacionService.getPublicaciones().subscribe({
      next: (data: Publicacion[]) => {
        this.publicaciones = data;
        console.log('Publicaciones fetched successfully:', data);
        this.filteredItems = [...this.publicaciones];
        this.applyFilters();
      },
      error: (err: any) => {
        console.error('Error fetching publicaciones:', err);
      },
      complete: () => {
        console.log('Fetch publicaciones complete');
        console.log(this.publicaciones);
        this.filteredItems = [...this.publicaciones];
        this.applyFilters();
      }
    });
  }

  getPublicacionesBaneadas() {
    this.publicacionService.getPublicacionesBaneadas().subscribe({
      next: (data: Publicacion[]) => {
        this.publicaciones = [...this.publicaciones, ...data];
        console.log('Publicaciones fetched successfully:', data);
        this.filteredItems = [...this.publicaciones];
        this.applyFilters();
      },
      error: (err: any) => {
        console.error('Error fetching publicaciones:', err);
      },
      complete: () => {
        console.log('Fetch publicaciones complete');
        console.log(this.publicaciones);
        this.filteredItems = [...this.publicaciones];
        this.applyFilters();
      }
    });
  }

  setBaneado(idPublicacion: number | undefined) {

    if(idPublicacion == undefined){
      return console.log('id undefined');
    }

    this.publicacionService.setBaneado(idPublicacion).subscribe({
      next: (data: any) => {
        console.log('Publicacion baneada:', data);
      },
      error: (err: any) => {
        console.error('Error baneando publicacion:', err);
      },
      complete: () => {
        console.log('Baneo publicacion complete');
        this.ngOnInit();
      }
    });
  }

  setActivo(idPublicacion: number | undefined) {

    if(idPublicacion == undefined){
      return console.log('id undefined');
    }

    this.publicacionService.setActivo(idPublicacion).subscribe({
      next: (data: any) => {
        console.log('Publicacion activada:', data);
      },
      error: (err: any) => {
        console.error('Error activando publicacion:', err);
      },
      complete: () => {
        console.log('Activacion publicacion complete');
        this.ngOnInit();
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

    this.filteredItems = this.publicaciones.filter((item) => {
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
