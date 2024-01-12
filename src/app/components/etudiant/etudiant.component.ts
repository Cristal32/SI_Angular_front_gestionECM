import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Utilisateur } from 'src/app/models/utilisateur';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantComponent {
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
