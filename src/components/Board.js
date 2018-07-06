import * as React from "react";

export default class Board extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {matrix, handleCellClick} = this.props;

        return (
            <div className="board">
                {matrix.map((row) => <BoardRow cells={row} handleCellClick={handleCellClick} key={row.id}/>)}
            </div>
        )
    }

}

const BoardRow = ({cells, handleCellClick}) => (
    <div className="board-row">
        {cells.map((cell) => <BoardCell cell={cell} handleCellClick={handleCellClick} key={cell.id}/>)}
    </div>
);

const BoardCell = ({cell, handleCellClick}) => (
    <div onClick={() => handleCellClick(cell)}
         className={cell.classes}>
        {cell.label}
    </div>
);
