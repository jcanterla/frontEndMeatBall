import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Chat} from "../modelos/Chat";
import {ComunService} from "./comun.service";
import {HttpClient} from "@angular/common/http";
import {Mensaje} from "../modelos/Mensaje";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private contactoObservable = new BehaviorSubject<number>(0);
  contacto = this.contactoObservable.asObservable();

  setContactoId(id: number | undefined) {
    sessionStorage.setItem('contacto', String(id));
    if (id != null) {
      this.contactoObservable.next(id);
    }

  }

  getContactoId(): number  {
    if(this.contactoObservable.value ===null){
      return Number(sessionStorage.getItem('contacto'));
    }
    return this.contactoObservable.value;
  }

  constructor(private comunService : ComunService, private http : HttpClient) { }

  private urlChats  = '/chat/chats';
  private apiUrl = environment.apiUrl;
  private urlMensajeEnviar  = '/chat/enviar';
  private urlMensajesChatPrivado  = '/chat/';

  getChats(): Observable<Chat[]> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<any>(`${this.apiUrl+this.urlChats}`, options);
  }

  cargarMensajesChat(idPerfil: number | null): Observable<Mensaje[]> {
    const options = this.comunService.autorizarPeticion();
    return this.http.get<any>(`${this.apiUrl+this.urlMensajesChatPrivado}`+idPerfil, options);
  }

  enviarMensaje(mensaje:Mensaje){
    const options = this.comunService.autorizarPeticion();
    return this.http.post<any>(`${this.apiUrl+this.urlMensajeEnviar}`,mensaje ,options );
  }

}
