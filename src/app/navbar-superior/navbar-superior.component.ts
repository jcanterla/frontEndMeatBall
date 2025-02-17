import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-navbar-superior',
  templateUrl: './navbar-superior.component.html',
  styleUrls: ['./navbar-superior.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    CommonModule
  ]
})
export class NavbarSuperiorComponent  implements OnInit {

  constructor(private router: Router) { }
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
