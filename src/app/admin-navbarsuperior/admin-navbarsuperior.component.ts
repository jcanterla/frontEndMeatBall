import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
    selector: 'app-admin-navbarsuperior',
    templateUrl: './admin-navbarsuperior.component.html',
    styleUrls: ['./admin-navbarsuperior.component.scss'],
    standalone: true,
    imports: [
        IonicModule
    ]
})
export class AdminNavbarsuperiorComponent  implements OnInit {

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

  navigateToAgregar() {
    this.router.navigate(['/agregar']);
  }

  navigateToAdmin() {
    this.router.navigate(['/admin']);
  }
}
