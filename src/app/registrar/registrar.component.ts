import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Registro } from "../modelos/Registro";
import { CommonModule } from "@angular/common";
import { RegistroService } from '../servicios/registro.service';
import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonInput,
  IonList, IonText,
  IonTitle
} from "@ionic/angular/standalone";
import {Router} from "@angular/router";

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
    IonText,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
  ]
})

export class RegistrarComponent implements OnInit {
  registroForm: FormGroup;
  registro: Registro = new Registro();

  constructor(private fb: FormBuilder, private registroService: RegistroService, private router: Router) {
    this.registroForm = this.fb.group({
      username: [this.registro.username, Validators.required],
      password: [this.registro.password, Validators.required],
      email: [this.registro.email, Validators.required]
    });
  }

  ngOnInit() {}

  doRegister() {
    if (this.registroForm.valid) {
      this.registro = { ...this.registro, ...this.registroForm.value };
      this.registroService.registrarUsuario(this.registro).subscribe(
        response => {
          console.log('Registro exitoso:', response);
          this.registroForm.reset()
          this.router.navigate(['/parati']);
        },
        error => {
          console.error('Error en el registro:', error);
        }
      );
    } else {
      console.log('Formulario inválido. Por favor verifica los datos.');
    }
  }
}
