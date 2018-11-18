import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatButtonModule, MatListModule } from '@angular/material';

import { BoardComponent } from './board.component';
import { BoardRoutingModule } from './board-routing.module';
import { CardComponent } from './components/card/card.component';
import { boardReducer } from './store/board.reducer';
import { BoardEffects } from './store/board.effects';

@NgModule({
  declarations: [
    BoardComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
    StoreModule.forFeature('boardState', boardReducer),
    EffectsModule.forFeature([BoardEffects]),
    MatButtonModule,
    MatListModule
  ]
})
export class BoardModule { }
