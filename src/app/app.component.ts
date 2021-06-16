import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'Angular-GoPay-example';
    public model = { amount: 1 };

    pay(): void {
        console.log(this.model.amount);
    }

}
