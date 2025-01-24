import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path:'chat',
    loadComponent: () => import('./chat/chat.component').then((m) => m.ChatComponent),
  },
  {
    path: 'registro',
    loadComponent: () => import('./registrar/registrar.component').then((m) => m.RegistrarComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'parati',
    loadComponent: () => import('./parati/parati.component').then((m) => m.ParatiComponent),
  },
  {
    path: 'explorar',
    loadComponent: () => import('./explorar/explorar.component').then((m) => m.ExplorarComponent),
  },
  {
    path: 'chat',
    loadComponent: () => import('./chat/chat.component').then((m) => m.ChatComponent),
  },
  {
    path: 'perfil',
    loadComponent: () => import('./perfil/perfil.component').then((m) => m.PerfilComponent),
  },
  {
    path: 'agregar',
    loadComponent: () => import('./agregar/agregar.component').then((m) => m.AgregarComponent),
  },
  {
    path: 'notificaciones',
    loadComponent: () => import('./notificaciones/notificaciones.component').then((m) => m.NotificacionesComponent),
  }
];
