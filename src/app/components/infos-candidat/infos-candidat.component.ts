import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Candidat } from 'src/app/models/candidat';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';
import { CandidatService } from 'src/app/services/candidat.service';

@Component({
  selector: 'app-infos-candidat',
  templateUrl: './infos-candidat.component.html',
  styleUrls: ['./infos-candidat.component.css']
})
export class InfosCandidatComponent {
  candidat:Candidat=new Candidat();
  selectedCandidat: Candidat=new Candidat();
  editedCandidat: Candidat=new Candidat();

  constructor(
    private candidatService: CandidatService, private tokenStorageService: TokenStorageService){}

  ngOnInit(){
    this.getCurrentCandidat();
  }


  //============================================== managing variables ==============================================

  assignSelectedCandidat(candidat:Candidat){
    this.selectedCandidat = candidat;
  }

  assignEditedCandidat(){
    this.editedCandidat = {...this.selectedCandidat};
    console.log(this.editedCandidat)
  }

  //============================================== update etudiant ============================================== 
  
  editCandidatForm(){
    this.candidatService.updateCandidat(this.editedCandidat).subscribe(
      data => {
        console.log(data);
        window.location.reload();
      },
      error => console.log(error)
    );
  }

  //============================================== get current etudiant ==============================================

  getCurrentCandidat(): void {
    const currentUserObservable = this.tokenStorageService.getCurrentUtilisateur();
    currentUserObservable.subscribe(
      (currentUser) => {
        if (currentUser && currentUser.candidat) {
          this.candidat = currentUser.candidat;
          this.getCandidatByEmail(this.candidat.email);
        } else {
          console.log('Utilisateur ou candidat non disponible.');
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  // get etudiant by id

  getCandidatByEmail(candidatEmail: string): void {
    this.candidatService.getCandidatByEmail(candidatEmail).subscribe(
      (candidat: Candidat) => {
        if (candidat) {
          this.selectedCandidat = candidat;
          console.log('Candidat récupéré avec succès :', this.selectedCandidat);
          // Vous pouvez ajouter d'autres actions si nécessaire
        } else {
          console.error('Aucun candidat trouvé pour l\'e-mail spécifié.');
        }
      },
      (erreur) => {
        console.error('Erreur lors de la récupération de candidat: ', erreur);
      }
    );
  }
}
