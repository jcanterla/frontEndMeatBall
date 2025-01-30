import {Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {NavbarSuperiorComponent} from "../navbar-superior/navbar-superior.component";
import {NavbarInferiorComponent} from "../navbar-inferior/navbar-inferior.component";
import {addIcons} from "ionicons";
import {notificationsOutline} from "ionicons/icons";
import {Router} from "@angular/router";
import Swiper from "swiper";


@Component({
  selector: 'app-parati',
  templateUrl: './parati.component.html',
  styleUrls: ['./parati.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NavbarSuperiorComponent,
    NavbarInferiorComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ParatiComponent{
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;

  constructor(private router: Router) {
    addIcons({"notifications-outline": notificationsOutline})
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
