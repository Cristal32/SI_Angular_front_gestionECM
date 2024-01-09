import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Candidat } from 'src/app/models/candidat';
import { Etudiant } from 'src/app/models/etudiant';
import { FileData } from 'src/app/models/fileData';
import { CandidatService } from 'src/app/services/candidat.service';
import { EtudiantService } from 'src/app/services/etudiant.service';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-candidats',
  templateUrl: './candidats.component.html',
  styleUrls: ['./candidats.component.css']
})
export class CandidatsComponent implements OnInit{

  listeCandidats : Candidat[] = [];
  selectedCandidat : Candidat = new Candidat();
  filteredListeCandidats: Candidat[] = [];

  //tabs
  candidat_activeTab: string = 'stagiaire';

  constructor(private candidatService : CandidatService, private fileService : FileService, private etudiantService: EtudiantService){}

  ngOnInit(){
      this.getCandidats();
  }

  //============================================== tabs management ==============================================
  tabBackgroundColor: string = '#f1f1f1';

  setActiveCandidatTab(tab: string){
    this.candidat_activeTab = tab;
  }

  //============================================== get candidats ==============================================

  getCandidats(){
    this.candidatService.getCandidats().subscribe(
      data => {
       this.listeCandidats = data;
       this.filteredListeCandidats = [...this.listeCandidats];
       console.log(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error)
      }
    );
  }

  //============================================== file system ==============================================
   //initialise a file
   fileContent: BlobPart[] = [""];
   fileName = "";
   selectedDossier: File = new File(this.fileContent, this.fileName);

  getFileByFileName(filename: string){
    this.fileService.getFileByFileName(filename).subscribe(
      data => {
        console.log(data);

      },
      (error: HttpErrorResponse) => {
        console.log(error)
      }
    );
  }

  @ViewChild('createDossierInput') createDossierInput!: ElementRef;
  resetSelectedDossier(){
    this.selectedDossier = new File(this.fileContent, this.fileName);
    this.createDossierInput.nativeElement.value = null;
  }

  downloadCandidatFile(candidatFile : FileData){
    if(candidatFile != null){
      let filename : string = candidatFile.fileName;
      console.log(filename);
      this.fileService.downloadFile(filename).subscribe(
        data => {
          console.log(data);
          const blob = new Blob([data], { type: 'application/octet-stream' });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = filename;
          link.click();
          window.URL.revokeObjectURL(url);
        },
        error => console.log(error)
      );
     }
  }

  refuserCandidat(candidat : Candidat){
    candidat.statut = 'Refused';
    this.candidatService.updateCandidat(candidat).subscribe(
      (updatedCandidat) => {
        console.log('Candidat refusé avec succès:', updatedCandidat);
        
        // Remove the refused candidate from the displayed list
        this.listeCandidats = this.listeCandidats.filter(
        (c) => c.email !== updatedCandidat.email
        );

        // Create a copy of the filtered list to update the displayed list
        this.filteredListeCandidats = [...this.listeCandidats];
      },
      (error: HttpErrorResponse) => {
        console.error('Erreur lors du refus du candidat:', error);
        // Handle the error accordingly
      }
    );
    
  }

  validerCandidat(candidat : Candidat){
    candidat.statut = 'Accepted';
    this.candidatService.updateCandidat(candidat).subscribe(
      (updatedCandidat) => {
        console.log('Candidat accepté avec succès:', updatedCandidat);
        
        // Ajout de l'etudiant
        const etudiant : Etudiant = {
          id : 0,
          nom : candidat.nom,
          prenom : candidat.prenom,
          dateNaissance : candidat.dateNaissance,
          sexe : candidat.sexe,
          adrs: '',
          tel: '',
          mention: '',
          promo: null
        };

        this.etudiantService.addEtudiant(etudiant).subscribe(
          (etudiantAjoute) => {
            console.log('Étudiant ajouté avec succès:', etudiantAjoute);
  
            // Remove the accepted candidate from the displayed list
            this.listeCandidats = this.listeCandidats.filter(
              (c) => c.email !== updatedCandidat.email
            );
  
            // Create a copy of the filtered list to update the displayed list
            this.filteredListeCandidats = [...this.listeCandidats];
  
            // You can also update the filtered list or perform other actions here
          },
          (error: HttpErrorResponse) => {
            console.error('Erreur lors de l\'ajout de l\'étudiant:', error);
            // Handle the error accordingly
          }
        );
      },
      (error: HttpErrorResponse) => {
        console.error('Erreur lors du refus du candidat:', error);
        // Handle the error accordingly
      }
    );
  }
}
