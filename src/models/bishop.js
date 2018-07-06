import BasePiece from './base-piece';
import { CellStatus, Direction, DirectionMultiplier } from '../common/enums';

export default class Bishop extends BasePiece {

    constructor(matrix, direction) {
        super(matrix, direction);
    }

    getPositions(startingPosition) {
        const positions = [];

        const moves = [
            [1, 1],
            [-1, 1],
            [-1, -1],
            [1, -1],
        ];

        moves.forEach(([iStep, jStep]) => this.getPositionsRecursively(startingPosition, iStep, jStep, positions));

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
