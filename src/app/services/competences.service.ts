import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Competences } from '../models/competences';

@Injectable({
  providedIn: 'root'
})
export class CompetencesService {

  private apiServerUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  public getCompetences(): Observable<Competences[]>{
    return this.http.get<Competences[]>(`${this.apiServerUrl}/competence/getAll`);
  }

  //add competence
  public addCompetences(competence: Competences): Observable<Competences>{
    return this.http.post<Competences>(`${this.apiServerUrl}/competence/add`, competence);
  }

  //update prof
  public updateCompetences(competence: Competences): Observable<Competences>{
    return this.http.put<Competences>(`${this.apiServerUrl}/competence/update`, competence);
}

//delete prof
public deleteCompetences(competenceCode: string): Observable<void>{
  return this.http.delete<void>(`${this.apiServerUrl}/competence/delete/${competenceCode}`);
}
}





