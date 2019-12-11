import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserActionRoutingModule } from './user-action-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { PaymentInComponent } from './payment-in/payment-in.component';
import { NgxPayPalModule } from 'ngx-paypal';


@NgModule({
  declarations: [LoginComponent, PaymentInComponent],
  imports: [
    CommonModule,
    FormsModule,
    UserActionRoutingModule,
    NgxPayPalModule
  ]
})
export class UserActionModule { }
