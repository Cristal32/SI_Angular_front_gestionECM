import { Candidat } from "./candidat";
import { Etudiant } from "./etudiant";
import { Role } from "./role";

export class Utilisateur{
    id: number = 0;
    password: string = '';
    username : string = '';
    etudiant: Etudiant = new Etudiant();
    candidat: Candidat = new Candidat();
    userRoles: Role[] = []
}