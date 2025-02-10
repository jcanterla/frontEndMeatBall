import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {NavbarInferiorComponent} from "../navbar-inferior/navbar-inferior.component";
import {NavbarSuperiorComponent} from "../navbar-superior/navbar-superior.component";
import {Perfil} from "../modelos/Perfil";
import {PerfilService} from "../servicios/perfil.service";
import {CommonModule} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {Publicacion} from "../modelos/Publicacion";

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
  perfil: Perfil = new Perfil();
  fromVerPublicacion: boolean = false;
  siguiendo: boolean = false;
  seguidores: number = 0;
  publicaciones: Publicacion[] = [];
  filteredItems: string[] = [];

  constructor(private perfilService: PerfilService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getPerfil();

    this.route.paramMap.subscribe(params => {
      this.fromVerPublicacion = params.get('from') === 'ver-publicacion';
    });

    this.perfilService.getPublicacion().subscribe((data: Publicacion[]) => {
      this.publicaciones = data;
    });

    const siguiendo = localStorage.getItem('siguiendo');
    this.siguiendo = siguiendo ? JSON.parse(siguiendo) : false;

    this.loadSeguidores();
    this.filteredItems = [...this.items];
  }

  getPerfil(): void {
    this.perfilService.getPerfil().subscribe({
      next: (data: Perfil) => {
        this.perfil = data;
        console.info('Hola soy el perfil', this.perfil);
      },
      error: (error: any) => console.error('Error: ', error),
      complete: () => console.log('Petición completada')
    });
  }

  nagivateToConfiguracionPerfil() {
    this.router.navigate(['/configuracionPerfil']);
  }

  loadSeguidores() {
    const seguidores = localStorage.getItem('seguidores');
    if (seguidores) {
      this.seguidores = parseInt(seguidores, 10);
    }
  }

  saveSeguidores() {
    localStorage.setItem('seguidores', this.seguidores.toString());
  }

  toggleSeguir() {
    this.siguiendo = !this.siguiendo;
    localStorage.setItem('siguiendo', JSON.stringify(this.siguiendo));
    if (this.siguiendo) {
      this.seguidores += 1;
    } else if (this.seguidores > 0) {
      this.seguidores -= 1;
    }
    this.saveSeguidores();
  }

  navigateToMensajes() {
    this.router.navigate(['/mensajes']);
  }



  items: string[] = [
    'https://www.goya.com/media/4173/creole-spaghetti.jpg?quality=80',
    'https://recetasdecocina.elmundo.es/wp-content/uploads/2020/02/carne-mechada.jpg',
    'https://www.cnature.es/wp-content/uploads/2020/08/gazpacho-gallego-.jpg',
    'https://www.laespanolaaceites.com/wp-content/uploads/2019/06/cocido-madrileno-1080x671.jpg',
    'https://www.bekiacocina.com/images/cocina/0000/179-h.jpg',
    'https://www.annarecetasfaciles.com/files/pollo-en-salsa-1-1024x640.jpg'
  ];
}
