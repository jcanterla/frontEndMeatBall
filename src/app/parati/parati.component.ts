import { Component, OnInit, OnDestroy, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
import { IonicModule, ViewWillEnter } from "@ionic/angular";
import { NavbarSuperiorComponent } from "../navbar-superior/navbar-superior.component";
import { NavbarInferiorComponent } from "../navbar-inferior/navbar-inferior.component";
import { addIcons } from "ionicons";
import { notificationsOutline } from "ionicons/icons";
import { Router } from "@angular/router";
import Swiper from "swiper";
import { Publicacion } from "../modelos/Publicacion";
import { ParatiService } from "../servicios/parati.service";
import { CommonModule } from "@angular/common";
import {PerfilService} from "../servicios/perfil.service";

@Component({
  selector: 'app-parati',
  templateUrl: './parati.component.html',
  styleUrls: ['./parati.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NavbarSuperiorComponent,
    NavbarInferiorComponent,
    CommonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ParatiComponent implements OnInit, OnDestroy, ViewWillEnter {
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;
  publicaciones: Publicacion[] = [];
  publicacionesAleatorias: Publicacion[] = [];
  isAdminB: boolean = false;

  constructor(private router: Router, private paratiService: ParatiService, private perfilService: PerfilService) {
    addIcons({ "notifications-outline": notificationsOutline });
  }

  ngOnInit() {
    this.getPublicaciones();
    this.getPublicacionesAleatorias();
    this.isAdmin();
    setTimeout(() => this.initializeSwipers(), 0);
    window.addEventListener('resize', this.onResize.bind(this));

  }

  ionViewWillEnter() {
    this.getPublicaciones();
    this.getPublicacionesAleatorias();
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.onResize.bind(this));
  }

  navigateToNotificaciones() {
    this.router.navigate(['/notificaciones']);
  }

  getPublicaciones(): void {
    this.paratiService.getPublicacionesDeSeguidos().subscribe({
      next: (data: Publicacion[]) => {
        this.publicaciones = data;
        setTimeout(() => this.initializeSwipers(), 0);
      },
      error: (error: any) => console.error('Error: ', error),
      complete: () => console.log('Petición completada')
    });
  }

  getPublicacionesAleatorias(): void {
    this.paratiService.getPublicacionesAleatorias().subscribe({
      next: (data: Publicacion[]) => {
        this.publicacionesAleatorias = data;
        setTimeout(() => this.initializeSwipers(), 0);
      },
      error: (error: any) => console.error('Error: ', error),
      complete: () => console.log('Petición completada')
    });
  }

  initializeSwipers() {
    const swiperElements = document.querySelectorAll('swiper-container');

    swiperElements.forEach(swiperEl => {
      Object.assign(swiperEl, {
        pagination: {
          clickable: true,
        },
        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
            slidesPerGroup: 2,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
            slidesPerGroup: 3,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 40,
            slidesPerGroup: 4,
          },
        },
      });
      swiperEl.initialize();
    });
  }

  isAdmin(): void{
    this.perfilService.isAdmin().subscribe({
      next: (data: boolean) => {
          this.isAdminB = data;
          sessionStorage.setItem('isAdmin', this.isAdminB.toString());
          console.log('Es admin', this.isAdminB);
      },
      error: (error: any) => console.error('Error: ', error),
      complete: () => console.log('Petición completada de admin')
    });
  }

  navigateToVerPublicacion(publicacion: Publicacion) {
    sessionStorage.setItem('publicacion', JSON.stringify(publicacion));
    this.router.navigate(['/verPublicacion']);
  }

  onResize() {
    this.initializeSwipers();
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
