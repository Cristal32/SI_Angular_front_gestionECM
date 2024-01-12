import { Access } from "./access";

export class Role{
    id: number = 0;
    libelle: string = '';
    accesses: Access[] = [];
}