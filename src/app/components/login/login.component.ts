import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Access } from 'src/app/models/access';
import { Role } from 'src/app/models/role';
import { Utilisateur } from 'src/app/models/utilisateur';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  currentUtilisateur: Utilisateur = new Utilisateur();

  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  LoggedInUserRoles: Role[] = [];
  
  constructor(private router: Router, private authService: AuthService, private tokenStorageService: TokenStorageService, private utilisateurService: UtilisateurService) { }

  ngOnInit(): void {
    //loged in user
    //console.log(JSON.parse(localStorage.getItem('currentUser')|| '{}'));
  }

  getCurrentUtilisateur(){
    return this.tokenStorageService.getCurrentUtilisateur();
  }

  onSubmit() {
    console.log('Submitting login form...');

    this.authService.login(this.form).pipe(
      switchMap(() => this.tokenStorageService.getCurrentUtilisateur())
    ).subscribe(
      userData => {
        console.log('User data received:', userData);
        this.currentUtilisateur = userData;
        //console.log(this.currentUtilisateur); CHECKED
        this.utilisateurService.getUserAccesses(this.currentUtilisateur.id).subscribe(
          data => {
            console.log('User accesses received:', data);
          
            let userAccesses: Access[] = data;
            for(const access of userAccesses){
              if (access.authority == "MANAGE_ADMIN"){
                console.log('Redirecting to /dashboard...')
                this.router.navigate(['/dashboard']);
                break;
              }
              if (access.authority == "MANAGE_ETUDIANT"){
                console.log('Redirecting to /etudiant...')
                this.router.navigate(['/etudiant']);
                break;
              }
              if (access.authority == "MANAGE_CANDIDAT"){
                console.log('Redirecting to /candidat...')
                this.router.navigate(['/candidat']);
                break;
              }
            }
          },
          error => {
            console.error('Error while fetching user accesses:', error);
          }
        );
      },
      error => {
        console.error('Error during login:', error);
        if (error.status === 403) {
          this.errorMessage = "Accès interdit. Veuillez vérifier vos informations d'identification.";
        }
        else {
          this.errorMessage = "Une erreur s'est produite lors de l'authentification.";
        }
      }
    );
  }
}
