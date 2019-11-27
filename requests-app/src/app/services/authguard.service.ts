import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { take, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(
    private fireAuth: AngularFireAuth,
    private route: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){ 
    return this.fireAuth.authState.pipe(
      take(1),
      map(user => !!user),
      tap( loggedIn => {
        if( !loggedIn){
          this.route.navigate(['/login']);
        }
      })
    )
  }
}
