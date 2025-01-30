import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {NavbarSuperiorComponent} from "../navbar-superior/navbar-superior.component";
import {NavbarInferiorComponent} from "../navbar-inferior/navbar-inferior.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ver-publicacion',
  templateUrl: './ver-publicacion.component.html',
  styleUrls: ['./ver-publicacion.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NavbarSuperiorComponent,
    NavbarInferiorComponent
  ]
})
export class VerPublicacionComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  navigateToPerfil() {
    this.router.navigate(['/perfil', { from: 'ver-publicacion' }]);
  }
}
