import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppGuard } from 'src/app/app.guard';
import { PaymentInComponent } from './payment-in/payment-in.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'user/payment', canActivate: [AppGuard], component: PaymentInComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserActionRoutingModule { }
