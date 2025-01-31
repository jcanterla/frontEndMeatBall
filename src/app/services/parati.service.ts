import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Publicacion} from "../modelos/Publicacion";
import {ComunService} from "./comun.service";

@Injectable({
  providedIn: 'root'
})
export class ParatiService {

  constructor(private httpClient : HttpClient ,  private comunService:ComunService) { }

  getPublicacionesParaTi(): Observable<Publicacion[]>{
    const authHeader = this.comunService.autorizarPeticion();
    return this.httpClient.get<any>("/api/publicacion/parati", authHeader);
  }
}
