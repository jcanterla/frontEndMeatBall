import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Agregar} from "../modelos/Agregar";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AgregarService {
  private apiUrl = '/api/auth/agregar/publicacion';

  constructor(private http: HttpClient) { }

  agregar(agregar: Agregar): Observable<any> {
    return this.http.post<any>(this.apiUrl, agregar);
  }

}
