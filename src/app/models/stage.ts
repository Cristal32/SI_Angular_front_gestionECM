import { Entreprise } from "./entreprise";
import { Etudiant } from "./etudiant";
import { Prof } from "./prof";
import { Tuteur } from "./tuteur";
import { TypeStage } from "./type";

export class Stage{
    id: number = 0;
    annee: number = 0;
    etudiant: Etudiant = new Etudiant();
    prof : Prof = new Prof();
    entreprise : Entreprise = new Entreprise();
    tuteur : Tuteur = new Tuteur();
    type : TypeStage = new TypeStage();
    statut : string = '';
    compte_rendu : string = ''
}