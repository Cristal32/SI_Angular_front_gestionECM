import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Prof } from 'src/app/models/prof';
import { ProfService } from 'src/app/services/prof.service';
import { Competences } from 'src/app/models/competences';
import { CompetencesService } from 'src/app/services/competences.service';


@Component({
  selector: 'app-prof',
  templateUrl: './competences.component.html',
  styleUrls: ['./competences.component.css']
})

export class CompetencesComponent {
  // currentUser: any;
  // currentUtilisateur: Utilisateur = new Utilisateur();

  ListeCompetences: Competences[] = [];
  filteredListeCompetences: Competences[] = [];
  selectedCompetences: Competences = new Competences();
  editedCompetences: Competences = new Competences();
  deletedCompetences: Competences = new Competences();
  createdCompetences: Competences = new Competences();
  


  //tabs
  editCompetencesModal_ActiveTab: string = '';
  createCompetencesModal_ActiveTab: string = '';
  competences_activeTab: string = 'competences';

  //============================================== tabs management ==============================================
  tabBackgroundColor: string = '#f1f1f1';

  setActiveCreateTab(tab: string){
    this.createCompetencesModal_ActiveTab = tab;
  }
  setActiveEditTab(tab: string){
    this.editCompetencesModal_ActiveTab = tab;
  }

  setActiveCompetencesTab(tab: string){
    this.competences_activeTab = tab;
  }


  // constructor(
  //   private stagiaireService: StageService,
  //   private utilisateurService: UtilisateurService,
  //   private fileService: FileService){}
  constructor(
    private competencesService: CompetencesService,
    ){}
  
  

  ngOnInit(){
    this.getCompetences();

    // this.currentUser = JSON.parse(localStorage.getItem('currentUser')|| '{}');
    // this.getCurrentUser();
  }

  //create Tuteurs form
  form: any = {
    code:'',
    libelle:'',
    description:'',
    };

  
  //puts the value of the create Prof form in the createdProf variable
  setFormInCreatedCompetences(){
    this.createdCompetences.code = this.form.code;
    this.createdCompetences.libelle = this.form.libelle;
    this.createdCompetences.description = this.form.description;
    }
  
  //====================== create Prof ===================================

  createCompetencesForm(){
  this.setFormInCreatedCompetences();
  console.log("createdCompetences: ", this.createdCompetences);
  this.competencesService.addCompetences(this.createdCompetences).subscribe(
        data => {
          console.log(data);
          window.location.reload();
        },
            error => console.log(error)
  );
}
    
    //test
    // this.ListeStages = [
      /*
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
            id: 2022,
            nbrRecus: 100,
            nbrInscrits: 200,
            dirigeant: null
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
            id: 2021,
            nbrInscrits: 300,
            nbrRecus: 24,
            dirigeant: null
          }
        }
      }
    ];
    this.filteredListeStages = this.ListeStages;
  */
  //============================================== managing variables ==============================================
  
  assignSelectedCompetences(competences: Competences){
    this.selectedCompetences = competences;
  }

  assignEditedCompetences(){
    this.editedCompetences = {...this.selectedCompetences};
  }

  assignDeletedCompetences(){
    this.deletedCompetences = {...this.selectedCompetences};
  }

  //========================== get all Profs ==================================

  public getCompetences(): void{
    this.competencesService.getCompetences().subscribe(
      data => {
       this.ListeCompetences = data;
       this.filteredListeCompetences = [...this.ListeCompetences];
       //console.log(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error)
      }
    );
  }


  //=============== get all étudiants ==============================================

  // public getEtudiants(): void{
  //   this.etudiantService.getEtudiants().subscribe(
  //     data => {
  //      this.ListeEtudiants = data;
  //     },
  //     (error: HttpErrorResponse) => {
  //       console.log(error)
  //     }
  //   );
  // }

  //============================================== get all types ==============================================

  // public getTypes(): void{
  //   this.typeService.getTypes().subscribe(
  //     data => {
  //      this.ListeTypes = data;
  //     },
  //     (error: HttpErrorResponse) => {
  //       console.log(error)
  //     }
  //   );
  //   // console.log("liste des types:", this.ListeTypes);
  // }

  //============================================== get all profs ==============================================

  // public getProfs(): void{
  //   this.profService.getProfs().subscribe(
  //     data => {
  //      this.ListeProfs = data;
  //     },
  //     (error: HttpErrorResponse) => {
  //       console.log(error)
  //     }
  //   );
  // }

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

  //============================================== update Prof ============================================== 
  
  editCompetencesForm(){
    this.competencesService.updateCompetences(this.editedCompetences).subscribe(
      data => {
        console.log(data);
        window.location.reload();
      },
      error => console.log(error)
    );
  }

  //========================== delete Prof ========================================= 

deleteCompetencesForm(){
  this.competencesService.deleteCompetences(this.deletedCompetences.code).subscribe(
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
      this.filteredListeCompetences = this.ListeCompetences;
    } else {
      this.filteredListeCompetences = this.ListeCompetences.filter(competences =>
        this.matchesSearchCriteria(competences, text)
      );
    }
  }
  matchesSearchCriteria(competences: Competences, text: string): boolean {
    const searchFields: (string)[] = [
      competences.code,
      competences.libelle,
      competences.description,
      ];
    //console.log("searchFields.includes('Bob')",searchFields.includes('Bob'));
    //console.log("text a chercher :",text);
    //console.log("searchFields",searchFields );
    //console.log("results: ",searchFields.some(field => field.includes(text.toLowerCase())))
    return searchFields.some(field => field.toLowerCase().includes(text.toLowerCase()));
  }
  resetFilteredList(input: HTMLInputElement) {
    this.filteredListeCompetences = this.ListeCompetences;
    input.value = '';
  }
}


