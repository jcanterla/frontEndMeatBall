import { Component, OnInit, OnDestroy, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { NavbarSuperiorComponent } from "../navbar-superior/navbar-superior.component";
import { NavbarInferiorComponent } from "../navbar-inferior/navbar-inferior.component";
import { addIcons } from "ionicons";
import { notificationsOutline } from "ionicons/icons";
import { Router } from "@angular/router";
import Swiper from "swiper";
import { Publicacion } from "../modelos/Publicacion";
import { ParatiService } from "../services/parati.service";
import { CommonModule } from "@angular/common";
import { NgForOf } from "@angular/common";

@Component({
  selector: 'app-parati',
  templateUrl: './parati.component.html',
  styleUrls: ['./parati.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NavbarSuperiorComponent,
    NavbarInferiorComponent,
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ParatiComponent implements OnInit, OnDestroy {
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;
  publicaciones: Publicacion[] = [];

  slides: string[] = ['Slide1', 'Slide2', 'Slide3'];

  constructor(private router: Router, private paratiService: ParatiService) {
    addIcons({ "notifications-outline": notificationsOutline });
  }

  ngOnInit() {
    this.getPublicaciones();
    this.initializeSwipers();
    window.addEventListener('resize', this.onResize.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.onResize.bind(this));
  }

  navigateToNotificaciones() {
    this.router.navigate(['/notificaciones']);
  }

  getPublicaciones(): void {
    this.paratiService.getPublicacionesParaTi().subscribe({
      next: (data: Publicacion[]) => {
        this.publicaciones = data;
        console.info('Hola soy las publicaciones', this.publicaciones);
        setTimeout(() => this.initializeSwipers(), 0); // Inicializa Swiper después de cargar las publicaciones
      },
      error: (error: any) => console.error('Error: ', error),
      complete: () => console.log('Petición completada')
    });
  }

  initializeSwipers() {
    const swiperElements = document.querySelectorAll('swiper-container');
    swiperElements.forEach(swiperEl => {
      Object.assign(swiperEl, {
        slidesPerView: 1,
        spaceBetween: 10,
        pagination: {
          clickable: true,
        },
        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3, // Cambiar a 3 imágenes en vista de ordenador
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3, // Cambiar a 3 imágenes en vista de ordenador
            spaceBetween: 40,
          },
        },
      });
      swiperEl.initialize();
    });
  }

  onResize() {
    this.initializeSwipers();
  }
}
