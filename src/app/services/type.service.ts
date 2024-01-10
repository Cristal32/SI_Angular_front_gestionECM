import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Type } from '../models/type';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  private apiServerUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  public getTypes(): Observable<Type[]>{
    return this.http.get<Type[]>(`${this.apiServerUrl}/typeStage/getAll`);
  }
}





