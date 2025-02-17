import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Login} from "../modelos/Login";
import {environment} from "../../environments/environment";
import {ComunService} from "./comun.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = environment.apiUrl;
  private logueadoUrl = '/perfil/baneado';
  private authState = new BehaviorSubject<boolean>(!!sessionStorage.getItem('authToken'));
  authState$ = this.authState.asObservable();

  constructor(private http: HttpClient, private comunService:ComunService) {}

  setAuthState(isAuthenticated: boolean): void {
    this.authState.next(isAuthenticated);
  }

  loguearUsuario(login: Login): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/auth/login`,login) ;
  }

  islogueado(token: string): Observable<boolean> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<boolean>(`${this.apiUrl+this.logueadoUrl}`, options);
  }
}
