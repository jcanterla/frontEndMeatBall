import { Component, OnInit } from '@angular/core';
import {arrowBackOutline, sendOutline} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { IonicModule } from '@ionic/angular';
import {Location, NgForOf} from '@angular/common';
import {Publicacion} from "../modelos/Publicacion";
import {PerfilService} from "../servicios/perfil.service";

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NgForOf
  ]
})
export class MensajesComponent implements OnInit {
  publicaciones: Publicacion[] = [];

  constructor(private location: Location, private perfilService: PerfilService,) {
    addIcons({ "arrow-back-outline": arrowBackOutline, "send-outline": sendOutline });
  }

  ngOnInit() {
    this.perfilService.getPublicacion().subscribe((data: Publicacion[]) => {
      this.publicaciones = data;
    });


  }

  goBack() {
    this.location.back();
  }
}
