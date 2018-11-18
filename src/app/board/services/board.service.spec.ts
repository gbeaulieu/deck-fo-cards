import { TestBed } from '@angular/core/testing';

import { BoardService } from './board.service';
import { Card } from '../models/card';

describe('BoardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BoardService = TestBed.get(BoardService);
    expect(service).toBeTruthy();
  });

  describe('generateDeck', () => {
    it('should return an array with a length of 52', () => {
      const service: BoardService = TestBed.get(BoardService);
      const deck = service.generateDeck();
      expect(deck.length).toBe(52);
    });
  });

  describe('suffleDeck', () => {
    let service: BoardService;
    let deck: Card[];

    beforeEach(() => {
      service = TestBed.get(BoardService);
      deck = service.generateDeck();
      expect(deck.length).toBe(52);
    });

    it('should not alter array length', () => {
      deck = service.generateDeck();
      service.shuffleDeck(deck);

      expect(deck.length).toBe(52);
    });

    it('should move at least one card', () => {
      deck = service.generateDeck();
      const originalDeck = Object.assign({}, deck);

      service.shuffleDeck(deck);

      let atLeastOneChanged = false;

      deck.forEach((card, index) => {
        if (card !== originalDeck[index]) {
          atLeastOneChanged = true;
        }
      });
      expect(atLeastOneChanged).toBeTruthy();
    });
  });
});
