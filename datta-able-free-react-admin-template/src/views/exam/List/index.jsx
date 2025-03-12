import React from 'react';
import PropTypes from 'prop-types';
import ExamList from '../ExamList';

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
                        if (this.props.source == 'exam') {
                            return (
                                <ExamList
                                    key={item.que_id}
                                    exam={item}
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
