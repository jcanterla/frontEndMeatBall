import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Publicacion} from "../modelos/Publicacion";
import {ComunService} from "./comun.service";
import { HttpParams } from '@angular/common/http';
import {Comentario} from "../modelos/Comentario";
import {comentarioEnviar} from "../modelos/comentarioEnviar";
import {environment} from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class ParatiService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient : HttpClient ,  private comunService:ComunService) { }

  getPublicacionesParaTi(): Observable<Publicacion[]>{
    const authHeader = this.comunService.autorizarPeticion();
    return this.httpClient.get<any>(`${this.apiUrl}/publicacion/parati`, authHeader);
  }

  getComentariosPublicacion(idPublicacion: number): Observable<Comentario[]> {
    const authHeader = this.comunService.autorizarPeticion()
    console.log(authHeader);
    return this.httpClient.get<any>(`${this.apiUrl}/publicacion/comentarios?idPublicacion=${idPublicacion.toString()}`, authHeader );
  }

  darLike(idPublicacion: number): Observable<any> {
    const authHeader = this.comunService.autorizarPeticion();

    return this.httpClient.post<any>(
      `${this.apiUrl}/publicacion/like`,
      null,
      {
        ...authHeader,
        params: new HttpParams().set('idPublicacion', idPublicacion.toString()),
      }
    );
  }

  quitarLike(idPublicacion: number): Observable<any> {
    const authHeader = this.comunService.autorizarPeticion();

    return this.httpClient.post<any>(
      `${this.apiUrl}/publicacion/quitarlike`,
      null,
      {
        ...authHeader,
        params: new HttpParams().set('idPublicacion', idPublicacion.toString()),
      }
    );
  }

  comentarPublicacion(comentarioEnviar: comentarioEnviar): Observable<any> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.httpClient.post<any>(`${this.apiUrl}/publicacion/comentar`, comentarioEnviar, authHeader);
  }

  getPublicacionesDeSeguidos(): Observable<Publicacion[]> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.httpClient.get<Publicacion[]>(`${this.apiUrl}/publicacion/seguidos`, authHeader);
  }

  getPublicacionesAleatorias(): Observable<Publicacion[]> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.httpClient.get<Publicacion[]>(`${this.apiUrl}/publicacion/aleatorias`, authHeader);
  }

  getPublicaciones(): Observable<Publicacion[]> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.httpClient.get<Publicacion[]>(`${this.apiUrl}/publicacion/all`, authHeader);
  }

  getPublicacionesBaneadas(): Observable<Publicacion[]> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.httpClient.get<Publicacion[]>(`${this.apiUrl}/publicacion/baneadas`, authHeader);
  }

  setActivo(idPublicacion: number): Observable<any> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.httpClient.post<any>(`${this.apiUrl}/publicacion/setActiva/${idPublicacion}`, null, authHeader);
  }

  setBaneado(idPublicacion: number): Observable<any> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.httpClient.post<any>(`${this.apiUrl}/publicacion/setBaneada/${idPublicacion}`, null, authHeader);
  }

}
