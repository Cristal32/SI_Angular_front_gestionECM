import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { AccueilComponent } from './components/accueil/accueil.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EtudiantsComponent } from './components/etudiants/etudiants.component';
import { StagesComponent } from './components/stages/stages.component';
import { EntrepriseComponent } from './components/entreprise/entreprise.component';
import { TuteurComponent } from './components/tuteur/tuteur.component';
import { ProfComponent } from './components/prof/prof.component';
import { EtudiantComponent } from './components/etudiant/etudiant.component';
import { MyStageComponent } from './components/my-stage/my-stage.component';
import { InfosComponent } from './components/infos/infos.component';
import { CandidatsComponent } from './components/candidats/candidats.component';

const routes: Routes = [
  {path:'', redirectTo: 'accueil', pathMatch: 'full'},
  {path:'accueil', component: AccueilComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'etudiant', 
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
      {path: '', redirectTo: 'stages', pathMatch: 'full'},
      {path:'etudiants', component: EtudiantsComponent},
      {path:'stages', component: StagesComponent},
      {path:'entreprises', component: EntrepriseComponent},
      {path:'tuteurs', component: TuteurComponent},
      {path:'profs', component: ProfComponent},
      {path:'candidat', component: CandidatsComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }