import { Component } from '@angular/core';
import { Card } from './models/card';
import { CardKind } from './models/card-kind';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  public cards: Card[] = [
    {
      id: 1,
      kind: CardKind.Heart,
      faceValue: 'Ace'
    },
    {
      id: 2,
      kind: CardKind.Heart,
      faceValue: '2'
    },
    {
      id: 3,
      kind: CardKind.Heart,
      faceValue: '3'
    },
    {
      id: 4,
      kind: CardKind.Heart,
      faceValue: '4'
    },
    {
      id: 5,
      kind: CardKind.Heart,
      faceValue: '5'
    }
  ];
}
