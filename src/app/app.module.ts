import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

import { AccueilComponent } from './components/accueil/accueil.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { EtudiantsComponent } from './components/etudiants/etudiants.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StagesComponent } from './components/stages/stages.component';
import { CandidatsComponent } from './components/candidats/candidats.component';
import { EtudiantComponent } from './components/etudiant/etudiant.component';
import { MyStageComponent } from './components/my-stage/my-stage.component';
import { InfosComponent } from './components/infos/infos.component';
import { ProfComponent } from './components/prof/prof.component';
import { TuteursComponent } from './components/tuteurs/tuteurs.component';
import { AccessComponent } from './components/access/access.component';
import { RolesComponent } from './components/roles/roles.component';
import { CandidatComponent } from './components/candidat/candidat.component';
import { InfosCandidatComponent } from './components/infos-candidat/infos-candidat.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    LoginComponent,
    RegisterComponent,
    SidebarComponent,
    EtudiantsComponent,
    DashboardComponent,
    StagesComponent,
    CandidatsComponent,
    EtudiantComponent,
    MyStageComponent,
    InfosComponent,
    ProfComponent,
    TuteursComponent,
    AccessComponent,
    RolesComponent,
    ProfComponent,
    CandidatComponent,
    InfosCandidatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
