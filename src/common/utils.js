import { Direction } from './enums';

function reverseDirection(direction) {
    return direction === Direction.UP ? Direction.DOWN : Direction.UP;
}

function id() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

export {
    reverseDirection,
    id,
}
