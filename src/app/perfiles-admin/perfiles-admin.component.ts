import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {NgForOf} from "@angular/common";
import {PerfilService} from "../servicios/perfil.service";
import {Perfil} from "../modelos/Perfil";
import {addIcons} from "ionicons";
import {banOutline, eyeOutline} from "ionicons/icons";

@Component({
    selector: 'app-perfiles-admin',
    templateUrl: './perfiles-admin.component.html',
    styleUrls: ['./perfiles-admin.component.scss'],
    standalone: true,
  imports: [
    IonicModule,
    NgForOf
  ]
})
export class PerfilesAdminComponent  implements OnInit {

  constructor(private perfilService: PerfilService) {
    addIcons({
      "ban-outline": banOutline,
      "eye-outline": eyeOutline,
    })
  }
  perfiles: Perfil[]  = [];

  ngOnInit() {
    this.getPerfiles();
  }

  getPerfiles() {
    this.perfilService.getPerfiles().subscribe({
      next: (perfiles) => {
        this.perfiles = perfiles;
        console.log('Perfiles aqui:', perfiles);
      },
      error: (err) => {
        console.error('Error fetching perfiles:', err);
      },
      complete: () => {
        console.log('Fetch perfiles complete');
        console.log(this.perfiles);
      }
    });
  }

  setBaneado(id: number | undefined){

    if(id == undefined){
      return console.log('id undefined');
    }

    this.perfilService.setBaneado(id).subscribe({
      next: (perfiles) => {
        this.perfiles = perfiles;
        console.log('Perfiles aqui:', perfiles);
      },
      error: (err) => {
        console.error('Error fetching perfiles:', err);
      },
      complete: () => {
        console.log('Fetch perfiles complete');
        console.log(this.perfiles);
        this.ngOnInit();
      }
    });
  }

  setActivo(id: number | undefined){

    if(id == undefined){
      return console.log('id undefined');
    }

    this.perfilService.setActivo(id).subscribe({
      next: (perfiles) => {
        this.perfiles = perfiles;
        console.log('Perfiles aqui:', perfiles);
      },
      error: (err) => {
        console.error('Error fetching perfiles:', err);
      },
      complete: () => {
        console.log('Fetch perfiles complete');
        console.log(this.perfiles);
        this.ngOnInit()
      }
    });
  }

}
