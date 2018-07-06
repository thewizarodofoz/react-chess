import * as React from "react";
import Board from '../components/Board';
import { Matrix } from '../models';
import { Direction } from '../common/enums';
import { id } from '../common/utils';

export default class Game extends React.Component {

    constructor(props, context) {
        super(props, context);

        const matrix = new Matrix();
        this.state = {matrix: matrix};
    }

    handleCellClick(row, col) {
        const matrix = this.state.matrix.handleCellClick(row, col);

        this.setState({matrix});
    }

    render() {
        return (
            <div className="game">
                <h1>Let's play chess!</h1>
                <Board matrix={this.state.matrix.$} handleCellClick={this.handleCellClick.bind(this)}/>
            </div>
        )
    }

}
