import React from 'react';
import { examOne } from '../../data/exam';
import ExamView from './ExamView';

class View extends React.Component {

  constructor () {
    super();
    this.state = {
      examOne: {
        data: [],
        loaded: false,
      },
    };
  }

  componentDidMount () {
    examOne((data) => {
      this.setState({
        examOne: {
          data: data,
          loaded: true,
        },
      });
    });
  }

  render () {

    return (
      <ExamView
        source="examOne"
        data={this.state.examOne.data}
        loaded={this.state.examOne.loaded}
      />
    )
    
  };
  
};

export default View;
