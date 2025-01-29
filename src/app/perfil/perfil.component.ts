import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {NavbarInferiorComponent} from "../navbar-inferior/navbar-inferior.component";
import {NavbarSuperiorComponent} from "../navbar-superior/navbar-superior.component";
import {Perfil} from "../modelos/Perfil";
import {PerfilService} from "../servicios/perfil.service";
import {CommonModule} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";

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
  fromVerPublicacion: boolean = false;
  siguiendo: boolean = false;

  constructor(private perfilService: PerfilService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.perfilService.getPerfiles().subscribe((data: Perfil[]) => {
      this.perfiles = data;
    });

    this.route.paramMap.subscribe(params => {
      this.fromVerPublicacion = params.get('from') === 'ver-publicacion';
    });

    const siguiendo = localStorage.getItem('siguiendo');
    this.siguiendo = siguiendo ? JSON.parse(siguiendo) : false;
  }

  nagivateToConfiguracionPerfil() {
    this.router.navigate(['/configuracionPerfil']);
  }

  toggleSeguir() {
    this.siguiendo = !this.siguiendo;
    localStorage.setItem('siguiendo', JSON.stringify(this.siguiendo));
  }
}
