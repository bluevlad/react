import React from 'react';
import PropTypes from 'prop-types';
import BoardList from '../BoardList';

class List extends React.Component {

    shouldComponentUpdate (nextProps) {
      return this.props.loaded !== nextProps.loaded;
    }

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
                        if (this.props.source == 'board') {
                            return (
                                <BoardList
                                    key={item.board_id}
                                    board={item}
                                />
                            )
                        }
                    })
                }
            </div>
        )
    }

};

List.propsTypes = {
    source: PropTypes.string.isRequired,
    getData: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    loaded: PropTypes.bool.isRequired,
};

export default List;
