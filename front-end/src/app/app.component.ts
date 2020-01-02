import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal/public_api';
import { User } from './models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PnotifyService } from './utils/pnotify.service';
import { UserService } from './services/user.service';
import { MustMatch } from './models/MustMatch';


@Component({
  selector: 'app-root,ngbd-dropdown-basic',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('registerModal', { static: false }) registerModal: ModalDirective;
  title = 'storiesV1U1';
  userName: string;
  userid: string;
  show: boolean;

  user: User = {} as User;

  registerForm: FormGroup;
  submitted = false;
  constructor(
    private cookieService: CookieService,
    private authService: AuthService,
    private router: Router,
    private pnotify: PnotifyService,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.registerForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]

    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
   }

  ngOnInit(): void {
    if (this.authService.isLoggedIn === true) {
      this.userName = this.cookieService.get('username');
      this.userid = this.cookieService.get('userID');
      this.show = true;
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  logout(): void {
    this.authService.setLoggedIn(false);
    this.cookieService.deleteAll('/');
    this.show = false;
    this.router.navigate(['/']);
  }

   // modals
   hideModal() {
    this.registerModal.hide();
  }

  // show modal
  openAdd() {
    this.registerModal.show();
  }

  save() {
    this.userService.post(this.user).subscribe(res => {
      if(res.errorCode == 0) {
        this.user = {} as User;
        this.pnotify.success('Register', 'Sucessfully!');
      } else {
        this.pnotify.error('Register', 'Failed');
      }
    }, err => {
      this.pnotify.error('Register', err);
    });
    this.hideModal();
  }

}