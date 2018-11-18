import { initialBoardState, BoardState, boardStateAdapter } from './board.state';
import {
    BoardActions,
    BoardActionType,
    DealOneCard,
    GenerateDeckComplete,
    ShuffleDeckComplete,
    GenerateDeckRequest
} from './board.actions';

export function boardReducer(
    state = initialBoardState,
    action: BoardActions
): BoardState {
    switch (action.type) {
        case BoardActionType.GenerateDeckRequest: {
            state = {...state, dealedCard: null};
            return boardStateAdapter.removeAll(state);
        }

        case BoardActionType.GenerateDeckComplete: {
            const generateDeckComplete = action as GenerateDeckComplete;
            return boardStateAdapter.addAll(generateDeckComplete.payload, state);
        }

        case BoardActionType.ShuffleDeckComplete: {
            const shuffleDeckComplete = action as ShuffleDeckComplete;
            state = boardStateAdapter.removeAll(state);
            return boardStateAdapter.addAll(shuffleDeckComplete.payload, state);
        }

        case BoardActionType.DealOneCard: {
            const cardToDealId = state.ids[0] as string;
            const cardtoDeal = state.entities[cardToDealId];
            state = {...state, dealedCard: cardtoDeal};
            return boardStateAdapter.removeOne(cardToDealId, state);
        }

        default:
            return state;
    }
}
