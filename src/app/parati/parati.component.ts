import {Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {NavbarSuperiorComponent} from "../navbar-superior/navbar-superior.component";
import {NavbarInferiorComponent} from "../navbar-inferior/navbar-inferior.component";
import {addIcons} from "ionicons";
import {notificationsOutline} from "ionicons/icons";
import {Router} from "@angular/router";
import Swiper from "swiper";
import {NgForOf} from "@angular/common";


@Component({
  selector: 'app-parati',
  templateUrl: './parati.component.html',
  styleUrls: ['./parati.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NavbarSuperiorComponent,
    NavbarInferiorComponent,
    NgForOf
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ParatiComponent implements OnInit {
  @ViewChild('swiper') swiperRef: ElementRef | undefined;
  swiper?: Swiper;

  slides: string[] = [
    'https://imag.bonviveur.com/pure-de-calabaza-listo-para-servir.jpg',
    'https://chocolatestorras.com/wp-content/uploads/2021/08/Chocolate-bitter.jpg',
    'https://hips.hearstapps.com/hmg-prod/images/paella-valenciana-elle-gourmet-65cd30a24348c.jpg?crop=0.639xw:0.958xh;0.0343xw,0.0319xh&resize=1200:*'
  ];

  constructor(private router: Router) {
    addIcons({ "notifications-outline": notificationsOutline });
  }

  ngOnInit() {

  }

  navigateToNotificaciones() {
    this.router.navigate(['/notificaciones']);
  }

  swiperReady() {
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  swiperSlideChanged(e: any) {
    console.log('changed: ', e);
  }

}
