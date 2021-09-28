import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthguardService } from '../services/auth/authguard.service';

@Injectable({
  providedIn: 'root'
})
export class KysGuard implements CanActivate {
  constructor(private _authservice:AuthguardService,private router:Router){}
  canActivate(): boolean  {
    if (!this._authservice.gettoken()){
      this.router.navigateByUrl("/login")
    }
    return this._authservice.gettoken()
  }
  
}
