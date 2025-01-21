import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {NavbarInferiorComponent} from "../navbar-inferior/navbar-inferior.component";
import {NavbarSuperiorComponent} from "../navbar-superior/navbar-superior.component";
import {addIcons} from "ionicons";
import {arrowBackOutline} from "ionicons/icons";

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

  constructor() {
    addIcons({"arrow-back-outline": arrowBackOutline})
  }

  ngOnInit() {}

}
