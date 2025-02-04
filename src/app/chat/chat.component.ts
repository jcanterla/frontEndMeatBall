import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {NavbarSuperiorComponent} from "../navbar-superior/navbar-superior.component";
import {NavbarInferiorComponent} from "../navbar-inferior/navbar-inferior.component";
import {arrowBackOutline} from "ionicons/icons";
import {addIcons} from "ionicons";
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    NavbarInferiorComponent,
    NavbarSuperiorComponent
  ]
})
export class ChatComponent  implements OnInit {

  constructor(private router: Router) {
    addIcons({"arrow-back-outline": arrowBackOutline})
  }

  ngOnInit() {}

  navigateToMensajes() {
    this.router.navigate(['/mensajes']);
  }
}
