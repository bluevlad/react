import React from 'react';
import { lockerOne } from '../../data/locker';
import LockerView from './LockerView';

class View extends React.Component {

  constructor () {
    super();
    this.state = {
      lockerOne: {
        data: [],
        loaded: false,
      },
    };
  }

  componentDidMount () {
    lockerOne((data) => {
      this.setState({
        lockerOne: {
          data: data,
          loaded: true,
        },
      });
    });
  }

  render () {

    return (
      <LockerView
        source="lockerOne"
        data={this.state.lockerOne.data}
        loaded={this.state.lockerOne.loaded}
      />
    )

  };
  
};

export default View;
