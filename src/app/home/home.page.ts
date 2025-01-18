import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import {NavbarInferiorComponent} from "../navbar-inferior/navbar-inferior.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, NavbarInferiorComponent],
  standalone: true,
})
export class HomePage {
  constructor() {}
}
