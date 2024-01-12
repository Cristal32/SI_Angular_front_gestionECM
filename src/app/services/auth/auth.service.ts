import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Utilisateur } from 'src/app/models/utilisateur';
import { TokenStorageService } from './token-storage.service';
import { UtilisateurService } from '../utilisateur.service';
import { Access } from 'src/app/models/access';

const apiServerUrl = 'http://localhost:8080';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiServerUrl = 'http://localhost:8080/api';

  currentUserAuthorities: string[] = [];

  loggedInUser: Utilisateur = new Utilisateur();

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService, private utilisateurService: UtilisateurService) { }

  login(data: any): Observable<any>{
    console.log(data);

    return this.http.post(`${this.apiServerUrl}/auth/authenticate`, data, httpOptions).pipe(map((res: any) => {

      const username = res.username;
      const token = res.token;
      const userId = res.id;

      if (token) {
        localStorage.setItem('currentUser', JSON.stringify({ username: username, userId: userId, token: token }));
        console.log(localStorage.getItem('currentUser'));
      }
    }));
  }

  getCurrentUtilisateur(){
    return this.tokenStorageService.getCurrentUtilisateur();
  }

  // getCurrentUserAuthorities(){
  //   let currentUser = JSON.parse(localStorage.getItem('currentUser')|| '{}');
  //   let currentUserId = currentUser.userId;
  //   return this.utilisateurService.getUserAccesses(currentUserId).subscribe(
  //     data => {
  //       console.log(data);
  //       const currentUserAccesses: Access[] = data;
  //       console.log(currentUserAccesses);
  //       for(const access of currentUserAccesses){
  //         this.currentUserAuthorities.push(access.authority);
  //       }
  //     },
  //     (error: HttpErrorResponse) => {
  //       console.log(error)
  //     }
  //   );
  // }
  

  // hasAnyAuthority(authorities: string){
  //   let currentUserAccess = this.getCurrentUserAuthorities();
  //   const userAuthorities = this.currentUserAuthorities;
  //   const checkAuthorities: string[] = authorities.split(',');
  //   let result = false;
  //   console.log(userAuthorities);
  //   console.log(userAuthorities[0]);
  //   for(const auth of checkAuthorities){
  //     console.log(auth);
  //     console.log(userAuthorities.indexOf(auth));
  //     if(userAuthorities.indexOf(auth) != -1){
  //       console.log("this user has this authority");
  //       result = true;
  //     }
  //   }
  //   return result;
  // }

  async getCurrentUserAuthorities(): Promise<string[]> {
    let currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    let currentUserId = currentUser.userId;
    
    return new Promise<string[]>((resolve, reject) => {
      this.utilisateurService.getUserAccesses(currentUserId).subscribe(
        data => {
          const currentUserAccesses: Access[] = data;
          const currentUserAuthorities: string[] = [];
          for (const access of currentUserAccesses) {
            currentUserAuthorities.push(access.authority);
          }
          resolve(currentUserAuthorities); // Resolve the promise with the array
        },
        error => {
          console.log(error);
          reject(error); // Reject the promise if there's an error
        }
      );
    });
  }
  
  async hasAnyAuthority(authorities: string) {
    try {
      const currentUserAuthorities = await this.getCurrentUserAuthorities();
      const checkAuthorities: string[] = authorities.split(',');
      let result = false;
      // console.log(currentUserAuthorities);
      // console.log(currentUserAuthorities[0]);
      for (const auth of checkAuthorities) {
        // console.log(auth);
        // console.log(currentUserAuthorities.indexOf(auth));
        if (currentUserAuthorities.indexOf(auth) != -1) {
          //console.log("this user has this authority");
          result = true;
        }
      }
      return result;
    } catch (error) {
      console.log(error);
      return false; // Or handle the error accordingly
    }
  }


  logout(){
    localStorage.removeItem('currentUser');
  }
}