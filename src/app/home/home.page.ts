import { Component } from '@angular/core';
import {IonTitle, IonContent, IonImg, IonButton} from '@ionic/angular/standalone';
import {Router} from "@angular/router";
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule],
  standalone: true,
})

export class HomePage {
  constructor(private router: Router,) {}

  navigateToRegistro() {
    this.router.navigate(['/registro']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

}
