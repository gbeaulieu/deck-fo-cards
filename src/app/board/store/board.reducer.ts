import { initialBoardState, BoardState, boardStateAdapter } from './board.state';
import {
    BoardActions,
    BoardActionType,
    DealOneCard,
    GenerateDeckComplete,
    ShuffleDeckComplete,
    GenerateDeckRequest
} from './board.actions';
import { isOfType } from 'src/app/shared/store/helpers/action/action.helper';

export function boardReducer(
    state = initialBoardState,
    action: BoardActions
): BoardState {
    if (isOfType<GenerateDeckRequest>(action, BoardActionType.GenerateDeckRequest)) {
        state = {...state, dealedCard: null};
        return boardStateAdapter.removeAll(state);
    }

    if (isOfType<GenerateDeckComplete>(action, BoardActionType.GenerateDeckComplete)) {
        return boardStateAdapter.addAll(action.payload, state);
    }

    if (isOfType<ShuffleDeckComplete>(action, BoardActionType.ShuffleDeckComplete)) {
        state = boardStateAdapter.removeAll(state);
        return boardStateAdapter.addAll(action.payload, state);
    }

    if (isOfType<DealOneCard>(action, BoardActionType.DealOneCard)) {
        const cardToDealId = state.ids[0] as string;
        const cardtoDeal = state.entities[cardToDealId];
        state = {...state, dealedCard: cardtoDeal};
        return boardStateAdapter.removeOne(cardToDealId, state);
    }

    return state;
}
