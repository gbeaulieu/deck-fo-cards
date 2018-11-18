import { Action } from '@ngrx/store';

/**
  * Check if an action is of a certain type and cast it at the same time.
  * @param action the action with the type to check
  * @param type the type the action should be
  * @returns returns true if is of the same type and false otherwise
  */
export function isOfType<T extends Action>(action: Action, type: string): action is T {
    return action.type === type;
}
