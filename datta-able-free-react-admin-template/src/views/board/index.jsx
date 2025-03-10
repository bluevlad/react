import React from 'react';
import {board} from '../../data/board';
import List from './List';

class Board extends React.Component {

    constructor () {
        super();

        this.state = {
            board: {
                data: [],
                loaded: false,
            },
        };
    }

    componentDidMount () {
        board((data) => {
            this.setState({
                board: {
                    data: data,
                    loaded: true,
                },
            });
        });
    }

    render () {
        return (

                <div>
                    <h1>
                        Notifications
                    </h1>

                    <List
                        source="board"
                        data={this.state.board.data}
                        loaded={this.state.board.loaded}
                    />

                </div>
        )
    }
};

export default Board;
