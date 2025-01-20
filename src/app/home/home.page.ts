import { Component } from '@angular/core';
import {IonTitle, IonContent, IonImg, IonButton} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonTitle, IonContent, IonImg, IonButton],
})
export class HomePage {
  constructor() {}
}
