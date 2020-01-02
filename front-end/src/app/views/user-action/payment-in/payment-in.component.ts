import { Component, OnInit } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { PaymentService } from 'src/app/services/payment.service';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/models/user';
import { Payment } from 'src/app/models/payment';

@Component({
  selector: 'app-root',
  templateUrl: './payment-in.component.html',
  styleUrls: ['./payment-in.component.css']
})
export class PaymentInComponent implements OnInit {

  user: User;
  clientId = 'AQdpuflWxkNDF5SkVLBrh8APYw2fGYE0iAuxKIVkaJmABLKmJKw2H1A1LBxxngCaRk_JZQa5UTBVN5f4';
  coin = 0;
  money = 0;
  value = '';

  public payPalConfig?: IPayPalConfig;

  constructor(private paymentService: PaymentService, private cookieService: CookieService) {
    this.user = JSON.parse(this.cookieService.get('userInfo'));
  }

  ngOnInit(): void {
    this.initConfig();
  }

  convert() {
    this.money = this.coin / 50;
    this.value = Number(this.money).toString();
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: this.clientId,
      // tslint:disable-next-line: no-angle-bracket-type-assertion
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: this.value,
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: this.value
                }
              }
            },
            items: [
              {
                name: 'Enterprise Subscription',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'USD',
                  value: this.value,
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
          // luu vao database
          const payment = {
            userid: this.user.id,
            coin: this.coin,
            payerEmail: details.payer.email_address,
            payValue: this.value + ' USD',
            payDate: details.create_time,
            payStatus: false
          };

          this.paymentService.save(payment as Payment).subscribe(type2 => {
            console.log(JSON.stringify(type2));
          });
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        // this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }
}
