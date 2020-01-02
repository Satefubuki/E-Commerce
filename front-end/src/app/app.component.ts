import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root,ngbd-dropdown-basic',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'storiesV1U1';
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
      this.show = true;
   }
  }
  

  logout(): void{
    this.authService.setLoggedIn(false);
    this.cookieService.deleteAll('/');
    this.show = false;
    this.router.navigate(['/']);
}

}