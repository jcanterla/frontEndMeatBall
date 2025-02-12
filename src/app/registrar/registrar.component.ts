import { AlertController } from "@ionic/angular";
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {
  AbstractControl, ValidatorFn,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from "@angular/forms";
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
import { Router } from "@angular/router";

export const comprobarPassword: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmarPassword = control.get('confirmarPassword');
  return password && confirmarPassword && password.value !== confirmarPassword.value ? { 'noCoinciden': true } : null;
}

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
  emailError: string | null = null;
  usernameError: string | null = null;

  constructor(private fb: FormBuilder, private registroService: RegistroService, private router: Router, private alertController: AlertController) {
    this.registroForm = this.fb.group({
      username: [this.registro.username, Validators.required],
      password: [this.registro.password, Validators.required],
      confirmarPassword: ["", Validators.required],
      email: [this.registro.email, [Validators.required, Validators.email]],
      acceptTerms: [false, Validators.requiredTrue]
    }, { validator: comprobarPassword });
  }

  ngOnInit() {}

  doRegister() {
    if (this.registroForm.valid) {
      this.registro = { ...this.registro, ...this.registroForm.value };
      this.registroService.registrarUsuario(this.registro).subscribe(
        response => {
          console.log('Registro exitoso:', response);
          this.registroService.enviarEmail(this.registroForm.value).subscribe(
            emailResponse => {
              console.log('Email enviado:', emailResponse);
              this.registroForm.reset();
              this.router.navigate(['/login']);
            },
            emailError => {
              console.error('Error al enviar el email:', emailError);
              if (emailError instanceof HttpErrorResponse) {
                console.error('Detalles del error:', emailError.message);
              }
            }
          );
        },
        error => {
          console.error('Error en el registro:', error);
          if (error.error.emailExists) {
            this.emailError = 'El email ya está registrado.';
          }
          if (error.error.usernameExists) {
            this.usernameError = 'El nombre de usuario ya está registrado.';
          }
        }
      );
    } else {
      if (this.registroForm.errors?.['noCoinciden']) {
        console.error('Las contraseñas no coinciden');
      } else {
        console.error('Formulario inválido');
      }
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  async verPoliticas() {
    const alert = await this.alertController.create({
      header: 'Políticas de privacidad',
      message: 'En Meætball, protegemos tu privacidad. Recopilamos datos como tu nombre, ' +
        'correo electrónico, recetas y comentarios para personalizar tu experiencia y ' +
        'mejorar nuestros servicios. Nunca compartimos ni vendemos tu información a ' +
        'terceros, salvo con proveedores esenciales para operar la plataforma o cuando ' +
        'la ley lo exija. Implementamos medidas de seguridad para proteger tus datos. ' +
        'Al usar nuestra red social, aceptas esta política.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.registroForm.get('acceptTerms')?.setValue(false);
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.registroForm.get('acceptTerms')?.setValue(true);
          }
        }
      ]
    });
    await alert.present();
  }
}
