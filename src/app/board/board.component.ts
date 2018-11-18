import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Card } from './models/card';
import { BoardState } from './store/board.state';
import { selectAllCards, selecteDealedCard, selectTotalCards } from './store/board.selectors';
import { ShuffleDeckRequest, GenerateDeckRequest, DealOneCard } from './store/board.actions';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  public cards$: Observable<Card[]>;
  public dealedCard$: Observable<Card>;
  public cannotDealOneCard$: Observable<boolean>;

  constructor(private _store: Store<BoardState>) {}

  public ngOnInit() {
    this.cards$ = this._store.pipe(select(selectAllCards));
    this.dealedCard$ = this._store.pipe(select(selecteDealedCard));
    this.cannotDealOneCard$ = this._store.pipe(
      select(selectTotalCards),
      map(total => total <= 0)
    );

    this._store.dispatch(new GenerateDeckRequest());
  }

  public shuffleDeck() {
    this._store.dispatch(new ShuffleDeckRequest());
  }

  public dealOneCard() {
    this._store.dispatch(new DealOneCard());
  }
}
