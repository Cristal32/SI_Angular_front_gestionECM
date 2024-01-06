import { Etudiant } from "./etudiant";
import { Promo } from "./promo";
import { Entreprise } from "./entreprise";
import { Prof } from "./prof";
import { Type } from "./type";
import { Tuteur } from "./tuteur";

export class Stage{
    id: number = 0;
    annee_stage: number = 0;
    compte_rendu: string='';
    etudiant: Etudiant = new Etudiant();
    tel: string = '';
    entreprise: Entreprise = new Entreprise();
    prof: Prof = new Prof();
    type: Type = new Type();
    tuteur: Tuteur = new Tuteur();
    statut_stage: string = '';

}