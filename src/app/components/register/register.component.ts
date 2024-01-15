import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Candidat } from 'src/app/models/candidat';
import { Etudiant } from 'src/app/models/etudiant';
import { Promo } from 'src/app/models/promo';
import { Role } from 'src/app/models/role';
import { Utilisateur } from 'src/app/models/utilisateur';
import { CandidatService } from 'src/app/services/candidat.service';
import { FileService } from 'src/app/services/file.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

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
    dossier: null,
    promo: new Promo(),
    password : ''
  };

  //tabs
  createCandidatModal_ActiveTab: string = 'personalInfoTab';

  constructor(
    private candidatService: CandidatService,
    private fileService: FileService, 
    private utilisateurService: UtilisateurService){}

    ngOnInit(){
    }

    setFormInCreatedCandidat(){
      this.createdCandidat.email = this.form.email;
      this.createdCandidat.nom = this.form.nom;
      this.createdCandidat.prenom = this.form.prenom;
      this.createdCandidat.sexe = this.form.sexe;
      this.createdCandidat.dateNaissance = this.form.dateNaissance;
      this.createdCandidat.promo.annee = new Date().getFullYear();
      this.createdCandidat.password = this.form.password;
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
        this.ajouterUser(this.createdCandidat);
        window.location.reload();
      },
      error => console.log(error)
    );
  }

  ajouterUser(candidat: Candidat) {
    // Ajout de l'utilisateur
    const utilisateur: Utilisateur = {
        id: 0,
        username: candidat.email,
        password: candidat.password,  // Vous pouvez définir un mot de passe par défaut ou générer un mot de passe aléatoire
        role: { "id": 3,
                "libelle": "candidat",
                "accesses": [
                    {
                      "authority": "MANAGE_CANDIDAT",
                      "accessLibelle": "Espace candidat",
                      "accessId": 153
                    } 
                ]
        }, 
        etudiant : null,
        candidat : candidat
    };

    this.utilisateurService.addUtilisateur(utilisateur).subscribe(
        (utilisateurAjoute) => {
            console.log('Utilisateur ajouté avec succès:', utilisateurAjoute);

            // Retirez le candidat inscrit de la liste affichée
            this.listeCandidats = this.listeCandidats.filter(
                (c) => c.email !== candidat.email
            );

            // Créez une copie de la liste filtrée pour mettre à jour la liste affichée
            this.listeCandidats = [...this.listeCandidats];

            // Vous pouvez également mettre à jour la liste filtrée ou effectuer d'autres actions ici
        },
        (error: HttpErrorResponse) => {
            console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
            // Gérez l'erreur en conséquence
        }
    );
}
}

