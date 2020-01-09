import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: string;
  username: string;
  password: string;
  userName: string;

  constructor(private userService: UserService,
    // tslint:disable-next-line:align
    private authService: AuthService,
    // tslint:disable-next-line:align
    private cookieService: CookieService,
    // tslint:disable-next-line:align
    private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.userService.login(this.username, this.password).subscribe(res => {
      if (res.errorCode === 0) {
        this.message = '';
        // save user info, then redirect to dashboard
        this.cookieService.set('userInfo', JSON.stringify(res.data));
        this.cookieService.set('username', res.data.username);
        this.cookieService.set('password', this.password);
        this.cookieService.set('userID', res.data.id.toString());
        this.cookieService.set('token', res.data.token);
        this.userName = this.cookieService.get('userInfo');
        console.log(this.userName);
        this.authService.setLoggedIn(true);
        this.router.navigate(['/stories']).then(() => {
          window.location.reload();
        });
      } else {
        this.message = res.message;
      }
    });
  }

}
