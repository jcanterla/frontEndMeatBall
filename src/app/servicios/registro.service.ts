import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Registro} from "../modelos/Registro";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private apiUrl = '/api/auth/registro/perfil';

  constructor(private http: HttpClient) { }

  registrarUsuario(registro: Registro): Observable<any> {
    return this.http.post<any>(this.apiUrl, registro);
  }
}
