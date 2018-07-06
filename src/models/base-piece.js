import {reverseDirection, id} from '../common/utils';

export default class BasePiece {

    constructor(matrix, direction) {
        this._matrix = matrix;
        this._direction = direction;
        this._key = id();
    }

    get label() {
        return this.constructor.name;
    }

    get direction() {
        return this._direction;
    }

    get key() {
        return this._key;
    }

    getPositions() {
        return [];
    }

    isMoveAllowed(position) {
        return this._matrix.isMoveAllowed(position, this);
    }

    isCaptureAllowed(position) {
        return this._matrix.isCaptureAllowed(position, this);
    }

}
