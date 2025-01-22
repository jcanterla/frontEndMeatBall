import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Login} from "../modelos/Login";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuarioAllUrl = '/api/perfil/usuario';

  constructor(private httpClient: HttpClient) { }

  getUsuario(id: number): Observable<Login> {
    return this.httpClient.get<Login>(`${this.usuarioAllUrl}/${id}`);
  }
}
