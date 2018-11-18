import { Component, OnInit } from '@angular/core';
import { Card } from './models/card';
import { BoardService } from './services/board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  public cards: Card[];
  public cardDealed: Card;

  constructor(private _boardService: BoardService) {}

  public ngOnInit() {
    this.cards = this._boardService.generateDeck();
  }

  public shuffleDeck() {
    this._boardService.shuffleDeck(this.cards);
  }

  public dealOneCard() {
    this.cardDealed = this.cards.shift();
  }
}
