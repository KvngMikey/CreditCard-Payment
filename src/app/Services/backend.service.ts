import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { Card } from '../Models/user.model';



@Injectable()
export class BackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body} = request;


        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/cards/payment') && method === 'POST':
                    return paycard();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

        // route functions

        function paycard() {
          const card = body;
            return ok({
                CreditCardNumber: card.CreditCardNumber ,
                CardHolder: card.CardHolder,
                ExpirationDate: card.ExpirationDate,
                SecurityCode: card.SecurityCode,
                Amount: card.Amount,
                status: "Success",
                message: "Payment Processed"
            })
        }


        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }
}

export const BackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: BackendInterceptor,
    multi: true
};
