import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { LoginService } from 'src/app/core/services/login/login.service';
import { SharedService } from 'src/app/core/services/shared/shared.service';
import {AuthguardService} from 'src/app/core/services/auth/authguard.service'
/** Error when invalid control is dirty, touched, or submitted. */

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _loader: LoaderService,
    private _service: LoginService,
    private _message: MessageService,
    private _shared: SharedService,
    private _authservice:AuthguardService
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  /****************************************
   * login
   * @purpose: this is used to  login
   ****************************************/
  login() {
    this._loader.show();
    const reqData = {
      email: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };
    this._service.login(reqData).subscribe((res) => {
      localStorage.setItem('userID', res.userId);
      localStorage.setItem('token', res.token);
      this._router.navigate(['app/dashboard']);
      this._loader.hide();
    });
  }
}
