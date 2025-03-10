import React from 'react';
import PropTypes from 'prop-types';
import Autolinker from 'autolinker';
import { Row, Col, Card, Table } from 'react-bootstrap';

const BoardList = (props) => {

    let getDescription = () => {
        const safeDescription = props.board.board_memo;
        return {
            __html: Autolinker.link(safeDescription, {
                email: false,
                phone: false,
                twitter: false,
            }),
        };
    };

    return (
                <Table responsive>
                  <tbody>
                  <tr>
                      <th scope="row">{props.board.board_id}</th>
                      <td>{props.board.board_title}</td>
                      <td><p dangerouslySetInnerHTML={getDescription()}/></td>
                      <td>{props.board.reg_id}({props.board.reg_dt})</td>
                    </tr>
                    </tbody>
                </Table>
      )

};

BoardList.propTypes = {
    board: PropTypes.object.isRequired,
};

export default BoardList;
