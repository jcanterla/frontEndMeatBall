import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {Router} from "@angular/router";
import {addIcons} from "ionicons";
import {
  accessibilityOutline,
  addCircleOutline,
  chatbubbleOutline,
  homeOutline,
  personOutline,
  searchOutline
} from "ionicons/icons";

@Component({
    selector: 'app-admin-navbarinferior',
    templateUrl: './admin-navbarinferior.component.html',
    styleUrls: ['./admin-navbarinferior.component.scss'],
    standalone: true,
    imports: [
        IonicModule
    ]
})
export class AdminNavbarinferiorComponent  implements OnInit {

  constructor(private router: Router) {
    addIcons({
      "home-outline": homeOutline,
      "add-circle-outline": addCircleOutline,
      "person-outline": personOutline,
      "search-outline": searchOutline,
      "chatbubble-outline": chatbubbleOutline,
      "accessibility-outline": accessibilityOutline,
    })
  }

  ngOnInit() {}

  navigateToExplorar() {
    this.router.navigate(['/explorar']);
  }

  navigateToParati() {
    this.router.navigate(['/parati']);
  }

  navigateToChat() {
    this.router.navigate(['/chat']);
  }

  navigateToPerfil() {
    this.router.navigate(['/perfil']);
  }

  navigateToAgregar() {
    this.router.navigate(['/agregar']);
  }

  navigateToAdmin() {
    this.router.navigate(['/admin']);
  }

}
