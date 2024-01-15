import { Candidat } from "./candidat";
import { Etudiant } from "./etudiant";
import { Role } from "./role";

export class Utilisateur{
    id: number = 0;
    password: string = '';
    username : string = '';
    etudiant: Etudiant | null;
    candidat: Candidat | null;
    role: Role = new Role();

    constructor() {
        this.etudiant = null;  // Initialisez à null dans le constructeur
        this.candidat = null;
    }
}