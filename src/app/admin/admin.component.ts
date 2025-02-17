import { Component, OnInit } from '@angular/core';
import {CommonModule} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {FormsModule} from "@angular/forms";
import {NavbarSuperiorComponent} from "../navbar-superior/navbar-superior.component";
import {PerfilesAdminComponent} from "../perfiles-admin/perfiles-admin.component";
import {PublicacionesAdminComponent} from "../publicaciones-admin/publicaciones-admin.component";
import {NavbarInferiorComponent} from "../navbar-inferior/navbar-inferior.component";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PerfilesAdminComponent,
    PublicacionesAdminComponent,
    NavbarSuperiorComponent,
    NavbarInferiorComponent,
  ]
})
export class AdminComponent  implements OnInit {

  constructor() {
  }

  ngOnInit() {}

  segmento_seleccionado: string = 'perfiles';

  Segmento_cambiado(event: any) {
    console.log('Segment changed to', event.detail.value);
  }

}
