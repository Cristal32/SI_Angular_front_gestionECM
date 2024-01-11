import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Etudiant } from 'src/app/models/etudiant';
import { EtudiantService } from 'src/app/services/etudiant.service';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.css']
})
export class InfosComponent implements OnInit{

  // ListeEtudiants: Etudiant[] = [];
  // filteredListeEtudiants: Etudiant[] = [];
  etudiant:Etudiant=new Etudiant();
  selectedEtudiant: Etudiant = new Etudiant();
  editedEtudiant: Etudiant = new Etudiant();

  constructor(
    private etudiantService: EtudiantService){}

  ngOnInit(){
    this.getEtudiantById();
    // this.getEtudiants();
  }


  //============================================== managing variables ==============================================

  assignSelectedEtudiant(etudiant: Etudiant){
    this.selectedEtudiant = etudiant;
  }

  assignEditedEtudiant(){
    this.editedEtudiant = {...this.selectedEtudiant};
    console.log(this.editedEtudiant)
  }

  //============================================== get all etudiants ==============================================

  // public getEtudiants(): void{
  //   this.etudiantService.getEtudiants().subscribe(
  //     data => {
  //      this.ListeEtudiants = data;
  //      this.filteredListeEtudiants = [...this.ListeEtudiants];
  //      //console.log(data);
  //     },
  //     (error: HttpErrorResponse) => {
  //       console.log(error)
  //     }
  //   );
  // }

  //============================================== update etudiant ============================================== 
  
  editEtudiantForm(){
    // console.log("this.editedEtudiant: ",this.editedEtudiant)
    this.etudiantService.updateEtudiant(this.editedEtudiant).subscribe(
      data => {
        console.log(data);
        window.location.reload();
      },
      error => console.log(error)
    );
  }

  // get etudiant by id

  getEtudiantById() {
    const etudiantIdToFind = 1; // L'ID de l'étudiant que vous souhaitez trouver

    this.etudiantService.getEtudiantById(etudiantIdToFind).subscribe(
      (etudiant: Etudiant) => {
        this.etudiant=etudiant;
        this.selectedEtudiant = etudiant;
        this.editedEtudiant = this.selectedEtudiant;
        console.log(this.selectedEtudiant);
      },
      (erreur) => {
        console.error('Erreur lors de la récupération de l\'étudiant : ', erreur);
      }
    );
  }
}