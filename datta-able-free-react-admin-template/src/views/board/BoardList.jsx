import React from 'react';
import { Link } from 'react-router-dom';

class BoardList extends React.Component {

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
            if (this.props.source == 'board') {
              return (
                <tr>
                <th scope="row">{item.board_id}</th>
                <td>
                  <Link to={`/board/view?id=${item.board_id}`}>{item.board_title}</Link>
                  </td>
                <td>{item.reg_id}</td>
                <td>{item.reg_dt}</td>
              </tr>
              )
            }
          })
        }
      </div>
    )
  }

};

export default BoardList;
