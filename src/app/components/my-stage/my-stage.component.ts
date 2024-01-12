import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Etudiant } from 'src/app/models/etudiant';
import { Stage } from 'src/app/models/stage';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';
import { StageService } from 'src/app/services/stage.service';

@Component({
  selector: 'app-my-stage',
  templateUrl: './my-stage.component.html',
  styleUrls: ['./my-stage.component.css']
})
export class MyStageComponent implements OnInit{

  ListeStages: Stage[] = [];
  filteredListeStages: Stage[] = [];
  ListeEtudiants: Etudiant[] = [];
  stages: Stage[] = [];
  etudiant : Etudiant = new Etudiant();

  constructor(private stageService: StageService, private tokenStorageService: TokenStorageService) {}

  ngOnInit(){
    this.getCurrentEtudiant()
  }

  //============================================== get current etudiant ==============================================

  getCurrentEtudiant(): void {
    const currentUserObservable = this.tokenStorageService.getCurrentUtilisateur();
    currentUserObservable.subscribe(
      (currentUser) => {
        if (currentUser && currentUser.etudiant) {
          this.etudiant = currentUser.etudiant;
          this.getEtudiantStages(this.etudiant.id);
        } else {
          console.log('Utilisateur ou étudiant non disponible.');
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  //============================================== get etudiant stages ==============================================

  public getEtudiantStages(etudiantId: number): void {
    this.stageService.getStagesByEtudiantId(etudiantId).subscribe(
      data => {
        this.ListeStages = data;
        console.log(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  //============================================== get all stages ==============================================

  // public getEtudiantStages(etudiantId: number): void{
  //   this.stageService.getStages().subscribe(
  //     data => {
  //      this.ListeStages = data;
  //      this.filteredListeStages = this.ListeStages.filter(stage => stage.etudiant.id === etudiantId);
  //      //console.log(data);
  //     },
  //     (error: HttpErrorResponse) => {
  //       console.log(error)
  //     }
  //   );
  // }
}
