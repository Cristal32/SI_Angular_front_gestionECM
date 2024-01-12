import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/role';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiServerUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  //get all roles
  public getRoles(): Observable<Role[]>{
    return this.http.get<Role[]>(`${this.apiServerUrl}/roles/getAll`);
  }

  //get a role by its libelle
  public getRoleByLibelle(libelle: string): Observable<Role>{
    return this.http.get<Role>(`${this.apiServerUrl}/roles/getLibelle/${libelle}`)
  }

   //get a role by its id
   public getRoleById(id: number): Observable<Role>{
    return this.http.get<Role>(`${this.apiServerUrl}/roles/getId/${id}`)
  }

  //create role
  public addRole(role: Role): Observable<Role>{
    return this.http.post<Role>(`${this.apiServerUrl}/roles/add`, role);
  }

  //update role
  public updateRole(role: Role): Observable<Role>{
    return this.http.put<Role>(`${this.apiServerUrl}/roles/update`, role);
}

  //delete role
  public deleteRole(roleId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/roles/delete/${roleId}`);
  }
}
