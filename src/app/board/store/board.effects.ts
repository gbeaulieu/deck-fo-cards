import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

import {
    BoardActions,
    BoardActionType,
    GenerateDeckRequest,
    GenerateDeckComplete,
    ShuffleDeckComplete
} from './board.actions';
import { select, Store } from '@ngrx/store';

import { BoardService } from '../services/board.service';
import { BoardState } from './board.state';
import { selectAllCards } from './board.selectors';


@Injectable()
export class BoardEffects {
    @Effect()
    public generateDeck$: Observable<BoardActions> = this._actions
    .pipe(
        ofType(BoardActionType.GenerateDeckRequest),
        map((action: GenerateDeckRequest) => {
            const deck = this._boardService.generateDeck();
            return new GenerateDeckComplete(deck);
        })
    );

    @Effect()
    public shuffleDeck$: Observable<BoardActions> = this._actions
    .pipe(
        ofType(BoardActionType.ShuffleDeckRequest),
        withLatestFrom(this._store.pipe(select(selectAllCards))),
        map(([action, cards]) => {
            this._boardService.shuffleDeck(cards);
            return new ShuffleDeckComplete(cards);
        })
    );

    constructor(
        private _actions: Actions,
        private _store: Store<BoardState>,
        private _boardService: BoardService
    ) {}
}
