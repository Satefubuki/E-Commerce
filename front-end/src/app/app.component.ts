import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'storiesV1U1';
  isLogin = false;
  user: User;
  constructor(private cookieService: CookieService, ) {

  }

  ngOnInit(): void {
    if (this.cookieService.get('userInfo') !== '') {
      this.isLogin = !this.isLogin;
      this.user = JSON.parse(this.cookieService.get('userInfo'));
    }
  }

}
