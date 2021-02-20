import { Action } from '@ngrx/store';
import * as CardActions from 'src/app/Actions/cards.actions';
import { Card } from '../Models/user.model';

const initialState: Card = {
Amount: 7800,
CardHolder: "Wesley Snipes",
CreditCardNumber: "10000000000000000",
ExpirationDate: new Date("2021-02-25"),
SecurityCode: "879"
}

export function reducer(state: Card[]=[initialState], action: CardActions.Actions) {

    // Section 3
    switch(action.type) {
        case CardActions.ADD_CARD:
            return [...state, action.payload];
        default:
            return state;
    }
}
