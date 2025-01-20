import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";

@Component({
    selector: 'app-navbar-superior',
    templateUrl: './navbar-superior.component.html',
    styleUrls: ['./navbar-superior.component.scss'],
    standalone: true,
    imports: [
        IonicModule
    ]
})
export class NavbarSuperiorComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
