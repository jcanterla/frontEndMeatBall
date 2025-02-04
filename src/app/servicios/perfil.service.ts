import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {ComunService} from "./comun.service";
import {HttpClient} from "@angular/common/http";
import {Perfil} from "../modelos/Perfil";
import {Publicacion} from "../modelos/Publicacion";

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private perfilAllUrl = '/perfil/all';
  private perfilAllUrl2 = '/perfil/update';
  private publicacionAllUrl = '/publicacion/all';
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private comunService: ComunService) { }

  getPerfiles(): Observable<Perfil[]> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<any>(`${this.apiUrl+this.perfilAllUrl}`, options);
  }

  updatePerfil(perfil: Perfil): Observable<Perfil> {
    const options = this.comunService.autorizarPeticion();
    return this.http.put<Perfil>(`${this.apiUrl + this.perfilAllUrl2}`, perfil, options);
  }

  getPublicacion(): Observable<Publicacion[]> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<any>(`${this.apiUrl+this.publicacionAllUrl}`, options);
  }
}
