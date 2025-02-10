import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, CommonModule],
  standalone: true
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
