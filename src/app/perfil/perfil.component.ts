import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {NavbarInferiorComponent} from "../navbar-inferior/navbar-inferior.component";
import {NavbarSuperiorComponent} from "../navbar-superior/navbar-superior.component";
import {Perfil} from "../modelos/Perfil";
import {PerfilService} from "../servicios/perfil.service";
import {CommonModule} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {Publicacion} from "../modelos/Publicacion";
import {ChatService} from "../servicios/chat.service";
import {addIcons} from "ionicons";
import {imageOutline, trashOutline} from "ionicons/icons";
import { AlertController } from '@ionic/angular';


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
  filteredItems: Publicacion[] = [];
  idUsuarioPublicacion: number = 0;

  constructor(private perfilService: PerfilService, private router: Router, private route: ActivatedRoute, private chatService: ChatService, private alertController: AlertController) {
    addIcons({"image-outline": imageOutline, "trash-outline": trashOutline});
    this.seguidores = 0;
    this.seguidos = 0;
  }

  ngOnInit() {
    const username = sessionStorage.getItem('username');
    if (username) {
      const siguiendoKey = `siguiendo_${username}`;
      const seguidoresKey = `seguidores_${username}`;
      const seguidosKey = `seguidos_${username}`;

      this.siguiendo = localStorage.getItem(siguiendoKey) === 'true';
      this.seguidores = parseInt(localStorage.getItem(seguidoresKey) || '0', 10);
      this.seguidos = parseInt(localStorage.getItem(seguidosKey) || '0', 10);

      this.perfilService.getPublicacion().subscribe((data: Publicacion[]) => {
        this.publicaciones = data;
      });

      this.getPerfilParaSeguir();

      this.route.paramMap.subscribe(params => {
        this.fromVerPublicacion = params.get('from') === 'ver-publicacion';
        const idUsuario = params.get('id');
        if (idUsuario) {
          this.idUsuarioPublicacion = +idUsuario;
          this.getPerfilById(this.idUsuarioPublicacion);
          this.getPublicacionesPorId(this.idUsuarioPublicacion);
        } else {
          this.getPerfil();
          this.getPublicaciones();
        }
      });

      this.loadSeguidores();
      this.filteredItems = [...this.publicaciones];
    } else {
      console.error('Username is not available in sessionStorage');
    }
  }

  getSeguidoresPerfil() {
    this.perfilService.getContarSeguidoresPerfil().subscribe((data: number) => {
      this.seguidores = data;
    });
  }

  getSeguidosPerfil() {
    this.perfilService.getContarSeguidosPerfil().subscribe((data: number) => {
      this.seguidos = data;
    });
  }

  getSeguidores() {
    if (this.perfil && this.perfil.id !== undefined) {
      this.perfilService.getContarSeguidores(this.perfil.id).subscribe((data: number) => {
        this.seguidores = data;
      });
    } else {
      console.error('Perfil ID is undefined');
    }
  }

  getSeguidos() {
    if (this.perfil && this.perfil.id !== undefined) {
      this.perfilService.getContarSeguidos(this.perfil.id).subscribe((data: number) => {
        this.seguidos = data;
      });
    } else {
      console.error('Perfil ID is undefined');
    }
  }

  getPublicaciones(): void {
    this.perfilService.getPublicacionPorToken().subscribe((data: Publicacion[]) => {
      this.publicaciones = data;
      this.filteredItems = [...this.publicaciones];
    });
  }

  getPublicacionesPorId(id: number): void {
    this.perfilService.getPublicacionesPorId(id).subscribe((data: Publicacion[]) => {
      this.publicaciones = data;
      this.filteredItems = [...this.publicaciones];
    });
  }

  getPerfil(): void {
    this.perfilService.getPerfil().subscribe({
      next: (data: Perfil) => {
        this.perfil = data;
        console.info('Hola soy el perfil', this.perfil);
        this.getSeguidores();
        this.getSeguidos();
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
        this.updateSiguiendoState();
        this.getSeguidores();
        this.getSeguidos();
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

  updateSiguiendoState() {
    const username = sessionStorage.getItem('username');
    if (username) {
      const siguiendoKey = `siguiendo_${username}_${this.perfil.id}`;
      this.siguiendo = localStorage.getItem(siguiendoKey) === 'true';
    }
  }

  toggleSeguir() {
    const username = sessionStorage.getItem('username');
    if (!username) {
      console.error('Username is not available in sessionStorage');
      return;
    }

    const siguiendoKey = `siguiendo_${username}_${this.perfil.id}`;
    this.siguiendo = !this.siguiendo;
    localStorage.setItem(siguiendoKey, this.siguiendo.toString());
    this.updateSeguidoresSeguidos(username);

    const seguidorId = this.perfilParaSeguir.id;
    const seguidoId = this.idUsuarioPublicacion;

    if (seguidorId && seguidoId) {
      const usuario = { seguidor_id: seguidorId, seguido_id: seguidoId };

      if (this.siguiendo) {
        this.perfilService.postSeguir(usuario).subscribe(response => {
          console.log('Post de seguir realizado con éxito:', response);
          this.updateSeguidoresSeguidos(username);
        }, error => {
          console.error('Error al realizar el post de seguir:', error);
        });
      } else {
        this.perfilService.postDejarSeguir(usuario).subscribe(response => {
          console.log('Post de dejar de seguir realizado con éxito:', response);
          this.updateSeguidoresSeguidos(username);
        }, error => {
          console.error('Error al realizar el post de dejar de seguir:', error);
        });
      }
    } else {
      console.error('No se pudieron obtener los IDs de seguidor o seguido.');
    }
  }

  updateSeguidoresSeguidos(username: string) {
    const seguidoresKey = `seguidores_${username}`;
    const seguidosKey = `seguidos_${username}`;

    if (this.fromVerPublicacion) {
      this.getSeguidores();
      this.getSeguidos();
    } else {
      this.getSeguidoresPerfil();
      this.getSeguidosPerfil();
    }

    localStorage.setItem(seguidoresKey, this.seguidores.toString());
    localStorage.setItem(seguidosKey, this.seguidos.toString());
  }

  navigateToMensajes(id: number | undefined) {
    this.chatService.setContactoId(id);
    console.log(this.chatService.getContactoId());
    this.router.navigate(['mensajes', id]);
  }

  navigateToVerPublicacion(item: any) {
    sessionStorage.setItem('publicacion', JSON.stringify(item));
    this.router.navigate(['/verPublicacion', { from: 'perfil' }]);
  }


  reportarUsuario(id: number | undefined) {
    if (id !== undefined) {
      this.perfilService.reportarUsuario(id).subscribe({
        next: (data: Perfil) => {
          console.info('Usuario reportado:', data);
        },
        error: (error: any) => console.error('Error al reportar usuario:', error),
        complete: () => console.log('Petición completada')
      });
    } else {
      console.error('ID de usuario no válido.');
    }
  }

  async confirmarEliminarPublicacion(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que deseas borrar la publicación?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Eliminación de publicación cancelada.');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.perfilService.getEliminarPublicacion(id).subscribe(response => {
              console.log('Publicación eliminada con éxito:', response);
              this.getPublicaciones();
            }, error => {
              console.error('Error al eliminar la publicación:', error);
            });
          }
        }
      ]
    });

    await alert.present();
  }

}
