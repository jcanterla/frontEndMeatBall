import {Component, OnInit, ViewChild} from '@angular/core';
import {arrowBackOutline, sendOutline} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { IonicModule } from '@ionic/angular';
import {Location, NgForOf, NgIf} from '@angular/common';
import {Publicacion} from "../modelos/Publicacion";
import {PerfilService} from "../servicios/perfil.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Perfil} from "../modelos/Perfil";
import {Mensaje} from "../modelos/Mensaje";
import {Subscription} from "rxjs";
import {IonContent} from "@ionic/angular/standalone";
import {ChatService} from "../servicios/chat.service";

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NgForOf,
    ReactiveFormsModule,
    NgIf
  ]
})
export class MensajesComponent implements OnInit {


  protected idPerfil: number = 0;
  protected mensajes: Mensaje[] = [];
  protected perfil: Perfil = new Perfil();
  protected perfilFoto: Perfil = new Perfil();
  protected textoMensaje = "";
  protected nuevoMensaje: Mensaje = new Mensaje();
  protected readonly sessionStorage = sessionStorage;
  protected mensajeForm: FormGroup;
  private chatSubscription!: Subscription;
  @ViewChild('content') content!: IonContent;

  constructor(private location: Location, private perfilService: PerfilService, private chatService: ChatService, private fb: FormBuilder ) {
    addIcons({ "arrow-back-outline": arrowBackOutline, "send-outline": sendOutline });

    this.mensajeForm = this.fb.group({
      texto: [this.nuevoMensaje.mensaje, Validators.required],
    });
  }

  ngOnInit() {
    this.chatService.contacto.subscribe({
      next: (v) => {
        const nuevoId = v === 0 || v == null ? Number(sessionStorage.getItem('contacto')) : this.chatService.getContactoId();

        if (this.idPerfil !== nuevoId) {
          this.idPerfil = nuevoId;
          this.nuevoMensaje.idReceptor = this.idPerfil;
          this.cargarContacto();
          this.cargarChats();
        }
      }
    });

    this.getPerfil();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.scrollToBottom();
    }, 500);
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      if (this.content) {
        this.content.scrollToBottom(0);
      }
    }, 0);
  }


  ngOnDestroy() {
    if (this.chatSubscription) {
      this.chatSubscription.unsubscribe();
    }
  }



  cargarChats(): void {
    this.chatService.cargarMensajesChat(this.idPerfil).subscribe({
        next: (d) => {
          this.mensajes = d;
        },
        error: (e) => {
          console.error(e);
        },
        complete: () => {

          this.scrollToBottom();
        }

      }
    );
  }


  cargarContacto(): void {
    this.perfilService.getPerfilById(this.idPerfil).subscribe({
        next: (p) => {
          this.perfil = p;
        },
        error: (e) => {
          console.error(e);
        },
        complete: () =>
          console.info(this.perfil)

      }
    );
  }

  enviarMensaje(): void {

    if (this.mensajeForm.valid) {
      this.nuevoMensaje = {...this.nuevoMensaje, ...this.mensajeForm.value};
      console.info(this.nuevoMensaje);

      this.chatService.enviarMensaje(this.nuevoMensaje).subscribe({
          next: (p) => {

          },
          error: (e) => {
            console.error(e);
          },
          complete: () => {
            this.mensajeForm.reset();
            console.info("Mensaje enviado");
            this.cargarChats();
          }

        }
      );

    } else {
      console.error("Formulario inválido");

    }

  }

  getPerfil(): void{
    this.perfilService.getPerfil().subscribe({
      next: (p) => {
        this.perfilFoto = p;
      },
      error: (e) => {
        console.error(e);
      },
      complete: () =>
        console.info(this.perfilFoto)

    });


  }

  goBack() {
    this.location.back();
  }
}
