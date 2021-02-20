import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {CardPaymentComponent} from './card-payment/card-payment.component';

const appRoutes: Routes = [
	{path: 'app', component: AppComponent},
	{path: 'payment', component: CardPaymentComponent}
]

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})

export class AppRoutingModule {}