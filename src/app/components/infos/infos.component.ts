import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, of } from 'rxjs';
import { Etudiant } from 'src/app/models/etudiant';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';
import { EtudiantService } from 'src/app/services/etudiant.service';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.css']
})
export class InfosComponent implements OnInit{

  etudiant:Etudiant=new Etudiant();
  selectedEtudiant: Etudiant = new Etudiant();
  editedEtudiant: Etudiant = new Etudiant();

  constructor(
    private etudiantService: EtudiantService, private tokenStorageService: TokenStorageService){}

  ngOnInit(){
    this.getCurrentEtudiant();
  }


  //============================================== managing variables ==============================================

  assignSelectedEtudiant(etudiant: Etudiant){
    this.selectedEtudiant = etudiant;
  }

  assignEditedEtudiant(){
    this.editedEtudiant = {...this.selectedEtudiant};
    console.log(this.editedEtudiant)
  }

  //============================================== update etudiant ============================================== 
  
  editEtudiantForm(){
    this.etudiantService.updateEtudiant(this.editedEtudiant).subscribe(
      data => {
        console.log(data);
        window.location.reload();
      },
      error => console.log(error)
    );
  }

  //============================================== get current etudiant ==============================================

  getCurrentEtudiant(): void {
    const currentUserObservable = this.tokenStorageService.getCurrentUtilisateur();
    currentUserObservable.subscribe(
      (currentUser) => {
        if (currentUser && currentUser.etudiant) {
          this.etudiant = currentUser.etudiant;
          this.getEtudiantById(this.etudiant.id);
        } else {
          console.log('Utilisateur ou étudiant non disponible.');
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  // get etudiant by id

  getEtudiantById(etudiantId: number): void {
    this.etudiantService.getEtudiantById(etudiantId).subscribe(
      (etudiant: Etudiant) => {
        this.selectedEtudiant = etudiant;
        console.log('Etudiant récupéré avec succès :', this.selectedEtudiant);
        // Vous pouvez ajouter d'autres actions si nécessaire
      },
      (erreur) => {
        console.error('Erreur lors de la récupération de l\'étudiant : ', erreur);
      }
    );
  }
}
