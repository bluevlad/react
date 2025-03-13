import React from 'react';
import { Link } from 'react-router-dom';

class LockerList extends React.Component {

  render () {

    if (!this.props.data.length) {
      return (
        <div>사물함 정보를 가져오지 못했습니다 :</div>
      )
    }

    return (
      <div>
      {
        this.props.data.map(item => {
          if (this.props.source == 'locker') {
            return (
              <tr>
                <th scope="row">{item.box_cd}</th>
                <td>
                  <Link to={`/locker/view?id=${item.box_cd}`}>{item.box_nm}</Link>
                </td>
                <td>{item.box_count}</td>
                <td>{item.upd_id}({item.upd_dt})</td>
              </tr>
            )
          }
        })
      }
      </div>
    )
    
  }

};

export default LockerList;
