import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {NavbarInferiorComponent} from "../navbar-inferior/navbar-inferior.component";
import {NavbarSuperiorComponent} from "../navbar-superior/navbar-superior.component";
import {Perfil} from "../modelos/Perfil";
import {PerfilService} from "../servicios/perfil.service";
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NavbarInferiorComponent,
    NavbarSuperiorComponent,
    CommonModule
  ]
})
export class PerfilComponent  implements OnInit {
  perfiles: Perfil[] = [];

  constructor(private perfilService: PerfilService, private router: Router) { }

  ngOnInit() {
    this.perfilService.getPerfiles().subscribe((data: Perfil[]) => {
      this.perfiles = data;
    });
  }

  nagivateToConfiguracionPerfil() {
    this.router.navigate(['/configuracionPerfil']);
  }
}
