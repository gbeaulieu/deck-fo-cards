import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatButtonModule } from '@angular/material';

import { BoardComponent } from './board.component';
import { BoardRoutingModule } from './board-routing.module';
import { CardListComponent } from './components/card-list/card-list.component';
import { CardComponent } from './components/card/card.component';
import { boardReducer } from './store/board.reducer';
import { BoardEffects } from './store/board.effects';

@NgModule({
  declarations: [
    BoardComponent,
    CardListComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
    StoreModule.forFeature('boardState', boardReducer),
    EffectsModule.forFeature([BoardEffects]),
    MatButtonModule
  ]
})
export class BoardModule { }
