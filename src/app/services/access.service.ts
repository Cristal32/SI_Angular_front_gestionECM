import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Access } from '../models/access';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccessService {
  private apiServerUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  //get all accesses
  public getAccesses(): Observable<Access[]>{
    return this.http.get<Access[]>(`${this.apiServerUrl}/access/getAll`);
  }

  //get a role by its libelle
  public getAccessByLibelle(libelle: string): Observable<Access>{
    return this.http.get<Access>(`${this.apiServerUrl}/access/getLibelle/${libelle}`)
  }

   //get a access by its id
   public getAccessById(id: number): Observable<Access>{
    return this.http.get<Access>(`${this.apiServerUrl}/access/getId/${id}`)
  }

  //create access
  public addAccess(access: Access): Observable<Access>{
    return this.http.post<Access>(`${this.apiServerUrl}/access/add`, access);
  }

  //update access
  public updateAccess(access: Access): Observable<Access>{
    return this.http.put<Access>(`${this.apiServerUrl}/access/update`, access);
}

  //delete access
  public deleteAccess(accessId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/access/delete/${accessId}`);
  }
}
