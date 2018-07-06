import BasePiece from './base-piece';
import { CellStatus, Direction, DirectionMultiplier } from '../common/enums';

export default class Pawn extends BasePiece {

    constructor(matrix, direction) {
        super(matrix, direction);
    }

    getPositions(startingPosition) {
        const [i, j] = startingPosition;
        const positions = [];

        tryPositions: {
            const singleMove = [i + (1 * DirectionMultiplier[this._direction]), j];
            const singleMoveStatus = this._matrix.getCellStatusForPiece(singleMove, this);
            if (singleMoveStatus === CellStatus.UNREACHABLE) {
                break tryPositions;
            } else {
                positions.push([singleMove, singleMoveStatus]);
                if (singleMoveStatus === CellStatus.HABITABLE && this.isInStartingPosition(startingPosition)) {
                    const doubleMove = [i + (2 * DirectionMultiplier[this._direction]), j];
                    const doubleMoveStatus = this._matrix.getCellStatusForPiece(doubleMove, this);
                    if (doubleMoveStatus !== CellStatus.UNREACHABLE) {
                        positions.push([doubleMove, doubleMoveStatus]);
                    }
                }
            }
        }

        return positions;
    }

    isInStartingPosition([i, _]) {
        return this.direction === Direction.DOWN ? i === 1 : i === 6;
    }

}
