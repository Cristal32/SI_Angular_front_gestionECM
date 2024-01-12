import { Directive, ElementRef, Input } from '@angular/core';
import { AuthService } from './auth.service';

@Directive({
  selector: '[hasAnyAuthority]'
})
export class HasAnyAuthorityDirective {

  constructor(private element: ElementRef, private authService: AuthService) { }

  @Input()
  // set hasAnyAuthority(authorities: string) {
  //   console.log("has any authority directive works");
  //   console.log(authorities);
  //   const hasAuthority = this.authService.hasAnyAuthority(authorities);
  //   console.log(hasAuthority);
  //     if(!hasAuthority){
  //       this.element.nativeElement.remove();
  //     }
  // }

  set hasAnyAuthority(authorities: string) {
    // console.log("has any authority directive works");
    // console.log(authorities);
    this.authService.hasAnyAuthority(authorities)
      .then((hasAuthority) => {
        //console.log(hasAuthority);
        if (!hasAuthority) {
          this.element.nativeElement.remove();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }


}