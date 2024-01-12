import { Injectable } from '@angular/core';
import { Entreprise } from '../models/entreprise';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {
  private apiServerUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  public getEntreprises(): Observable<Entreprise[]>{
    return this.http.get<Entreprise[]>(`${this.apiServerUrl}/entreprise/getAll`);
  }

  //add entreprise
  public addEntreprise(entreprise: Entreprise): Observable<Entreprise>{
    return this.http.post<Entreprise>(`${this.apiServerUrl}/entreprise/add`, entreprise);
  }

  //update entreprise
  public updateEntreprise(entreprise: Entreprise): Observable<Entreprise>{
    return this.http.put<Entreprise>(`${this.apiServerUrl}/entreprise/update`, entreprise);
}

  //delete entreprise
  public deleteEntreprise(siret: string): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/entreprise/delete/${siret}`);
  }
}
