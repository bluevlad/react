import React from 'react';
import PropTypes from 'prop-types';
import PlaceholderShimmer from '../PlaceholderShimmer';
import LockerList from '../Locker/LockerList';
import GitHubRepo from '../GitHub/GitHubRepo';
import ExamItem from '../Exam/ExamItem';

class NewsList extends React.Component {

    shouldComponentUpdate (nextProps) {
      return this.props.loaded !== nextProps.loaded;
    }

    render () {
        if (!this.props.loaded) {
            return (
                <PlaceholderShimmer />
            )
        }

        if (!this.props.data.length) {
            return (
                <div>Oops, we were unable to load the stories :</div>
            )
        }

        return (
            <div className={this.props.className}>
                {
                    this.props.data.map(item => {
                        if (this.props.source == 'locker') {
                            return (
                                <LockerList
                                    key={item.box_cd}
                                    story={item}
                                />
                            )
                        }
                        if (this.props.source == 'github') {
                            return (
                                <GitHubRepo
                                    key={item.url}
                                    repo={item}
                                />
                            )
                        }
                        if (this.props.source == 'examitem') {
                            return (
                                <ExamItem
                                    key={item.id}
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

NewsList.propsTypes = {
    source: PropTypes.string.isRequired,
    getData: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    loaded: PropTypes.bool.isRequired,
};

export default NewsList;
