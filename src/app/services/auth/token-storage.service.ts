import { Injectable } from '@angular/core';
import { UtilisateurService } from '../utilisateur.service';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'currentUser';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  //currentUser = JSON.parse(localStorage.getItem('currentUser')|| '{}');

  constructor(private utilisateurService: UtilisateurService) { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  // getUser(): any {
  //   const user = window.sessionStorage.getItem(USER_KEY);
  //   if (user) {
  //     return JSON.parse(user).userId;
  //   }
  //   return {};
  // }

  getCurrentUser(){
    return JSON.parse(localStorage.getItem('currentUser')|| '{}');
  }

  // getCurrentUtilisateur(){
  //   return this.utilisateurService.getUtilisateurById(this.currentUser.userId).subscribe(
  //     data => {
  //       console.log(data);
  //     },
  //     (error: HttpErrorResponse) => {
  //       console.log(error)
  //     }
  //   );
  // }

  // getCurrentUtilisateur(){
  //   return this.utilisateurService.getUtilisateurById(this.currentUser.userId);
  // }

  getCurrentUtilisateur(){
    let currentUser = this.getCurrentUser();
    return this.utilisateurService.getUtilisateurById(currentUser.userId);
  }

}
