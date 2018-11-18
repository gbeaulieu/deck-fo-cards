import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StoreModule, Store } from '@ngrx/store';

import { BoardComponent } from './board.component';
import { boardReducer } from './store/board.reducer';
import { DealOneCard, ShuffleDeckRequest } from './store/board.actions';
import { BoardState } from './store/board.state';


describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  let store: Store<BoardState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('boardState', boardReducer)
      ],
      declarations: [ BoardComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();

    store = TestBed.get(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('shuffleDeck', () => {
    it('should dispatch a ShuffleDeckRequest action', () => {
      store.dispatch = spyOn(store, 'dispatch');
      component.shuffleDeck();
      expect(store.dispatch).toHaveBeenCalledWith(new ShuffleDeckRequest());
    });
  });

  describe('dealOnCard', () => {
    it('should dispatch a DealOneCard action', () => {
      store.dispatch = spyOn(store, 'dispatch');
      component.dealOneCard();
      expect(store.dispatch).toHaveBeenCalledWith(new DealOneCard());
    });
  });
});
