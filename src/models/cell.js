import { Direction, CellStatus } from '../common/enums';

export default class Cell {

    constructor(row, col) {
        this._row = row;
        this._col = col;
        this._piece = null;
        this._status = null;
    }

    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }

    set piece(piece) {
        this._piece = piece;
    }

    get piece() {
        return this._piece;
    }

    static makeId([row, col]) {
        return 'c_' + row + col;
    }

    get indexes() {
        return [this._row, this._col];
    }

    get id() {
        return Cell.makeId([this._row, this._col]);
    }

    get isOccupied() {
        return this._piece !== null;
    }

    get label() {
        return this._piece ? this._piece.label : '';
    }

    get classes() {
        const classes = [
            'board-cell',
            this.cellColorClass,
            this.cellStatusClass,
        ];

        if (this.isOccupied) {
            classes.push(
                this.pieceColorClass,
            );
        }

        return classes.join(' ');
    }

    get cellStatusClass() {
        switch (this._status) {
            case CellStatus.HABITABLE:
                return 'habitable';
            case CellStatus.OCCUPIABLE:
                return 'occupiable';
            default:
                return '';
        }
    }

    get pieceColorClass() {
        return 'direction-' + this._piece.direction;
    }

    get cellColorClass() {
        const sum = this._row % 2 + this._col % 2;
        switch (sum) {
            case 0:
                return 'dark';
            case 1:
                return 'light';
            case 2:
                return 'dark';
        }
    }

}
