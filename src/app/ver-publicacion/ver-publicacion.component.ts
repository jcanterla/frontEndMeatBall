import {Component, OnInit, ViewChild} from '@angular/core';
import {IonicModule, IonModal} from "@ionic/angular";
import {NavbarSuperiorComponent} from "../navbar-superior/navbar-superior.component";
import {NavbarInferiorComponent} from "../navbar-inferior/navbar-inferior.component";
import {Router} from "@angular/router";
import {addIcons} from "ionicons";
import {
  chatbubbleEllipsesSharp, chatbubbleOutline,
  flashOutline,
  happyOutline, heartOutline,
  restaurantOutline,
  stopwatchOutline,

} from "ionicons/icons";
import {Publicacion} from "../modelos/Publicacion";
import {Comentario} from "../modelos/Comentario";
import {ParatiService} from "../servicios/parati.service";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import { FormsModule } from '@angular/forms';
import { OverlayEventDetail } from '@ionic/core/components';
import {comentarioEnviar} from "../modelos/comentarioEnviar";

@Component({
  selector: 'app-ver-publicacion',
  templateUrl: './ver-publicacion.component.html',
  styleUrls: ['./ver-publicacion.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NavbarSuperiorComponent,
    NavbarInferiorComponent,
    NgForOf,
    FormsModule,
    NgClass,
    NgIf
  ]
})
export class VerPublicacionComponent  implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;
  name!: string;

  leHaDadoLike = false;

  publicacion: Publicacion = new Publicacion();

  comentarios: Comentario[] = [];

  comentarioEnviar: comentarioEnviar = new comentarioEnviar();

  mostrarComentarios = false;

  constructor(private router: Router, private paratiService: ParatiService) {
    const navigation = this.router.getCurrentNavigation();
    this.publicacion = navigation?.extras.state?.['publicacion'];

    if (!this.publicacion) {
      const storedData = sessionStorage.getItem('publicacion');
      if (storedData) {
        this.publicacion = JSON.parse(storedData);
      } else {
        console.error('No se recibió la publicación');
      }
    }
  }

  ngOnInit() {

    const leHaDadoLike = localStorage.getItem('leHaDadoLike');
    this.leHaDadoLike = leHaDadoLike ? JSON.parse(leHaDadoLike) : false;

    addIcons({
      "happy-outline": happyOutline,
      "stopwatch-outline": stopwatchOutline,
      "flash-outline": flashOutline,
      "restaurant-outline": restaurantOutline,
      "chatbubble-outline": chatbubbleOutline,
      "heart-outline": heartOutline
    })
    this.getComentarios();
  }

  getComentarios(): void {
    if (!this.publicacion?.id) {
      console.error('Error: La publicación o su ID no están definidos.');
      return;
    }

    this.paratiService.getComentariosPublicacion(this.publicacion.id).subscribe({
      next: (data: Comentario[]) => {
        this.comentarios = data;
        console.info('Hola soy los comentarios', this.comentarios);
      },
      error: (error: any) => console.error('Error: ', error),
    });
  }

    darLike(){
    if (!this.publicacion?.id) {
      console.error('Error: La publicación o su ID no están definidos.');
      return;
    }

    if(this.leHaDadoLike){
      this.quitarLike();
    }

    this.leHaDadoLike = !this.leHaDadoLike;
    localStorage.setItem('leHaDadoLike', JSON.stringify(this.leHaDadoLike));

    this.paratiService.darLike(this.publicacion.id).subscribe({
      next: (data: any) => {
        console.info('Like dado', data);
      },
      error: (error: any) => console.error('Error: ', error),
    });
  }

  quitarLike(){
    if (!this.publicacion?.id) {
      console.error('Error: La publicación o su ID no están definidos.');
      return;
    }

    this.paratiService.quitarLike(this.publicacion.id).subscribe({
      next: (data: any) => {
        console.info('Like quitado', data);
      },
      error: (error: any) => console.error('Error: ', error),
    });
  }


  comentar(){
    if (!this.publicacion?.id) {
      console.error('Error: La publicación o su ID no están definidos.');
      return;
    }

    this.comentarioEnviar.idPublicacion = this.publicacion.id;
    this.comentarioEnviar.comentarioTexto = this.textoComentario;

    this.paratiService.comentarPublicacion(this.comentarioEnviar).subscribe({
      next: (data: any) => {
        console.info('Comentario dado', data);
        this.getComentarios();
      },
      error: (error: any) => console.error('Error: ', error),
    });
  }


  navigateToPerfil(idusuario: number | undefined) {
    this.router.navigate(['/perfil', { id: idusuario, from: 'ver-publicacion' }]);
  }

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';

  textoComentario!: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
    this.comentar();
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm') {
      this.message = `Hello, ${event.detail.data}!`;
    }
  }

  mostrarComentariosFunc(){
    this.mostrarComentarios = !this.mostrarComentarios;
  }

}
