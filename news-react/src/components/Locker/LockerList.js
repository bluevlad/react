import React from 'react';
import PropTypes from 'prop-types';
import styles from '../List/index.css';

const LockerList = (props) => {

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>
                <a
                    href={"/Locker/?id="+props.list.box_cd}
                    rel="noopener noreferrer"
                >
                    {props.list.box_nm}
                </a>
            </h2>
            <footer className={styles.footer}>
                <span className={styles.footerItem}>
                     {props.list.box_price} 원&nbsp;({props.list.deposit})
                </span>
                <span className={styles.footerItem}>
                     {props.list.box_count} ({props.list.use_cnt} / {props.list.not_cnt})
                </span>
            </footer>
        </div>
    )

};

LockerList.propTypes = {
    list: PropTypes.object.isRequired,
};

export default LockerList;
