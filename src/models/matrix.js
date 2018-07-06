import { Bishop, King, Knight, Pawn, Queen, Rook, Cell } from '../models';
import { Direction, CellStatus } from '../common/enums';
import { reverseDirection } from '../common/utils';

export default class Matrix {

    constructor() {
        const cells = [];
        for (let i = 0; i < 8; i++) {
            cells[i] = [];
            cells[i].id = 'r_' + i;
            for (let j = 0; j < 8; j++) {
                cells[i][j] = new Cell(i, j);
            }
        }

        const orderedPieces = [Rook, Knight, Bishop, King, Queen, Bishop, Knight, Rook];

        orderedPieces.forEach((piece, j) => {
            cells[0][j].piece = new piece(this, Direction.DOWN);
            cells[7][j].piece = new piece(this, Direction.UP);
        });

        for (let j = 0; j < 8; j++) {
            cells[1][j].piece = new Pawn(this, Direction.DOWN);
            cells[6][j].piece = new Pawn(this, Direction.UP);
        }

        this.$ = cells;
    }

    handleCellClick(clickedCell) {
        if (!clickedCell.isOccupied) {
            return;
        }

        // TODO: mark clickedCell.piece as playing and color the cell

        const positions = this.mappifyPositionsStatuses(clickedCell.piece.getPositions(clickedCell.indexes));

        for (let row of this.$) {
            for (let cell of row) {
                cell.status = positions.has(cell.id) ? positions.get(cell.id) : CellStatus.UNREACHABLE;
            }
        }

        return this;
    }

    mappifyPositionsStatuses(positionsStatuses) {
        const map = new Map();
        positionsStatuses.forEach(([position, status]) => {
            map.set(Cell.makeId(position), status);
        });
        return map;
    }

    getCellStatusForPiece(cell, piece) {
        if (!this.isInBound(cell) || this.hasFriend(cell, piece)) {
            return CellStatus.UNREACHABLE;
        } else if (this.hasEnemy(cell, piece)) {
            return CellStatus.OCCUPIABLE;
        } else {
            return CellStatus.HABITABLE;
        }
    }

    isInBound([i, j]) {
        return i >=0 && i < 8 && j >=0 && j < 8;
    }

    hasEnemy(position, piece) {
        return this.isOccupiedWithDirectionalPiece(position, reverseDirection(piece.direction));
    }

    hasFriend(position, piece) {
        return this.isOccupiedWithDirectionalPiece(position, piece.direction);
    }

    isOccupiedWithDirectionalPiece([i, j], direction) {
        const cell = this.$[i][j];
        return cell.isOccupied ? cell.piece.direction === direction : false;
    }
}
