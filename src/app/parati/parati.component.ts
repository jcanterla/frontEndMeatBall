import {Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {NavbarSuperiorComponent} from "../navbar-superior/navbar-superior.component";
import {NavbarInferiorComponent} from "../navbar-inferior/navbar-inferior.component";
import {addIcons} from "ionicons";
import {notificationsOutline} from "ionicons/icons";
import {Router} from "@angular/router";
import Swiper from "swiper";
import {Publicacion} from "../modelos/Publicacion";
import {ParatiService} from "../services/parati.service";
import {CommonModule} from "@angular/common";


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
export class ParatiComponent{
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;
  publicaciones: Publicacion[] = [];

  constructor(private router: Router, private paratiService: ParatiService) {
    addIcons({"notifications-outline": notificationsOutline})
  }

  ngOnInit() {
    this.getPublicaciones();
  }

  navigateToNotificaciones() {
    this.router.navigate(['/notificaciones']);
  }

  getPublicaciones(): void {
      this.paratiService.getPublicacionesParaTi().subscribe({
        next: (data: Publicacion[]) => {
          this.publicaciones = data;
          console.info('Hola soy las publicaciones', this.publicaciones);
        },
        error: (error: any) => console.error('Error: ', error),
        complete: () => console.log('Petición completada')
      });
  }

  swiperReady() {
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  swiperSlideChanged(e: any) {
    console.log('changed: ', e);
  }
}
