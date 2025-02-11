import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {NavbarSuperiorComponent} from "../navbar-superior/navbar-superior.component";
import {NavbarInferiorComponent} from "../navbar-inferior/navbar-inferior.component";
import {arrowBackOutline} from "ionicons/icons";
import {addIcons} from "ionicons";
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";
import {ChatService} from "../servicios/chat.service";
import {Chat} from "../modelos/Chat";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    NavbarInferiorComponent,
    NavbarSuperiorComponent
  ]
})
export class ChatComponent  implements OnInit {

  constructor(private router: Router, private chatService: ChatService) {
    addIcons({"arrow-back-outline": arrowBackOutline})
  }

  chats: Chat[] = [];

  ngOnInit() {
    this.getChats();
  }

  getChats() {
    this.chatService.getChats().subscribe({
      next: (data) => {
        this.chats = data;
      },
      error: (error) => {
        console.error('Error fetching chats:', error);
      },
      complete: () => {
        console.log('Chat fetching completed');
      }
    });
  }

  navigateToMensajes() {
    this.router.navigate(['/mensajes']);
  }
}
