import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CardsService } from '../Services/cards.service';
import { Observable, throwError } from 'rxjs';
import { Card } from './../Models/user.model';
import { Store, Action } from '@ngrx/store';
import { AppState } from './../app.state';
import * as CardActions from './../Actions/cards.actions';

@Component({
  selector: 'app-card-payment',
  templateUrl: './card-payment.component.html',
  styleUrls: ['./card-payment.component.css']
})
export class CardPaymentComponent implements OnInit {
  paymentForm: FormGroup;
  errorMessage: string;
  cards: Observable<Card[]>;
  card: Card;

  constructor(private toastr: ToastrService, private paymentService: CardsService, private store: Store<AppState>) {
    this.cards = store.select('card');
  }



  ngOnInit(): void {
    this.errorMessage = "Please fill all fields";
    this.initForm();
  }

  onSubmit(){
    this.card = this.paymentForm.value;
    this.card.ExpirationDate = new Date(this.paymentForm.get("ExpirationDate").value);
    this.toastr.success("Payment Processed", "Alert");
    this.store.dispatch(new CardActions.AddCard(this.card) );
    this.paymentService.makePayment(this.paymentForm.value).subscribe(response => {
      console.log(response);
    });
   this.paymentForm.reset();
  }

  // Initialize and validate the form

  private initForm(){
    let CreditCardNumber = '';
    let CardHolder = '';
    let ExpirationDate = '';
    let SecurityCode = '';
    let Amount = '';

    this.paymentForm = new FormGroup({
      'CreditCardNumber': new FormControl(CreditCardNumber,  [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/), Validators.minLength(16),Validators.maxLength(16),Validators.min(1111111111111111),Validators.max(9999999999999999)]),
      'CardHolder': new FormControl(CardHolder, [Validators.required,Validators.minLength(1),Validators.pattern('^[A-Za-z][A-Za-z -]*$')]),
      'ExpirationDate': new FormControl(ExpirationDate, Validators.required),
      'SecurityCode': new FormControl(SecurityCode, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/), Validators.minLength(3),Validators.maxLength(3),Validators.min(111),Validators.max(999)]),
      'Amount': new FormControl(Amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    });
  }

  // Access the controls in the form
  get formControls() { return this.paymentForm.controls; }


}
