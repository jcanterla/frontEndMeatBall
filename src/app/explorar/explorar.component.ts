import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {NavbarInferiorComponent} from "../navbar-inferior/navbar-inferior.component";
import {NavbarSuperiorComponent} from "../navbar-superior/navbar-superior.component";

@Component({
    selector: 'app-explorar',
    templateUrl: './explorar.component.html',
    styleUrls: ['./explorar.component.scss'],
    standalone: true,
    imports: [
        IonicModule,
        NavbarInferiorComponent,
        NavbarSuperiorComponent
    ]
})
export class ExplorarComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
