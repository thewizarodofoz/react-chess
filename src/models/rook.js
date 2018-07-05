import BasePiece from './base-piece';
import {Direction, DirectionMultiplier} from '../common/enums';

export default class Pawn extends BasePiece {

    constructor(matrix, direction) {
        super(matrix, direction);
    }

    getPositions(position) {
        const [i, j] = position;
        const moves = [];
        moves.push([i + (1 * DirectionMultiplier[this._direction]), j]);
        if (this.isInStartingPosition(position)) {
            moves.push([i + (2 * DirectionMultiplier[this._direction]), j]);
        }

        return moves.filter(this.isPositionAllowed.bind(this));
    }

    isInStartingPosition([i, _]) {
        return this.direction === Direction.DOWN ? i === 1 : i === 6;
    }

}
