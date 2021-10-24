import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthguardService } from '../services/auth/authguard.service';

@Injectable({
  providedIn: 'root'
})
export class kysGuard implements CanActivate {
  constructor(private _authservice:AuthguardService,private router:Router){}
  canActivate(): boolean  {
    if (!this._authservice.gettoken()){
      this.router.navigateByUrl("/login")
    }
    return this._authservice.gettoken()
  }
  
}
