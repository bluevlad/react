import React from 'react';
import { Link } from 'react-router-dom';

class ExamList extends React.Component {

  render () {

    if (!this.props.data.length) {
        return (
          <div>문제은행 정보를 가져오지 못했습니다 :</div>
        )
    }

    return (
      <div>
      {
        this.props.data.map(item => {
          if (this.props.source == 'exam') {
            return (
              <tr>
                <th scope="row">{item.que_id}</th>
                <td>
                  <Link to={`/exam/view?id=${item.que_id}`}>{item.que_title}</Link>
                </td>
                <td>{item.que_type}</td>
                <td>{item.reg_id}({item.reg_dt})</td>
              </tr>
            )
          }
        })
      }
      </div>
    )

  }

};

export default ExamList;
