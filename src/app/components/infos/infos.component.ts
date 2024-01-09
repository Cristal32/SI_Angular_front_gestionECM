import { Component, OnInit } from '@angular/core';
import { Etudiant } from 'src/app/models/etudiant';
import { EtudiantService } from 'src/app/services/etudiant.service';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.css']
})
export class InfosComponent implements OnInit{

  selectedEtudiant: Etudiant = new Etudiant();
  editedEtudiant: Etudiant = new Etudiant();

  constructor(
    private etudiantService: EtudiantService){}

  ngOnInit(){
    this.getEtudiantById();
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

  // get etudiant by id

  getEtudiantById() {
    const etudiantIdToFind = 1; // L'ID de l'étudiant que vous souhaitez trouver

    this.etudiantService.getEtudiantById(etudiantIdToFind).subscribe(
      (etudiant: Etudiant) => {
        this.selectedEtudiant = etudiant;
        console.log('Etudiant recupere avec succes');
      },
      (erreur) => {
        console.error('Erreur lors de la récupération de l\'étudiant : ', erreur);
      }
    );
  }
}
