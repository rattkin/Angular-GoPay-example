import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { SubSink } from 'subsink';
import { GoPayPaymentEndpoint, GoPayStatusEndpoint } from './config';

// talk to GoPay script in index.html
// eslint-disable-next-line no-var
declare var _gopay: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnDestroy {

  constructor(private http: HttpClient) { }

  title = 'Angular-GoPay-example';
  public model = { amount: 1 };

  // SubSink library for clean unsubscribe 
  private subs = new SubSink()

  pay(): void {
    this.subs.sink = this.http.get(GoPayPaymentEndpoint + '?method=pay&amount=' + this.model.amount)
      .subscribe(res => {
        if (res && typeof res === 'string') {
          console.log('Opening gateway with URL', res);
          this.showGateway(res);
        }
      });
  }

  showGateway(gatewayUrl: string): void {
    if (gatewayUrl) {
      _gopay.checkout({ gatewayUrl: gatewayUrl, inline: false });
    } else {
      console.log('No gateway URL!');
    }
  }

  checkPaymentStatus(paymentId: string): void {
    this.subs.sink = this.http.get(GoPayStatusEndpoint + paymentId)
      .subscribe(res => {
        // const paymentState = res.state;
        // const gatewayUrl = res.gw_url;

        // if (this.paymentState !== 'PAID') {
        //     setTimeout(() => {
        //         this.checkPaymentStatus(res.id + '');
        //     }, 2000);
        // }
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
