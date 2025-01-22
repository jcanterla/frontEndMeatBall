import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar-superior',
  templateUrl: './navbar-superior.component.html',
  styleUrls: ['./navbar-superior.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ]
})
export class NavbarSuperiorComponent  implements OnInit {

  constructor(private router: Router) { }

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
