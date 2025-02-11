import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Chat} from "../modelos/Chat";
import {ComunService} from "./comun.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private comunService : ComunService, private http : HttpClient) { }

  private urlChats  = '/chat/chats';
  private apiUrl = 'http://localhost:8080';

  getChats(): Observable<Chat[]> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<any>(`${this.apiUrl+this.urlChats}`, options);
  }

}
