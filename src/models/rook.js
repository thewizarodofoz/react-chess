import BasePiece from './base-piece';
import {Direction, DirectionMultiplier, CellStatus} from '../common/enums';

export default class Rook extends BasePiece {

    constructor(matrix, direction) {
        super(matrix, direction);
    }

    getPositions(startingPosition) {
        const positions = [];

        this.getPositionsRecursively(startingPosition, 1, 0, positions);
        this.getPositionsRecursively(startingPosition, 0, -1, positions);
        this.getPositionsRecursively(startingPosition, -1, 0, positions);
        this.getPositionsRecursively(startingPosition, 0, -1, positions);

        return positions;
    }

    getPositionsRecursively([i, j], iStep, jStep, positions) {
        const move = [i + iStep, j + jStep];
        const nextMoveStatus = this._matrix.getCellStatusForPiece(move, this);
        if (nextMoveStatus !== CellStatus.UNREACHABLE) {
            positions.push([move, nextMoveStatus]);
            if (nextMoveStatus === CellStatus.HABITABLE) {
                this.getPositionsRecursively(move, iStep, jStep, positions);
            }
        }
    }

}
