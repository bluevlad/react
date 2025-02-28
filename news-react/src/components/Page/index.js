import React from 'react';
import PropTypes from 'prop-types';
import PlaceholderShimmer from '../PlaceholderShimmer';
import LockerPage from '../Locker/LockerPage';

class Page extends React.Component {

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
                        if (this.props.source == 'lPage') {
                            return (
                                <LockerPage
                                    key={item.currentPageNo}
                                    lPage={item}
                                />
                            )
                        }
                    })
                }
            </div>
        )
    }

};

Page.propsTypes = {
    source: PropTypes.string.isRequired,
    getData: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    loaded: PropTypes.bool.isRequired,
};

export default Page;
