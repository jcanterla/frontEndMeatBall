import { Component, OnInit } from '@angular/core';
import {CommonModule} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {addIcons} from "ionicons";
import {
  addCircleOutline,
  chatbubbleOutline,
  homeOutline,
  personOutline,
  searchOutline
} from "ionicons/icons";

@Component({
  selector: 'app-navbar-inferior',
  templateUrl: './navbar-inferior.component.html',
  styleUrls: ['./navbar-inferior.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,]
})
export class NavbarInferiorComponent  implements OnInit {

  constructor() {
    addIcons({
      "home-outline": homeOutline,
      "add-circle-outline": addCircleOutline,
      "person-outline": personOutline,
      "search-outline": searchOutline,
      "chatbubble-outline": chatbubbleOutline,
    })
  }

  ngOnInit() {}

}
