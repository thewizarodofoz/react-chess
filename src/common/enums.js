const Direction = {
    UP: 0,
    DOWN: 1,
};

const DirectionMultiplier = {
    [Direction.DOWN]: 1,
    [Direction.UP]: -1,
};

const CellStatus = {
    UNREACHABLE: 0,
    OCCUPIABLE: 1,
    HABITABLE: 2,
};

export {
    Direction,
    DirectionMultiplier,
    CellStatus,
};
