import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Agregar} from "../modelos/Agregar";
import {Observable} from "rxjs";
import {ComunService} from "./comun.service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AgregarService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private comunService:ComunService) { }

  agregar(agregar: Agregar): Observable<Agregar> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.http.post<Agregar>(`${this.apiUrl}/publicacion/agregar`, agregar, authHeader);
  }

  obtenerIngredientes(): Observable<string[]> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.http.get<string[]>(`${this.apiUrl}/publicacion/ingredientes`, authHeader);
  }

  obtenerEtiquetas(): Observable<string[]> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.http.get<string[]>(`${this.apiUrl}/publicacion/etiquetas`, authHeader);
  }

}
