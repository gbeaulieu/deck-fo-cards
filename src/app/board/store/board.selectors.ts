import { createFeatureSelector, createSelector } from '@ngrx/store';

import { boardStateAdapter, BoardState } from './board.state';

export const {
    selectAll,
    selectTotal
} = boardStateAdapter.getSelectors();

export const selectBoardState = createFeatureSelector<BoardState>('boardState');

export const selectAllCards = createSelector(
    selectBoardState,
    selectAll
);

export const selectTotalCards = createSelector(
    selectBoardState,
    selectTotal
);

export const selecteDealedCard = createSelector(
    selectBoardState,
    (state: BoardState) => state.dealedCard
);
