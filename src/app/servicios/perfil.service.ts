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
  private miPerfilUrl = '/perfil/miPerfil';
  private publicacionAllUrl = '/publicacion/all';
  private perfilAllUrl2 = '/perfil/update';
  private apiUrl = environment.apiUrl;
  private perfilId = '/perfil';

  constructor(private http: HttpClient, private comunService: ComunService) { }

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


}
