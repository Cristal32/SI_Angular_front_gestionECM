import { HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Candidat } from 'src/app/models/candidats';
import { CandidatService } from 'src/app/services/candidats.service';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  listeCandidats : Candidat[] = [];
  createdCandidat : Candidat = new Candidat();
  selectedCandidat: Candidat = new Candidat();

  //create candidat form
  form: any = {
    nom: '',
    prenom: '',
    email: '',
    sexe : '',
    dateNaissance : null,
    dossier: null
  };

  //tabs
  createCandidatModal_ActiveTab: string = 'personalInfoTab';

  constructor(
    private candidatService: CandidatService,
    private fileService: FileService){}

    ngOnInit(){
    }

    setFormInCreatedCandidat(){
      this.createdCandidat.email = this.form.email;
      this.createdCandidat.nom = this.form.nom;
      this.createdCandidat.prenom = this.form.prenom;
      this.createdCandidat.sexe = this.form.sexe;
      this.createdCandidat.dateNaissance = this.form.dateNaissance;
    }

  //============================================== tabs management ==============================================
  tabBackgroundColor: string = '#f1f1f1';

  setActiveCreateTab(tab: string){
    this.createCandidatModal_ActiveTab = tab;
  }

  assignSelectedCandidat(candidat : Candidat){
    this.selectedCandidat = candidat;
    console.log(this.selectedCandidat);
  }

  //============================================== file system ==============================================
   //initialise a file
   fileContent: BlobPart[] = [""];
   fileName = "";
   selectedDossier: File = new File(this.fileContent, this.fileName);

  onCreateDossierSelected(event: any) {
    this.selectedDossier = event.target.files[0];
  }

  @ViewChild('createDossierInput') createDossierInput!: ElementRef;
  resetSelectedDossier(){
    this.selectedDossier = new File(this.fileContent, this.fileName);
    this.createDossierInput.nativeElement.value = null;
  }

  // ---------------------------------------------------------------------------------
  uploadFile() {
    const formData = new FormData();
    formData.append('file', this.selectedDossier);
    console.log(this.selectedDossier.name); 
    console.log(this.selectedDossier.type); 
    console.log(this.selectedDossier.size);
    this.fileService.uploadFile(formData).subscribe(
      data => {
        console.log(data);
      },
      error => console.log(error)
    );
  }

  //============================================== create candidat ==============================================

  createCandidatForm(){
    this.setFormInCreatedCandidat();
    this.candidatService.addCandidatWithDossier(this.createdCandidat, this.selectedDossier).subscribe(
      data => {
        console.log(data);
        window.location.reload();
      },
      error => console.log(error)
    );
  }
}
