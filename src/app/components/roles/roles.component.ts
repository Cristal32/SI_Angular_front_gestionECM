import { Component, OnInit } from '@angular/core';
import { Access } from 'src/app/models/access';
import { Role } from 'src/app/models/role';
import { AccessService } from 'src/app/services/access.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit{
  constructor(private roleService: RoleService, private accessService: AccessService){}

  listeRoles: Role[] = [];
  filteredListeRoles: Role[] = [];
  createdRole: Role = new Role();
  selectedRole: Role = new Role();
  editedRole: Role = new Role();
  deletedRole: Role = new Role();

  listAccesses: Access[] = [];
  
  ngOnInit(): void{
    this.getAllRoles();
    this.getAllAccesses();
  }
  //============================================== get all roles ==============================================
  getAllRoles(){
    this.roleService.getRoles().subscribe(
      ((roles: any) => {
        this.listeRoles = roles;
        this.filteredListeRoles = [...this.listeRoles];
    }));
  }
  getAllAccesses(){
    this.accessService.getAccesses().subscribe(((accesses: any) => {
      this.listAccesses = accesses;
    }));
  }
  //============================================== variable management ==============================================
  assignSelectedRole(role: Role){
    this.selectedRole = role;
  }
  assignEditedRole(){
    this.editedRole = {...this.selectedRole};
  }
  assignDeletedRole(){
    this.deletedRole = {...this.selectedRole};
  }
  //============================================== create role ==============================================
  createRoleForm(){
    this.roleService.addRole(this.createdRole).subscribe(
      data => {
        //console.log(data);
        window.location.reload();
      },
      error => console.log(error)
    );
  }
  //============================================== edit role ==============================================
  editRoleForm(){
    this.roleService.updateRole(this.editedRole).subscribe(
      data => {
        //console.log(data);
        window.location.reload();
      },
      error => console.log(error)
    );
  }
  removeAccess(authority: string){
    for(let i = 0; i < this.editedRole.accesses.length; i++){
      if(this.editedRole.accesses[i].authority == authority){
        this.editedRole.accesses.splice(i,1);
        break;
      }
    }
  }
  resetToDefaultAccessValue(){
    this.editedRole.accesses = [...this.selectedRole.accesses];
  }
  //============================================== delete role ==============================================
  deleteRoleForm(){
    this.roleService.deleteRole(this.deletedRole.id).subscribe(
      data => {
        //console.log(data);
        window.location.reload();
      },
      error => console.log(error)
    );
  }
  //============================================== search bar ==============================================
  filterResults(text: string) {
    //console.log('filterResults() works');
    if (!text) {
      this.filteredListeRoles = this.listeRoles;
    } else {
      this.filteredListeRoles = this.listeRoles.filter(role =>
        this.matchesSearchCriteria(role, text)
      );
    }
  }
  matchesSearchCriteria(role: Role, text: string): boolean {
    const searchFields: string[] = [
      role?.libelle.toLowerCase(),
    ];
    return searchFields.some(field => field.includes(text.toLowerCase()));
  }
  resetFilteredList(input: HTMLInputElement) {
    this.filteredListeRoles = this.listeRoles;
    input.value = '';
  }
}
