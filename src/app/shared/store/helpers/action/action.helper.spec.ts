import { Action } from '@ngrx/store';
import { isOfType } from './action.helper';

enum TestType {
 LoadTest = '[Test] Load',
 CompleteTest = '[Test] complete',
 ErrorTest = '[Test] error'
}

class LoadTestAction implements Action {
 public type: string = TestType.LoadTest;
}

class CompleteTestAction implements Action {
 public type: string = TestType.CompleteTest;
}

class ErrorTestAction implements Action {
 public type: string = TestType.ErrorTest;
}

describe('ActionHelper', () => {

 beforeEach(() => {});

 describe('isOfType', () => {

   it('should return true when the type is equal to the action type', () => {
     const loadTestAction = new LoadTestAction();
     const completeTestAction = new CompleteTestAction();
     const errorTestAction = new ErrorTestAction();
     expect(isOfType<LoadTestAction>(loadTestAction, TestType.LoadTest)).toBeTruthy();
     expect(isOfType<CompleteTestAction>(completeTestAction, TestType.CompleteTest)).toBeTruthy();
     expect(isOfType<ErrorTestAction>(errorTestAction, TestType.ErrorTest)).toBeTruthy();
   });

   it('should return false when the type is not eual to the action type', () => {
     const loadTestAction = new LoadTestAction();
     const completeTestAction = new CompleteTestAction();
     const errorTestAction = new ErrorTestAction();
     expect(isOfType<LoadTestAction>(errorTestAction, TestType.LoadTest)).toBeFalsy();
     expect(isOfType<CompleteTestAction>(loadTestAction, TestType.CompleteTest)).toBeFalsy();
     expect(isOfType<ErrorTestAction>(completeTestAction, TestType.ErrorTest)).toBeFalsy();
   });
 });
});
