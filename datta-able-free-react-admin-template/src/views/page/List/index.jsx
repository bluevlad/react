import React from 'react';
import PropTypes from 'prop-types';
import ExamPagination from './ExamPagination';

class List extends React.Component {

  shouldComponentUpdate (nextProps) {
    return this.props.loaded !== nextProps.loaded;
  }

  render () {
    if (!this.props.data.length) {
      return (
        <div>게시물 정보를 가져오지 못했습니다 :</div>
      )
    }

    return (
      <div>
        {
          this.props.data.map(item => {
            if (this.props.source == 'ePage') {
              return (
                <ExamPagination
                  key={item.currentPageNo}
                  ePage={item}
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
