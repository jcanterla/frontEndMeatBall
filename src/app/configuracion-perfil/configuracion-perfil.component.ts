import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AlertController, IonicModule} from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { PerfilService } from '../servicios/perfil.service';
import { Router } from '@angular/router';
import { Perfil } from '../modelos/Perfil';
import { NavbarSuperiorComponent } from '../navbar-superior/navbar-superior.component';
import { NavbarInferiorComponent } from '../navbar-inferior/navbar-inferior.component';
import { addIcons } from 'ionicons';
import { createOutline } from 'ionicons/icons';

@Component({
  selector: 'app-configuracion-perfil',
  templateUrl: './configuracion-perfil.component.html',
  styleUrls: ['./configuracion-perfil.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NavbarSuperiorComponent,
    NavbarInferiorComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ConfiguracionPerfilComponent implements OnInit {
  perfiles: Perfil[] = [];
  perfilActual: Perfil = new Perfil();
  perfilForm: FormGroup;
  inputsDisabled: boolean = true;

  constructor(private perfilService: PerfilService, private router: Router, private alertController: AlertController) {
    this.perfilForm = new FormGroup({
      nombre: new FormControl({ value: '', disabled: this.inputsDisabled }),
      apellidos: new FormControl({ value: '', disabled: this.inputsDisabled }),
      usuario: new FormControl({ value: '', disabled: true}),
      email: new FormControl({ value: '', disabled: this.inputsDisabled }),
      telefono: new FormControl({ value: '', disabled: this.inputsDisabled }),
    });
  }

  ngOnInit() {
    addIcons({
      "create-outline": createOutline,
    });

    this.perfilService.getPerfilPorToken().subscribe((data: Perfil) => {
      this.perfilActual = data;
      this.perfilForm.patchValue(this.perfilActual);
      localStorage.setItem('perfilActual', JSON.stringify(this.perfilActual));
    }, error => {
      console.error('Error al obtener el perfil:', error);
    });
  }

  activarInput() {
    this.inputsDisabled = !this.inputsDisabled;
    if (this.inputsDisabled) {
      this.perfilForm.disable();
    } else {
      this.perfilForm.enable();
      this.perfilForm.controls['usuario'].disable();
    }
  }

  guardarPerfil() {
    if (this.perfilForm.valid) {
      const perfilActualizado: Perfil = this.perfilForm.value;
      perfilActualizado.id = this.perfilActual.id;
      perfilActualizado.username = this.perfilActual.username;
      perfilActualizado.fotoPerfilLink = this.perfilActual.fotoPerfilLink;
      this.perfilService.updatePerfil(perfilActualizado).subscribe(response => {
        console.log('Perfil actualizado:', response);
        this.perfilActual = perfilActualizado;
        this.perfilForm.patchValue(this.perfilActual);
        localStorage.setItem('perfilActual', JSON.stringify(this.perfilActual));
        this.inputsDisabled = true;
        this.perfilForm.disable();
      }, error => {
        console.error('Error al actualizar el perfil:', error);
      });
    }
  }

  async mostrarAlert() {
    if (this.inputsDisabled) {
      return;
    }

    const alert = await this.alertController.create({
      header: 'Cambiar foto de perfil',
      inputs: [
        {
          name: 'url',
          type: 'url',
          placeholder: 'Introduce la URL'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Aceptar',
          handler: (data) => {
            if (data.url) {
              this.perfilActual.fotoPerfilLink = data.url;
              this.perfilForm.patchValue({ fotoPerfilLink: data.url });
              localStorage.setItem('perfilActual', JSON.stringify(this.perfilActual));
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
