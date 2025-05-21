import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService {

  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService,

  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const isLoggedIn = !!this.tokenStorageService.getToken();

    if (isLoggedIn) {
      // authorised so return true
      return true;
    } else {
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/admin-login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }
}
