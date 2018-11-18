import { CardKind } from './card-kind';
import { FaceValue } from './face-value';

export class Card {
    id: number;
    kind: CardKind;
    faceValue: FaceValue;

    constructor(id: number, kind: CardKind, faceValue: FaceValue) {
        this.id = id;
        this.kind = kind;
        this.faceValue = faceValue;
    }
}
