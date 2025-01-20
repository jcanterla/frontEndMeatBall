import { Component, OnInit } from '@angular/core';
import {IonButton, IonContent, IonInput, IonList, IonText, IonTitle} from "@ionic/angular/standalone";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [
        IonButton,
        IonContent,
        IonInput,
        IonList,
        IonText,
        IonTitle
    ]
})
export class LoginComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
