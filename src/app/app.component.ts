import { Component} from '@angular/core';
import {Router} from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { Observable } from 'rxjs';
import { Card } from './Models/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CC-Payment';
  cards: Observable<Card[]>;
  show:number;

  constructor(private router: Router, private store: Store<AppState>, private toastr: ToastrService ){
    this.cards = store.select('card');
  }

  showToggle(i){
    if (this.show == i) {
      this.show = -1;
    }
    else {
      this.show = i;
    }
  }

  toaster(){
    this.toastr.success("Payment Processed", "Alert");
  }

  // onMakePayment(){
  //   this.router.navigate(['/payment']);
  // }
}
