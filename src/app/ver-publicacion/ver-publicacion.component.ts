import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { IonicModule, IonModal } from "@ionic/angular";
import { NavbarSuperiorComponent } from "../navbar-superior/navbar-superior.component";
import { NavbarInferiorComponent } from "../navbar-inferior/navbar-inferior.component";
import { ActivatedRoute, Router } from "@angular/router";
import { addIcons } from "ionicons";
import {
  chatbubbleOutline, flashOutline, happyOutline, heartOutline,
  restaurantOutline, stopwatchOutline
} from "ionicons/icons";
import { Publicacion } from "../modelos/Publicacion";
import { Comentario } from "../modelos/Comentario";
import { ParatiService } from "../servicios/parati.service";
import { NgClass, NgForOf, NgIf } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { OverlayEventDetail } from '@ionic/core/components';
import { comentarioEnviar } from "../modelos/comentarioEnviar";
import { PerfilService } from "../servicios/perfil.service";

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
export class VerPublicacionComponent implements OnInit {

  @ViewChild('modalRef', { static: true }) modal!: IonModal;  // ✅ REFERENCIA AL MODAL
  textoComentario: string = '';  // ✅ Variable para el input del comentario

  publicacion: Publicacion = new Publicacion();
  comentarios: Comentario[] = [];
  comentarioEnviar: comentarioEnviar = new comentarioEnviar();
  mostrarComentarios = false;
  mostrarBotonPerfil = true;
  leHaDadoLike = false;

  constructor(
    private router: Router,
    private paratiService: ParatiService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private perfilService: PerfilService
  ) {}

  ngOnInit() {
    addIcons({
      "happy-outline": happyOutline,
      "stopwatch-outline": stopwatchOutline,
      "flash-outline": flashOutline,
      "restaurant-outline": restaurantOutline,
      "chatbubble-outline": chatbubbleOutline,
      "heart-outline": heartOutline
    });
  }

  ionViewWillEnter() {
    const from = this.route.snapshot.paramMap.get('from');
    if (from === 'perfil') this.mostrarBotonPerfil = false;

    const navigation = this.router.getCurrentNavigation();
    this.publicacion = navigation?.extras.state?.['publicacion'] || JSON.parse(sessionStorage.getItem('publicacion') || '{}');

    if (this.publicacion?.id) {
      const likesGuardados = JSON.parse(localStorage.getItem('likesPublicaciones') || '{}');
      this.leHaDadoLike = !!likesGuardados[this.publicacion.id];
    }

    this.getComentarios();
    this.cdr.detectChanges();
  }

  getComentarios() {
    if (!this.publicacion?.id) return console.error('Error: La publicación o su ID no están definidos.');

    this.paratiService.getComentariosPublicacion(this.publicacion.id).subscribe({
      next: (data) => this.comentarios = data,
      error: (error) => console.error('Error: ', error),
    });
  }

  darLike() {
    if (!this.publicacion?.id) return console.error('Error: La publicación o su ID no están definidos.');

    let likesGuardados = JSON.parse(localStorage.getItem('likesPublicaciones') || '{}');

    if (likesGuardados[this.publicacion.id]) {
      this.quitarLike();
      return;
    }

    this.leHaDadoLike = true;
    likesGuardados[this.publicacion.id] = true;
    localStorage.setItem('likesPublicaciones', JSON.stringify(likesGuardados));

    this.paratiService.darLike(this.publicacion.id).subscribe({
      next: (data) => console.info('Like dado', data),
      error: (error) => console.error('Error: ', error),
    });
  }

  quitarLike() {
    if (!this.publicacion?.id) return console.error('Error: La publicación o su ID no están definidos.');

    let likesGuardados = JSON.parse(localStorage.getItem('likesPublicaciones') || '{}');
    delete likesGuardados[this.publicacion.id];
    localStorage.setItem('likesPublicaciones', JSON.stringify(likesGuardados));

    this.leHaDadoLike = false;

    this.paratiService.quitarLike(this.publicacion.id).subscribe({
      next: (data) => console.info('Like quitado', data),
      error: (error) => console.error('Error: ', error),
    });
  }

  comentar() {
    if (!this.publicacion?.id) return console.error('Error: La publicación o su ID no están definidos.');

    this.comentarioEnviar.idPublicacion = this.publicacion.id;
    this.comentarioEnviar.comentarioTexto = this.textoComentario;

    this.paratiService.comentarPublicacion(this.comentarioEnviar).subscribe({
      next: (data) => {
        console.info('Comentario enviado', data);
        this.getComentarios();
      },
      error: (error) => console.error('Error: ', error),
    });
  }

  navigateToPerfil(idusuario?: number) {
    this.router.navigate(['/perfil', { id: idusuario, from: 'ver-publicacion' }]);
  }

  // ✅✅✅ MANEJO DEL MODAL ✅✅✅
  async openModal() {
    await this.modal.present();
  }

  async cancel() {
    await this.modal.dismiss();
  }

  async confirm() {
    console.log("Comentario enviado:", this.textoComentario);
    await this.modal.dismiss();
    this.comentar();
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm') {
      console.log(`Comentario enviado: ${this.textoComentario}`);
    }
  }

  mostrarComentariosFunc() {
    this.mostrarComentarios = !this.mostrarComentarios;
  }

  reportarPublicacion(id?: number) {
    if (!id) return console.error('Error: La publicación o su ID no están definidos.');

    this.perfilService.reportarPublicacion(id).subscribe({
      next: (data) => console.info('Publicación reportada', data),
      error: (error) => console.error('Error: ', error),
    });
  }
}
