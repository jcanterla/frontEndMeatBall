import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Publicacion} from "../modelos/Publicacion";
import {ComunService} from "./comun.service";
import { HttpParams } from '@angular/common/http';
import {Comentario} from "../modelos/Comentario";
import {comentarioEnviar} from "../modelos/comentarioEnviar";
@Injectable({
  providedIn: 'root'
})
export class ParatiService {

  constructor(private httpClient : HttpClient ,  private comunService:ComunService) { }

  getPublicacionesParaTi(): Observable<Publicacion[]>{
    const authHeader = this.comunService.autorizarPeticion();
    return this.httpClient.get<any>("/api/publicacion/parati", authHeader);
  }

  getComentariosPublicacion(idPublicacion: number): Observable<Comentario[]> {
    const authHeader = this.comunService.autorizarPeticion()
    console.log(authHeader);
    return this.httpClient.get<any>(`/api/publicacion/comentarios?idPublicacion=${idPublicacion.toString()}`, authHeader );
  }

  darLike(idPublicacion: number): Observable<any> {
    const authHeader = this.comunService.autorizarPeticion();

    return this.httpClient.post<any>(
      `/api/publicacion/like`,
      null,
      {
        ...authHeader,
        params: new HttpParams().set('idPublicacion', idPublicacion.toString()),
      }
    );
  }

  comentarPublicacion(comentarioEnviar: comentarioEnviar): Observable<any> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.httpClient.post<any>("/api/publicacion/comentar", comentarioEnviar, authHeader);
  }

}
