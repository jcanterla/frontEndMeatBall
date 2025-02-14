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
  private miPerfilUrl = '/perfil/miPerfil';
  private perfilAllUrl2 = '/perfil/update';
  private perfilAllUrl3 = '/perfil/miPerfil';
  private seguidoresUrl = '/usuario/seguir';
  private dejarSeguidoresUrl = '/usuario/dejarSeguir';
  private publicacionAllUrl = '/publicacion/all';
  private publicacionTokenUrl = '/perfil/misPublicaciones';
  private publicacionesIDUrl = '/perfil/otrasPublicaciones';
  private contarSeguidoresUrl = '/perfil/seguidores';
  private contarSeguidoresPerfilUrl = '/perfil/seguidoresPerfil';
  private contarSeguidosPerfilUrl = '/perfil/seguidosPerfil';
  private contarSeguidosUrl = '/perfil/seguidos';
  private apiUrl = environment.apiUrl;
  private perfilId = '/perfil';

  constructor(private http: HttpClient, private comunService: ComunService) { }

  getPerfilPorToken(): Observable<Perfil> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<Perfil>(`${this.apiUrl+this.perfilAllUrl3}`, options);
  }

  getPublicacionPorToken(): Observable<Publicacion[]> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<Publicacion[]>(`${this.apiUrl + this.publicacionTokenUrl}`, options);
  }

  getPublicacionesPorId(id: number): Observable<Publicacion[]> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<Publicacion[]>(`${this.apiUrl+this.publicacionesIDUrl}/${id}`, options);
  }

  updatePerfil(perfil: Perfil): Observable<Perfil> {
    const options = this.comunService.autorizarPeticion();
    return this.http.put<Perfil>(`${this.apiUrl + this.perfilAllUrl2}`, perfil, options);
  }

  getPerfil(): Observable<Perfil>{
    const options = this.comunService.autorizarPeticion();
    return this.http.get<any>(`${this.apiUrl+this.miPerfilUrl}`,options);
  }

  getPerfilById(id: number): Observable<Perfil>{
    const options = this.comunService.autorizarPeticion();
    return this.http.get<any>(`${this.apiUrl+this.perfilId}/${id}`,options);
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

  getSeguidores(id: number): Observable<number> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<number>(`${this.apiUrl + this.contarSeguidoresUrl}/${id}`, options);
  }

  getSeguidos(id: number): Observable<number> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<number>(`${this.apiUrl + this.contarSeguidosUrl}/${id}`, options);
  }

  getSeguidoresPerfil(): Observable<number> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<number>(`${this.apiUrl + this.contarSeguidoresPerfilUrl}`, options);
  }

  getSeguidosPerfil(): Observable<number> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<number>(`${this.apiUrl + this.contarSeguidosPerfilUrl}`, options);
  }
}
