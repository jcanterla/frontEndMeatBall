import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {ComunService} from "./comun.service";
import {HttpClient} from "@angular/common/http";
import {Perfil} from "../modelos/Perfil";
import {Publicacion} from "../modelos/Publicacion";
import {Usuario} from "../modelos/Usuario";

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private perfilAllUrl = '/perfil/all';
  private perfilAllUrl2 = '/perfil/update';
  private perfilAllUrl3 = '/perfil/perfilPorToken';
  private seguidoresUrl = '/usuario/seguir';
  private dejarSeguidoresUrl = '/usuario/dejarSeguir';
  private publicacionAllUrl = '/publicacion/all';
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private comunService: ComunService) { }

  getPerfiles(): Observable<Perfil[]> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<any>(`${this.apiUrl+this.perfilAllUrl}`, options);
  }

  getPerfilPorToken(): Observable<Perfil> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<Perfil>(`${this.apiUrl+this.perfilAllUrl3}`, options);
  }

  updatePerfil(perfil: Perfil): Observable<Perfil> {
    const options = this.comunService.autorizarPeticion();
    return this.http.put<Perfil>(`${this.apiUrl + this.perfilAllUrl2}`, perfil, options);
  }

  getPublicacion(): Observable<Publicacion[]> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<any>(`${this.apiUrl+this.publicacionAllUrl}`, options);
  }

  postSeguir(usuario: { seguidor_id: number, seguido_id: number }): Observable<any> {
    const options = this.comunService.autorizarPeticion();
    return this.http.post<any>(`${this.apiUrl+this.seguidoresUrl}`, usuario, options);
  }

  postDejarSeguir(usuario: { seguidor_id: number, seguido_id: number }): Observable<any> {
    const options = this.comunService.autorizarPeticion();
    return this.http.post<any>(`${this.apiUrl+this.dejarSeguidoresUrl}`, usuario, options);
  }
}
