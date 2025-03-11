import React from 'react';
import PropTypes from 'prop-types';

const BoardList = (props) => {

  return (
    <tr>
      <th scope="row">{props.board.board_id}</th>
      <td>{props.board.board_title}</td>
      <td>{props.board.reg_id}</td>
      <td>{props.board.reg_dt}</td>
    </tr>
  )

};

BoardList.propTypes = {
    board: PropTypes.object.isRequired,
};

export default BoardList;
