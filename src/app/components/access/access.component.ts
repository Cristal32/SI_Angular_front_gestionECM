import { Component } from '@angular/core';
import { Access } from 'src/app/models/access';
import { AccessService } from 'src/app/services/access.service';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css']
})
export class AccessComponent {
  constructor(private accessService: AccessService){}

  listeAccesses: Access[] = [];
  filteredListeAccesses: Access[] = [];
  createdAccess: Access = new Access();
  selectedAccess: Access = new Access();
  editedAccess: Access = new Access();
  deletedAccess: Access = new Access();
  
  ngOnInit(): void{
    this.getAllAccesses();
  }

  //============================================== get all roles ==============================================
  getAllAccesses(){
    this.accessService.getAccesses().subscribe(
      ((accesses: any) => {
        this.listeAccesses = accesses;
        this.filteredListeAccesses = [...this.listeAccesses];
    }));
  }
  //============================================== variable management ==============================================
  assignSelectedAccess(access: Access){
    this.selectedAccess = access;
  }
  assignEditedAccess(){
    this.editedAccess = {...this.selectedAccess};
  }
  assignDeletedAccess(){
    this.deletedAccess = {...this.selectedAccess};
  }
  //============================================== create role ==============================================
  createAccessForm(){
    this.accessService.addAccess(this.createdAccess).subscribe(
      data => {
        console.log(data);
        window.location.reload();
      },
      error => console.log(error)
    );
  }
  //============================================== edit role ==============================================
  editAccessForm(){
    this.accessService.updateAccess(this.editedAccess).subscribe(
      data => {
        console.log(data);
        window.location.reload();
      },
      error => console.log(error)
    );
  }
  //============================================== delete role ==============================================
  deleteAccessForm(){
    this.accessService.deleteAccess(this.deletedAccess.accessId).subscribe(
      data => {
        console.log(data);
        window.location.reload();
      },
      error => console.log(error)
    );
  }
  //============================================== search bar ==============================================
  filterResults(text: string) {
    if (!text) {
      this.filteredListeAccesses = this.listeAccesses;
    } else {
      this.filteredListeAccesses = this.listeAccesses.filter(access =>
        this.matchesSearchCriteria(access, text)
      );
    }
  }
  matchesSearchCriteria(access: Access, text: string): boolean {
    const searchFields: string[] = [
      access?.accessLibelle.toLowerCase(),
    ];
    return searchFields.some(field => field.includes(text.toLowerCase()));
  }
  resetFilteredList(input: HTMLInputElement) {
    this.filteredListeAccesses = this.listeAccesses;
    input.value = '';
  }
}
