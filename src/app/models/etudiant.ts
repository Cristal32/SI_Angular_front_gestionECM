import { Promo } from "./promo";

export class Etudiant{
    id : number = 0;
    nom: string = '';
    prenom: string = '';
    adrs: string = '';
    dateNaissance: Date = new Date();
    sexe: string = '';
    tel: string = '';
    mention: string = '';
    promo: Promo | null = null
}