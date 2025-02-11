import { Component, OnInit } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { NavbarInferiorComponent } from "../navbar-inferior/navbar-inferior.component";
import { NavbarSuperiorComponent } from "../navbar-superior/navbar-superior.component";
import { Perfil } from "../modelos/Perfil";
import { PerfilService } from "../servicios/perfil.service";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { Publicacion } from "../modelos/Publicacion";

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
  perfilParaSeguir: Perfil = new Perfil();
  fromVerPublicacion: boolean = false;
  siguiendo: boolean = false;
  seguidores: number = 0;
  publicaciones: Publicacion[] = [];
  seguidos: number = 0;
  filteredItems: string[] = [];
  idUsuarioPublicacion: number = 0;

  constructor(private perfilService: PerfilService, private router: Router, private route: ActivatedRoute) {
    this.seguidores = 0;
    this.seguidos = 0;
  }

  ngOnInit() {
    const username = sessionStorage.getItem('username');
    this.siguiendo = localStorage.getItem('siguiendo') === 'true';
    this.seguidores = parseInt(localStorage.getItem('seguidores') || '0', 10);
    this.seguidos = parseInt(localStorage.getItem('seguidos') || '0', 10);

    const userId = sessionStorage.getItem('userId');

    this.perfilService.getPublicacion().subscribe((data: Publicacion[]) => {
      this.publicaciones = data;
    });

    this.getPerfilParaSeguir();

    this.route.paramMap.subscribe(params => {
      this.fromVerPublicacion = params.get('from') === 'ver-publicacion';
      const idUsuario = params.get('id');
      if (idUsuario) {
        this.idUsuarioPublicacion = +idUsuario;
        console.log('User ID:', this.idUsuarioPublicacion);
      }
    });

    if (this.fromVerPublicacion){
      this.getPerfilById(this.idUsuarioPublicacion);
    } else {
      this.getPerfil();
    }

    this.perfilService.getPublicacion().subscribe((data: Publicacion[]) => {
      this.publicaciones = data;
      this.updateSeguidoresSeguidos();
    });

    this.route.paramMap.subscribe(params => {
      this.fromVerPublicacion = params.get('from') === 'ver-publicacion';
      this.updateSeguidoresSeguidos();
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

  getPerfilParaSeguir(): void {
    this.perfilService.getPerfil().subscribe({
      next: (data: Perfil) => {
        this.perfilParaSeguir = data;
        console.info('Hola soy el perfil para seguir', this.perfil);
      },
      error: (error: any) => console.error('Error: ', error),
      complete: () => console.log('Petición completada')
    });
  }

  getPerfilById(id: number): void {
    this.perfilService.getPerfilById(id).subscribe({
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

  toggleSeguir() {
    this.siguiendo = !this.siguiendo;
    localStorage.setItem('siguiendo', this.siguiendo.toString());
    this.updateSeguidoresSeguidos();

    const seguidorId = this.perfilParaSeguir.id;
    const seguidoId = this.idUsuarioPublicacion;

    if (seguidorId && seguidoId) {
      const usuario = { seguidor_id: seguidorId, seguido_id: seguidoId };

      if (this.siguiendo) {
        this.perfilService.postSeguir(usuario).subscribe(response => {
          console.log('Post de seguir realizado con éxito:', response);
        }, error => {
          console.error('Error al realizar el post de seguir:', error);
        });
      } else {
        this.perfilService.postDejarSeguir(usuario).subscribe(response => {
          console.log('Post de dejar de seguir realizado con éxito:', response);
        }, error => {
          console.error('Error al realizar el post de dejar de seguir:', error);
        });
      }
    } else {
      console.error('No se pudieron obtener los IDs de seguidor o seguido.');
    }
  }

  updateSeguidoresSeguidos() {
    if (this.fromVerPublicacion) {
      this.seguidores = this.siguiendo ? 1 : 0;
      this.seguidos = 0;
    } else {
      this.seguidores = 0;
      this.seguidos = this.siguiendo ? 1 : 0;
    }
    localStorage.setItem('seguidores', this.seguidores.toString());
    localStorage.setItem('seguidos', this.seguidos.toString());
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
