import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {
  addCircleOutline,
  chatbubbleOutline,
  homeOutline,
  personOutline,
  searchOutline
} from "ionicons/icons";
import {CommonModule} from "@angular/common";
import {addIcons} from "ionicons";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar-inferior',
  templateUrl: './navbar-inferior.component.html',
  styleUrls: ['./navbar-inferior.component.scss'],
  standalone: true,
  imports: [
    IonicModule, CommonModule,
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
}
