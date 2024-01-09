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

const routes: Routes = [
  {path:'', redirectTo: 'accueil', pathMatch: 'full'},
  {path:'accueil', component: AccueilComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'etudiant', component: EtudiantComponent},
  {
    path:'dashboard', 
    component: DashboardComponent,
    children:[
      {path:'etudiants', component: EtudiantsComponent},
      {path:'stages', component: StagesComponent},
      {path:'candidats', component: CandidatsComponent}
    ]
  },
  {
    path:'etudiant', 
    component: EtudiantComponent,
    children:[
      {path:'my-stage', component: MyStageComponent},
      {path:'infos', component: InfosComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }