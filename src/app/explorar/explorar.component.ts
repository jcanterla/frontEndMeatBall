import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {NavbarInferiorComponent} from "../navbar-inferior/navbar-inferior.component";
import {NavbarSuperiorComponent} from "../navbar-superior/navbar-superior.component";
import {addIcons} from "ionicons";
import {notificationsOutline} from "ionicons/icons";
import {Router} from "@angular/router";

@Component({
    selector: 'app-explorar',
    templateUrl: './explorar.component.html',
    styleUrls: ['./explorar.component.scss'],
    standalone: true,
    imports: [
        IonicModule,
        NavbarInferiorComponent,
        NavbarSuperiorComponent
    ]
})
export class ExplorarComponent  implements OnInit {

  constructor(private router: Router) {
    addIcons({"notifications-outline": notificationsOutline})
  }

  ngOnInit() {}

  navigateToNotificaciones() {
    this.router.navigate(['/notificaciones']);
  }
}
