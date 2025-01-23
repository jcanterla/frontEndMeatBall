import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {NavbarSuperiorComponent} from "../navbar-superior/navbar-superior.component";
import {NavbarInferiorComponent} from "../navbar-inferior/navbar-inferior.component";
import {addIcons} from "ionicons";
import {notificationsOutline} from "ionicons/icons";
import {Router} from "@angular/router";

@Component({
  selector: 'app-parati',
  templateUrl: './parati.component.html',
  styleUrls: ['./parati.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NavbarSuperiorComponent,
    NavbarInferiorComponent
  ]
})
export class ParatiComponent  implements OnInit {

  constructor(private router: Router) {
    addIcons({"notifications-outline": notificationsOutline})
  }

  ngOnInit() {}

  navigateToNotificaciones() {
    this.router.navigate(['/notificaciones']);
  }
}
