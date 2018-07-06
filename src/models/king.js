import BasePiece from './base-piece';
import { CellStatus, Direction, DirectionMultiplier } from '../common/enums';

export default class King extends BasePiece {

    constructor(matrix, direction) {
        super(matrix, direction);
    }

    getPositions(startingPosition) {
        const positions = [];

        const [i, j] = startingPosition;
        const moves = [
            [1, 0],
            [1, 1],
            [0, 1],
            [-1, 1],
            [-1, 0],
            [-1, -1],
            [0, -1],
            [1, -1],
        ];

        moves.forEach(([iStep, jStep]) => {
            const move = [i + iStep, j + jStep];
            const moveStatus = this._matrix.getCellStatusForPiece(move, this);
            if (moveStatus !== CellStatus.UNREACHABLE) {
                positions.push([move, moveStatus]);
            }
        });

        return positions;
    }

}
