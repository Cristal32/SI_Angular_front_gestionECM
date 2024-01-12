import { FileData } from "./fileData";
import { Promo } from "./promo";

export class Candidat {
    email : string = '';
    nom : string = '';
    prenom : string = '';
    dateNaissance: Date = new Date();
    sexe : string = '';
    statut : string = '';
    dossier: FileData | null = null;
    promo: Promo = new Promo()
}