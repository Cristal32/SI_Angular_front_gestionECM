import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Stage } from 'src/app/models/stage';
import { StageService } from 'src/app/services/stage.service';
// import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-stages',
  templateUrl: './stages.component.html',
  styleUrls: ['./stages.component.css']
})
export class StagesComponent {
  // currentUser: any;
  // currentUtilisateur: Utilisateur = new Utilisateur();

  ListeStages: Stage[] = [];
  filteredListeStages: Stage[] = [];
  selectedStage: Stage = new Stage();
  editedStage: Stage = new Stage();

  //tabs
  editStageModal_ActiveTab: string = '';
  createStageModal_ActiveTab: string = '';
  stage_activeTab: string = 'stage';

  // constructor(
  //   private stagiaireService: StageService,
  //   private utilisateurService: UtilisateurService,
  //   private fileService: FileService){}
  constructor(
    private stageService: StageService){}

  ngOnInit(){
    // this.currentUser = JSON.parse(localStorage.getItem('currentUser')|| '{}');
    // this.getCurrentUser();
    
    //test
    this.ListeStages = [
      {
        id: 1,
        annee: 2024,
        etudiant:{
          id: 1,
          nom: 'Atatri',
          prenom: 'Doaa',
          adrs: 'Kenitra',
          dateNaissance: new Date(2002,5,1),
          sexe: 'F',
          tel: '0000000000',
          mention: 'Tres bien',
          promo: {
            annee: 2022
          }
        }
      },
      {
        id: 2,
        annee: 2024,
        etudiant:{
          id: 1,
          nom: 'Braikat',
          prenom: 'Fatima Zahra',
          adrs: 'Casa',
          dateNaissance: new Date(2002,6,2),
          sexe: 'F',
          tel: '1111111111',
          mention: 'Tres bien',
          promo: {
            annee: 2022
          }
        }
      }
    ];
    this.filteredListeStages = this.ListeStages;
  }
  //============================================== managing variables ==============================================

  assignSelectedStage(stage: Stage){
    this.selectedStage = stage;
  }

  assignEditedStage(){
    this.editedStage = {...this.selectedStage};
  }

  //============================================== get all stages ==============================================

  public getStages(): void{
    this.stageService.getStages().subscribe(
      data => {
       this.ListeStages = data;
       this.filteredListeStages = [...this.ListeStages];
       //console.log(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error)
      }
    );
  }

  //============================================== get current user ==============================================
  // getCurrentUser(){
  //   return this.utilisateurService.getUtilisateurById(this.currentUser.userId).subscribe(
  //     data => {
  //       this.currentUtilisateur = data;
  //       this.getStagiairesValides(this.currentUtilisateur.userId);
  //     },
  //     (error: HttpErrorResponse) => {
  //       console.log(error)
  //     }
  //   );
  // }

  //============================================== update stage ============================================== 
  
  editStageForm(){
    this.stageService.updateStage(this.editedStage).subscribe(
      data => {
        console.log(data);
        window.location.reload();
      },
      error => console.log(error)
    );
  }

  //============================================== download stagiaire cv ============================================== 

  // downloadStagiaireCv(stagiaireCv : FileData){
  //   if(stagiaireCv != null){
  //     let filename : string = stagiaireCv.fileName;
  //     console.log(filename);
  //     this.fileService.downloadFile(filename).subscribe(
  //       data => {
  //         console.log(data);
  //         const blob = new Blob([data], { type: 'application/octet-stream' });
  //         const url = window.URL.createObjectURL(blob);
  //         const link = document.createElement('a');
  //         link.href = url;
  //         link.download = filename;
  //         link.click();
  //         window.URL.revokeObjectURL(url);
  //       },
  //       error => console.log(error)
  //     );
  //    }
  // }

  //============================================== search bar ==============================================
  filterResults(text: string) {
    if (!text) {
      this.filteredListeStages = this.ListeStages;
    } else {
      this.filteredListeStages = this.ListeStages.filter(stage =>
        this.matchesSearchCriteria(stage, text)
      );
    }
  }
  matchesSearchCriteria(stage: Stage, text: string): boolean {
    const searchFields: string[] = [
      stage?.annee.toLocaleString()
    ];
    return searchFields.some(field => field.includes(text.toLowerCase()));
  }
  resetFilteredList(input: HTMLInputElement) {
    this.filteredListeStages = this.ListeStages;
    input.value = '';
  }
}