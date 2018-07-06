import BasePiece from './base-piece';
import {CellStatus} from '../common/enums';

export default class Knight extends BasePiece {

    constructor(matrix, direction) {
        super(matrix, direction);
    }

    getPositions(startingPosition) {
        const positions = [];

        const [i, j] = startingPosition;
        const moves = [
            [2, 1],
            [2, -1],
            [-2, 1],
            [-2, -1],
            [1, 2],
            [1, -2],
            [-1, 2],
            [-1, -2],
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
