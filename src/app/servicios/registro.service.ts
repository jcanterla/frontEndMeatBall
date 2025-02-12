import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Registro} from "../modelos/Registro";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import { ComunService } from '../servicios/comun.service';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private apiUrl = environment.apiUrl;
  private apiUrl2 = '/auth/enviarEmail';
  private authState = new BehaviorSubject<boolean>(!!sessionStorage.getItem('authToken'));
  authState$ = this.authState.asObservable();

  constructor(private http: HttpClient, private comunService: ComunService) { }

  setAuthState(isAuthenticated: boolean): void {
    this.authState.next(isAuthenticated);
  }

  registrarUsuario(registro: Registro): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/auth/registro/perfil`,registro) ;
  }

  enviarEmail(user: { email: string; password: string }): Observable<any> {
    const options = {
      ...this.comunService.autorizarPeticion(),
      responseType: 'text' as 'json'
    };
    return this.http.post<any>(`${this.apiUrl + this.apiUrl2}`, user, options);
  }
}
