import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { reducer } from './Reducers/cards.reducers';
import { AppComponent } from './app.component';
import { CardPaymentComponent } from './card-payment/card-payment.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CardsService } from './Services/cards.service';
import { BackendProvider } from './Services/backend.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    CardPaymentComponent
  ],
  imports: [
  BrowserModule,
  BrowserAnimationsModule,
  StoreModule.forRoot({
    card: reducer
  }),
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    CardsService,
    BackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
