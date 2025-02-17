import { Component, OnInit } from '@angular/core';
import {IonButton, IonContent, IonInput, IonList, IonText, IonTitle} from "@ionic/angular/standalone";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {Login} from "../modelos/Login";
import {Router} from "@angular/router";
import {LoginService} from "../servicios/login.service";
import {AlertController} from "@ionic/angular";
import {PerfilService} from "../servicios/perfil.service";

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
        IonTitle,
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
    ]
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  login: Login = new Login();

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router, private alertController: AlertController, perfilService: PerfilService) {
    this.loginForm = this.fb.group({
      username: [this.login.username, Validators.required],
      password: [this.login.password, Validators.required],
    });
  }

  ngOnInit() {}

  async alertaError(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  doLogin(): void {
    if (this.loginForm.valid) {
      this.login = { ...this.login, ...this.loginForm.value };
      this.loginService.loguearUsuario(this.login).subscribe({
        next: (respuesta) => {
          const token = respuesta.token;
          sessionStorage.setItem("authToken", token);
          const username = this.login.username || '';
          sessionStorage.setItem("username", username);
          this.loginService.setAuthState(true);

          this.loginService.islogueado(token).subscribe({
            next: (isBaneado) => {
              if (isBaneado) {
                this.alertaError('Usuario Baneado', 'El usuario actualmente se encuentra baneado.');
                sessionStorage.removeItem("authToken");
                sessionStorage.removeItem("username");
                this.loginService.setAuthState(false);
              } else {
                this.router.navigate(['parati']);
              }
            },
            error: (e) => {
              console.error(e);
              this.alertaError('Error | Validación', 'No se pudo verificar el estado del usuario.');
            }
          });
        },
        error: (e) => {
          console.error(e);
          this.alertaError('Error | Validación', 'La contraseña o el nombre de usuario son incorrectos.');
        }
      });
    } else {
      this.alertaError('Error | Sin Datos', 'Los campos están vacíos. Por favor inserta los datos.');
    }
  }

  navigateToRegistro() {
    this.router.navigate(['/registro']);
  }
}

