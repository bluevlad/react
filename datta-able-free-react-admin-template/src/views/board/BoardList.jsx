import React from 'react';
import PropTypes from 'prop-types';
import Autolinker from 'autolinker';

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
        <div>
            <h2>
                <a href={'/Board/?id='+props.board.board_id} target="_self" rel="noopener noreferrer">
                    {props.board.board_title}
                </a>
            </h2>
            <footer>
                <span>
                <p dangerouslySetInnerHTML={getDescription()}/>
                </span>
            </footer>
            <footer>
                <span>
                  {props.board.reg_id}({props.board.reg_dt})
                </span>
                <span>
                  {props.board.upd_id}({props.board.upd_dt})
                </span>
            </footer>
        </div>
    )

};

BoardList.propTypes = {
    board: PropTypes.object.isRequired,
};

export default BoardList;
