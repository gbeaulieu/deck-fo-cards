import { CardKind } from './card-kind';

export interface Card {
    id: number;
    kind: CardKind;
    faceValue: string;
}
