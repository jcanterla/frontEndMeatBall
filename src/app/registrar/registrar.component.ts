import { Component, OnInit } from '@angular/core';
import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonInput,
  IonList, IonText,
  IonTitle
} from "@ionic/angular/standalone";

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonTitle,
    IonList,
    IonCheckbox,
    IonButton,
    IonInput,
    IonText
  ]
})
export class RegistrarComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
