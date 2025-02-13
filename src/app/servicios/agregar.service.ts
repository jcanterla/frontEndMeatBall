import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Agregar} from "../modelos/Agregar";
import {Observable} from "rxjs";
import {ComunService} from "./comun.service";

@Injectable({
  providedIn: 'root'
})
export class AgregarService {
  private apiUrl = '/api/publicacion';

  constructor(private http: HttpClient, private comunService:ComunService) { }

  agregar(agregar: Agregar): Observable<Agregar> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.http.post<Agregar>(`${this.apiUrl}/agregar`, agregar, authHeader);
  }

  obtenerIngredientes(): Observable<string[]> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.http.get<string[]>(`${this.apiUrl}/ingredientes`, authHeader);
  }

  obtenerEtiquetas(): Observable<string[]> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.http.get<string[]>(`${this.apiUrl}/etiquetas`, authHeader);
  }

}
