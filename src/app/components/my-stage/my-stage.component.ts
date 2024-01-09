import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Etudiant } from 'src/app/models/etudiant';
import { Stage } from 'src/app/models/stage';
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

  constructor(private stageService: StageService) {}

  ngOnInit(){
    this.getEtudiantStages(8);
  }

  //============================================== get all stages ==============================================

  public getEtudiantStages(etudiantId: number): void{
    this.stageService.getStages().subscribe(
      data => {
       this.ListeStages = data;
       this.filteredListeStages = this.ListeStages.filter(stage => stage.etudiant.id === etudiantId);
       //console.log(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error)
      }
    );
  }
}
