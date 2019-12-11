import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
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
        this.cookieService.set('token', res.data.token);
        this.authService.setLoggedIn(true);
        this.router.navigate(['/list', res.data.id]);
      } else {
        this.message = res.message;
      }
    });
  }

}
