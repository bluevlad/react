import React from 'react';

const LockerList = (props) => {

    return (
                  <tr>
                      <th scope="row">{props.locker.box_cd}</th>
                      <td>{props.locker.box_nm}</td>
                      <td>{props.locker.box_count}</td>
                      <td>{props.locker.upd_id}({props.locker.upd_dt})</td>
                    </tr>
      )

};

export default LockerList;
