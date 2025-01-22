import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Registro} from "../modelos/Registro";
import {Injectable} from "@angular/core";
import {Login} from "../modelos/Login";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = '/api/auth/login';
  private authState = new BehaviorSubject<boolean>(!!sessionStorage.getItem('authToken'));
  authState$ = this.authState.asObservable();

  constructor(private http: HttpClient) {}

  setAuthState(isAuthenticated: boolean): void {
    this.authState.next(isAuthenticated);
  }

  loguearUsuario(login: Login): Observable<any>{
    return this.http.post<any>(this.apiUrl,login) ;
  }
}
