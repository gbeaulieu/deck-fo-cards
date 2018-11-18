import { Injectable } from '@angular/core';
import { Card } from '../models/card';
import { CardKind } from '../models/card-kind';
import { FaceValue } from '../models/face-value';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private readonly faceValues: FaceValue[] = [
    FaceValue.Ace,
    FaceValue.Two,
    FaceValue.Three,
    FaceValue.Four,
    FaceValue.Five,
    FaceValue.Six,
    FaceValue.Seven,
    FaceValue.Eight,
    FaceValue.Nine,
    FaceValue.Ten,
    FaceValue.Jack,
    FaceValue.Queen,
    FaceValue.King
  ];

  private readonly cardKinds: CardKind[] = [
    CardKind.Heart,
    CardKind.Spade,
    CardKind.Club,
    CardKind.Diamond
];

  constructor() { }

  /**
  * Generate an array of 52 cards containing 13 cards of each kind
  * @returns returns an array of Card
  */
  public generateDeck(): Card[] {
    let deck: Card[] = [];
    this.cardKinds.forEach((kind, kindIndex) =>
      this.faceValues.forEach((faceValue, faceValueIndex) => {
        const cardId = (kindIndex * 13) + (faceValueIndex + 1);
        deck.push(new Card(cardId, kind, faceValue));
      })
    );

    return deck;
  }

  /**
  * Shuffle an array following the Fisher-Yates shuffle (https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)
  * @param deck the array of cards to shuffle
  */
  public shuffleDeck(deck: Card[]) {
    for (let i = 0; i < deck.length; i++) {
      const switchIndex = Math.floor(Math.random() * (i + 1));
      const valueToSwitch = deck[i];
      deck[i] = deck[switchIndex];
      deck[switchIndex] = valueToSwitch;
    }
  }
}
