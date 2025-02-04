import {Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit, ViewChild} from '@angular/core';
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
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ParatiComponent implements OnInit {
  @ViewChild('swiper') swiperRef: ElementRef | undefined;
  swiper?: Swiper;

  slides: string[] = ['Slide1', 'Slide2', 'Slide3'];

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
