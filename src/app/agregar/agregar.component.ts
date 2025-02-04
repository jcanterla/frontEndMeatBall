import { Component, OnInit } from '@angular/core';
import {
  IonButton,
  IonContent, IonHeader,
  IonInput,
  IonList, IonSearchbar, IonSelect, IonSelectOption,
  IonText,
  IonTextarea,
  IonTitle, IonToolbar
} from "@ionic/angular/standalone";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Agregar} from "../modelos/Agregar";
import {AgregarService} from "../servicios/agregar.service";
import {NavbarInferiorComponent} from "../navbar-inferior/navbar-inferior.component";
import {NavbarSuperiorComponent} from "../navbar-superior/navbar-superior.component";

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonContent,
    IonInput,
    IonList,
    IonText,
    IonTitle,
    ReactiveFormsModule,
    IonTextarea,
    IonSearchbar,
    IonSelect,
    IonSelectOption,
    IonHeader,
    IonToolbar,
    NavbarInferiorComponent,
    NavbarSuperiorComponent,
  ]
})
export class AgregarComponent  implements OnInit {
  agregarForm: FormGroup;
  agregar: Agregar = new Agregar();

  constructor(private fb: FormBuilder, private agregarService: AgregarService) {
    this.agregarForm = this.fb.group({
      titulo: [this.agregar.titulo, Validators.required],
      imagen_link: [this.agregar.imagen_link, Validators.required],
      descripcion: [this.agregar.descripcion, Validators.required],
      receta: [this.agregar.receta, Validators.required],
      dificultad: [this.agregar.dificultad, Validators.required],
      tiempo_preparacion: [this.agregar.tiempo_preparacion, Validators.required],
      tiempo_coccion: [this.agregar.tiempo_coccion, Validators.required],
      raciones: [this.agregar.raciones, Validators.required],
      estado: [this.agregar.estado, Validators.required],
    });
  }

  ngOnInit() {}

  doAnyadirPublicacion() {
    this.agregar = this.agregarForm.value;
    this.agregarService.agregar(this.agregar).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
