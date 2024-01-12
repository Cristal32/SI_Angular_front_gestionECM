import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from "rxjs";
import { Utilisateur } from 'src/app/models/utilisateur';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  currentUser: any;
  currentUtilisateur: Utilisateur = new Utilisateur();
  constructor(private router: Router, private utilisateurService: UtilisateurService,private authService: AuthService) { }

  ngOnInit(): void {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser')|| '{}');
      this.getCurrentUser();
  }

  logout(){
    // this.authService.logout();
    this.router.navigate(['login']);
  }

  getCurrentUser(){
    return this.utilisateurService.getUtilisateurById(this.currentUser.userId).subscribe(
      data => {
        this.currentUtilisateur = data;
      },
      (error: HttpErrorResponse) => {
        console.log(error)
      }
    );
  }


}