import { Promo } from "./promo";

export class Etudiant{
    nom: string = '';
    prenom: string = '';
    adrs: string = '';
    dateNaissance: Date = new Date();
    sexe: string = '';
    tel: string = '';
    mention: string = '';
    promo: Promo | null = null
}