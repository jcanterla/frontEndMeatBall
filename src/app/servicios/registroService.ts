import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Registro} from "../modelos/Registro";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private apiUrl = '/api/auth/registro/perfil';

  constructor(private http: HttpClient) { }

  registrarUsuario(registro: Registro): Observable<any> {
    return this.http.post<any>(this.apiUrl, registro);
  }
}
