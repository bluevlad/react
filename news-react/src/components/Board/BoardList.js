import React from 'react';
import PropTypes from 'prop-types';
import Autolinker from 'autolinker';
import escape from 'html-escape';
import styles from '../List/index.css';

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
        <div className={styles.container}>
            <h2 className={styles.heading}>
                <a href={'/Board/?id='+props.board.board_id} target="_self" rel="noopener noreferrer">
                    {props.board.board_title}
                </a>
            </h2>
            <footer className={styles.footer}>
                <span className={styles.footerItem}>
                <p className={styles.description} dangerouslySetInnerHTML={getDescription()}/>
                </span>
            </footer>
            <footer className={styles.footer}>
                <span className={styles.footerItem}>
                  {props.board.reg_id}({props.board.reg_dt})
                </span>
                <span className={styles.footerItem}>
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
