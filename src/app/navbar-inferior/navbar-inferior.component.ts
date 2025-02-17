import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {
  accessibilityOutline,
  addCircleOutline,
  chatbubbleOutline,
  homeOutline,
  personOutline,
  searchOutline
} from "ionicons/icons";
import {CommonModule} from "@angular/common";
import {addIcons} from "ionicons";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-navbar-inferior',
  templateUrl: './navbar-inferior.component.html',
  styleUrls: ['./navbar-inferior.component.scss'],
  standalone: true,
  imports: [
    IonicModule, CommonModule,FormsModule
  ]
})
export class NavbarInferiorComponent  implements OnInit {

  constructor(private router: Router) {
    addIcons({
      "home-outline": homeOutline,
      "add-circle-outline": addCircleOutline,
      "person-outline": personOutline,
      "search-outline": searchOutline,
      "chatbubble-outline": chatbubbleOutline,
      "accessibility-outline": accessibilityOutline
    })
  }

  isAdmin = JSON.parse(sessionStorage.getItem('isAdmin') || 'false');

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
