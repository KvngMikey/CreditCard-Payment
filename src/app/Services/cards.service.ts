import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card } from './../Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(private http: HttpClient) { }


  makePayment(card: Card){
    return this.http.post<any>('/cards/payment', card)
  }
}
