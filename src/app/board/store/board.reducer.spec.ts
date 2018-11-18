import { TestBed } from '@angular/core/testing';
import { boardStateAdapter, BoardState } from './board.state';
import { BoardService } from '../services/board.service';
import { boardReducer } from './board.reducer';
import { GenerateDeckRequest, GenerateDeckComplete, ShuffleDeckComplete, DealOneCard } from './board.actions';
import { Card } from '../models/card';
import { CardKind } from '../models/card-kind';
import { FaceValue } from '../models/face-value';

describe('boardReducer', () => {
    let state: BoardState;
    let service: BoardService;

    beforeEach(() => {
        service = TestBed.get(BoardService);
    });

    describe('GenerateDeckRequest', () => {
        const generateDeckRequest = new GenerateDeckRequest();

        beforeEach(() => {
            state = boardStateAdapter.getInitialState({
                dealedCard: new Card(99, CardKind.Club, FaceValue.Ace)
            });
            const cards = service.generateDeck();
            state = boardStateAdapter.addAll(cards, state);
        });

        it('should return a state with no card in it', () => {
            const reducedState = boardReducer(state, generateDeckRequest);
            expect(reducedState.ids.length).toBe(0);
        });

        it('should return a state with no dealedCard in it', () => {
            const reducedState = boardReducer(state, generateDeckRequest);
            expect(reducedState.dealedCard).toBeNull();
        });

        it('should call removeAll once', () => {
            boardStateAdapter.removeAll = spyOn(boardStateAdapter, 'removeAll').and.callThrough();
            boardReducer(state, generateDeckRequest);
            expect(boardStateAdapter.removeAll).toHaveBeenCalledTimes(1);
        });
    });

    describe('GenerateDeckComplete', () => {
        let generateDeckComplete: GenerateDeckComplete;

        beforeEach(() => {
            state = boardStateAdapter.getInitialState({
                dealedCard: null
            });
            const cards = service.generateDeck();
            generateDeckComplete = new GenerateDeckComplete(cards);
        });

        it('should return a state with 52 cards in it', () => {
            const reducedState = boardReducer(state, generateDeckComplete);
            expect(reducedState.ids.length).toBe(52);
        });

        it('should return a state with no dealedCard in it', () => {
            const reducedState = boardReducer(state, generateDeckComplete);
            expect(reducedState.dealedCard).toBeNull();
        });

        it('should call addAll once', () => {
            boardStateAdapter.addAll = spyOn(boardStateAdapter, 'addAll').and.callThrough();
            boardReducer(state, generateDeckComplete);
            expect(boardStateAdapter.addAll).toHaveBeenCalledTimes(1);
        });
    });

    describe('ShuffleDeckComplete', () => {
        let shuffleDeckComplete: ShuffleDeckComplete;

        beforeEach(() => {
            state = boardStateAdapter.getInitialState({
                dealedCard: null
            });
            const cards = service.generateDeck();
            state = boardStateAdapter.addAll(cards, state);
            service.shuffleDeck(cards);
            shuffleDeckComplete = new ShuffleDeckComplete(cards);
        });

        it('should return a state with 52 cards in it', () => {
            const reducedState = boardReducer(state, shuffleDeckComplete);
            expect(reducedState.ids.length).toBe(52);
            expect(reducedState.entities).not.toBe(state.entities);
        });

        it('should return a state with no dealedCard in it', () => {
            const reducedState = boardReducer(state, shuffleDeckComplete);
            expect(reducedState.dealedCard).toBeNull();
        });

        it('should call removeAll once', () => {
            boardStateAdapter.removeAll = spyOn(boardStateAdapter, 'removeAll').and.callThrough();
            boardReducer(state, shuffleDeckComplete);
            expect(boardStateAdapter.removeAll).toHaveBeenCalledTimes(1);
        });

        it('should call addAll once', () => {
            boardStateAdapter.addAll = spyOn(boardStateAdapter, 'addAll').and.callThrough();
            boardReducer(state, shuffleDeckComplete);
            expect(boardStateAdapter.addAll).toHaveBeenCalledTimes(1);
        });
    });

    describe('DealOneCard', () => {
        const dealOneCard = new DealOneCard();

        beforeEach(() => {
            state = boardStateAdapter.getInitialState({
                dealedCard: null
            });
            const cards = service.generateDeck();
            state = boardStateAdapter.addAll(cards, state);
        });

        it('should return a state with one less card in it', () => {
            const totalCards = state.ids.length;
            const reducedState = boardReducer(state, dealOneCard);
            expect(reducedState.ids.length).toBe(totalCards - 1);
        });

        it('should return the last state first card of the deck as the dealedCard in it', () => {
            const cardToDealId = state.ids[0] as string;
            const cardtoDeal = state.entities[cardToDealId];
            const reducedState = boardReducer(state, dealOneCard);
            expect(reducedState.dealedCard).toBe(cardtoDeal);
        });

        it('should call removeOne once', () => {
            boardStateAdapter.removeOne = spyOn(boardStateAdapter, 'removeOne').and.callThrough();
            boardReducer(state, dealOneCard);
            expect(boardStateAdapter.removeOne).toHaveBeenCalledTimes(1);
        });
    });
});
