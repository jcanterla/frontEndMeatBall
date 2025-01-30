import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Login} from "../modelos/Login";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = environment.apiUrl;
  private authState = new BehaviorSubject<boolean>(!!sessionStorage.getItem('authToken'));
  authState$ = this.authState.asObservable();

  constructor(private http: HttpClient) {}

  setAuthState(isAuthenticated: boolean): void {
    this.authState.next(isAuthenticated);
  }

  loguearUsuario(login: Login): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/auth/login`,login) ;
  }
}
