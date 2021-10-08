import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { LoginService } from 'src/app/core/services/login/login.service';
import { LoginRequestI, LoginRequest } from 'src/app/model/login-req';

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
    private _service: LoginService
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  /********************************
   * login
   * @param No
   * @purpose : this is used to validate user
   *******************************/
  login() {
    this._loader.show();
    let reqData : LoginRequestI = new LoginRequest();
    reqData.email = this.loginForm.value.username;
    reqData.password = this.loginForm.value.password
    this._service.login(reqData).subscribe((res) => {
      localStorage.setItem('userID', res.userId);
      localStorage.setItem('token', res.token);
      this._router.navigate(['app/dashboard']);
      this._loader.hide();
    });
  }
}
