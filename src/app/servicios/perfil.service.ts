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
  private apiUrl = environment.apiUrl;
  private perfilId = '/perfil';
  private contarSeguidores = '/perfil/seguidores';
  private contarSeguidos = '/perfil/seguidos';
  private contarSeguidoresPerfil = '/perfil/seguidoresPerfil';
  private contarSeguidosPerfil = '/perfil/seguidosPerfil';
  private eliminarPublicacionUrl = '/perfil/eliminarPublicacion';
  private perfilAll = '/perfil/all';
  private perfilActivo = '/perfil/setActivo';
  private perfilBaneado = '/perfil/setBaneado';

  constructor(private http: HttpClient, private comunService: ComunService) { }

  getEliminarPublicacion(id: number): Observable<any> {
    const options = this.comunService.autorizarPeticion();
    return this.http.delete<any>(`${this.apiUrl+this.eliminarPublicacionUrl}/${id}`, options);
  }

  getContarSeguidores(id: number): Observable<number> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<number>(`${this.apiUrl+this.contarSeguidores}/${id}`, options);
  }

  getContarSeguidos(id: number): Observable<number> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<number>(`${this.apiUrl+this.contarSeguidos}/${id}`, options);
  }

  getContarSeguidoresPerfil(): Observable<number> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<number>(`${this.apiUrl+this.contarSeguidoresPerfil}`, options);
  }

  getContarSeguidosPerfil(): Observable<number> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<number>(`${this.apiUrl+this.contarSeguidosPerfil}`, options);
  }

  getPerfilPorToken(): Observable<Perfil> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<Perfil>(`${this.apiUrl+this.perfilAllUrl3}`, options);
  }

  getPerfiles(): Observable<Perfil[]> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<Perfil[]>(`${this.apiUrl+this.perfilAll}`, options);
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

  setBaneado(id: number): Observable<Perfil[]> {
    const options = this.comunService.autorizarPeticion();
    return this.http.post<any>(`${this.apiUrl+this.perfilBaneado}/${id}`,null, options);
  }

  setActivo(id: number): Observable<Perfil[]> {
    const options = this.comunService.autorizarPeticion();
    return this.http.post<any>(`${this.apiUrl+this.perfilActivo}/${id}`,null, options);
  }

  isAdmin(): Observable<boolean> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<boolean>(`${this.apiUrl}/perfil/isAdmin`, options);
  }

  reportarUsuario(id: number): Observable<Perfil> {
    const options = this.comunService.autorizarPeticion();
    const url = `${this.apiUrl}/perfil/setPendienteRevision/${id}`;
    return this.http.post<Perfil>(url, null, options);
  }

  reportarPublicacion(id: number): Observable<Publicacion> {
    const options = this.comunService.autorizarPeticion();
    const url = `${this.apiUrl}/publicacion/setPendiente/${id}`;
    return this.http.post<Publicacion>(url, null, options);
  }
}
