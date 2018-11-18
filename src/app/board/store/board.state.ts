import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Card } from '../models/card';

export interface BoardState extends EntityState<Card> {
    dealedCard: Card;
}

export const boardStateAdapter: EntityAdapter<Card> = createEntityAdapter<Card>();

export const initialBoardState: BoardState = boardStateAdapter.getInitialState({
    dealedCard: null
});
