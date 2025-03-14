import React from 'react';
import { boardOne } from '../../data/board';
import BoardView from './BoardView';

class View extends React.Component {

  constructor () {
    super();
    this.state = {
      boardOne: {
        data: [],
        loaded: false,
      },
    };
  }

  componentDidMount () {
    boardOne((data) => {
      this.setState({
        boardOne: {
          data: data,
          loaded: true,
        },
      });
    });
  }

  render () {
    return (
      <BoardView
        source="boardOne"
        data={this.state.boardOne.data}
        loaded={this.state.boardOne.loaded}
      />
    )
  };
  
};

export default View;
