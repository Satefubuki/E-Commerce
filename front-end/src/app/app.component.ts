import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
<<<<<<< HEAD
import { User } from './models/user';
=======
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

>>>>>>> 4b35570133f25e3c5dcb2a5a500b2a564e985412

@Component({
  selector: 'app-root,ngbd-dropdown-basic',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
<<<<<<< HEAD
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

=======
export class AppComponent implements OnInit{
  userName: string;
  userid: string;
  show: boolean;
  constructor(
    private cookieService: CookieService,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
   if(this.authService.isLoggedIn === true){
      this.userName = this.cookieService.get('username');
      this.userid = this.cookieService.get('userID');
      console.log(this.cookieService.get('username'));
      
      this.show = true;
   }
  }
  title = 'storiesV1U1';

  logout(): void{
    this.authService.setLoggedIn(false);
    this.cookieService.deleteAll('/');
    this.show = false;
    this.router.navigate(['/']);
>>>>>>> 4b35570133f25e3c5dcb2a5a500b2a564e985412
}

}