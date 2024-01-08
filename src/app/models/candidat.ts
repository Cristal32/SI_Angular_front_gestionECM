import { FileData } from "./fileData";

export class Candidat {
    email : string = '';
    nom : string = '';
    prenom : string = '';
    dateNaissance: Date = new Date();
    sexe : string = '';
    dossier: FileData | null = null
}