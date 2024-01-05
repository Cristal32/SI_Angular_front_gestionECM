import { Etudiant } from "./etudiant";
import { Promo } from "./promo";

export class Stage{
    id: number = 0;
    promo: Promo = new Promo();
    etudiant: Etudiant = new Etudiant();
}