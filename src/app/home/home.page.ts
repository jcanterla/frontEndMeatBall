import { Component } from '@angular/core';
import {IonTitle, IonContent, IonImg, IonButton} from '@ionic/angular/standalone';
import {Router} from "@angular/router";
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonTitle, IonContent, IonImg, IonButton],
})
export class HomePage {
  constructor() {}
}
