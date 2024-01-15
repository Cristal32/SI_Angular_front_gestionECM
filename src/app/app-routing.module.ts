import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { AccueilComponent } from './components/accueil/accueil.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EtudiantsComponent } from './components/etudiants/etudiants.component';
import { StagesComponent } from './components/stages/stages.component';
import { CandidatsComponent } from './components/candidats/candidats.component';
import { EtudiantComponent } from './components/etudiant/etudiant.component';
import { MyStageComponent } from './components/my-stage/my-stage.component';
import { InfosComponent } from './components/infos/infos.component';
import { TuteursComponent } from './components/tuteurs/tuteurs.component';
import { AccessComponent } from './components/access/access.component';
import { RolesComponent } from './components/roles/roles.component';
import { ProfComponent } from './components/prof/prof.component';
import { CandidatComponent } from './components/candidat/candidat.component';
import { InfosCandidatComponent } from './components/infos-candidat/infos-candidat.component';
import { CompetencesComponent } from './components/competences/competences.component';

const routes: Routes = [
  {path:'', redirectTo: 'accueil', pathMatch: 'full'},
  {
    path:'accueil', 
    component: AccueilComponent
  },
  {
    path:'login', 
    component: LoginComponent
  },
  {path:'register', component: RegisterComponent},
  {
    path:'candidat', 
    component: CandidatComponent,
    children:[
      {path:'infos_candidats', component: InfosCandidatComponent}
    ]
  },
  {
    path:'etudiant', 
    component: EtudiantComponent,
    children:[
      {path:'my-stage', component: MyStageComponent},
      {path:'infos', component: InfosComponent}
    ]
  },
  {
    path:'dashboard', 
    component: DashboardComponent,
    children:[
      {path:'etudiants', component: EtudiantsComponent},
      {path:'stages', component: StagesComponent},
      {path:'candidats', component: CandidatsComponent},
      {path:'profs', component: ProfComponent},
      {path:'tuteurs', component: TuteursComponent},
      {path:'accesses', component: AccessComponent},
      {path:'roles', component: RolesComponent},
      {path:'competences', component: CompetencesComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }