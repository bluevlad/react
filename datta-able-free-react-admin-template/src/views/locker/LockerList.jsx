import React from 'react';
import PropTypes from 'prop-types';

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

LockerList.propTypes = {
    locker: PropTypes.object.isRequired,
};

export default LockerList;
