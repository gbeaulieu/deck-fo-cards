import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { Observable } from 'rxjs';

import { hot, cold } from 'jasmine-marbles';

import { BoardEffects } from './board.effects';
import { BoardActions, GenerateDeckRequest, GenerateDeckComplete, ShuffleDeckRequest, ShuffleDeckComplete } from './board.actions';
import { BoardService } from '../services/board.service';
import { boardReducer } from './board.reducer';
import { Card } from '../models/card';

describe('My Effects', () => {
    let cards: Card[];
    let effects: BoardEffects;
    let service: BoardService;
    let actions: Observable<BoardActions>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          StoreModule.forRoot({}),
          StoreModule.forFeature('boardState', boardReducer)
        ],
        providers: [
          BoardEffects,
          provideMockActions(() => actions),
          BoardService
        ],
      });

      effects = TestBed.get(BoardEffects);
      service = TestBed.get(BoardService);
    });

    beforeEach(() => {
        cards = service.generateDeck();
    });

    describe('generateDeck$', () => {
        it('should return a GenerateDeckComplete action', () => {
            const generatedeckRequest = new GenerateDeckRequest();
            const generateDeckComplete = new GenerateDeckComplete(cards);

            actions = hot('--a-', {a: generatedeckRequest});
            const expected = cold('--b', { b: generateDeckComplete });

            expect(effects.generateDeck$).toBeObservable(expected);
        });
    });

    describe('shuffleDeck$', () => {
        beforeEach(() => {
            service.shuffleDeck = spyOn(service, 'shuffleDeck').and.returnValue([]);
        });

        it('should return a ShuffleDeckComplete action', () => {
            const shuffleDeckRequest = new ShuffleDeckRequest();
            const shuffleDeckComplete = new ShuffleDeckComplete([]);

            actions = hot('--a-', {a: shuffleDeckRequest});
            const expected = cold('--b', { b: shuffleDeckComplete });

            expect(effects.shuffleDeck$).toBeObservable(expected);
        });
    });
});
