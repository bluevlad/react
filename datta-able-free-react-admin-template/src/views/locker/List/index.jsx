import React from 'react';
import LockerList from '../LockerList';

class List extends React.Component {

    render () {

        if (!this.props.data.length) {
            return (
                <div>Oops, we were unable to load the stories :</div>
            )
        }

        return (
            <div>
                {
                    this.props.data.map(item => {
                        if (this.props.source == 'locker') {
                            return (
                                <LockerList
                                    key={item.box_id}
                                    locker={item}
                                />
                            )
                        }
                    })
                }
            </div>
        )
    }

};

export default List;
