import { Action } from '@ngrx/store';
import { Card } from '../models/card';

export enum BoardActionType {
    GenerateDeckRequest = '[Board] Generate deck request',
    GenerateDeckComplete = '[Board] Generate deck complete',
    ShuffleDeckRequest = '[Board] Shuffle deck request',
    ShuffleDeckComplete = '[Board] Shuffle deck complete',
    DealOneCard = '[Board] Deal one card'
}

export class GenerateDeckRequest implements Action {
    public type: string = BoardActionType.GenerateDeckRequest;
}

export class GenerateDeckComplete implements Action {
    public type: string = BoardActionType.GenerateDeckComplete;
    constructor(public payload: Card[]) {}
}

export class ShuffleDeckRequest implements Action {
    public type: string = BoardActionType.ShuffleDeckRequest;
}

export class ShuffleDeckComplete implements Action {
    public type: string = BoardActionType.ShuffleDeckComplete;
    constructor(public payload: Card[]) {}
}

export class DealOneCard implements Action {
    public type: string = BoardActionType.DealOneCard;
}

export type BoardActions =
    GenerateDeckRequest |
    GenerateDeckComplete |
    ShuffleDeckRequest |
    ShuffleDeckComplete |
    DealOneCard;
