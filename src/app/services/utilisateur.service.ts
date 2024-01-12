import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from '../models/utilisateur';
import { Access } from '../models/access';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private apiServerUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  //get a user
  //Observable: represents the return of the method
  public getUtilisateurs(): Observable<Utilisateur[]>{
    return this.http.get<Utilisateur[]>(`${this.apiServerUrl}/utilisateur/getAll`);
  }

  public getUtilisateurById(id: number): Observable<Utilisateur>{
    return this.http.get<Utilisateur>(`${this.apiServerUrl}/utilisateur/getId/${id}`);
  }

  getUserAccesses(userId: number): Observable<Access[]>{
    return this.http.get<Access[]>(`${this.apiServerUrl}/utilisateur/getAllAccesByUserId/${userId}`);
  }

  //add a user
  public addUtilisateur(utilisateur: Utilisateur): Observable<Utilisateur>{
      return this.http.post<Utilisateur>(`${this.apiServerUrl}/utilisateur/add`, utilisateur);
    }

  //update a user
  public updateUtilisateur(utilisateur: Utilisateur): Observable<Utilisateur>{
      return this.http.put<Utilisateur>(`${this.apiServerUrl}/utilisateur/update`, utilisateur);
  }

  //delete a user
  public deleteUtilisateur(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/utilisateur/delete/${id}`);
  }
}
