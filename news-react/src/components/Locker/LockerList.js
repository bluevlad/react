import React from 'react';
import PropTypes from 'prop-types';
import styles from '../NewsList/index.css';

const LockerList = (props) => {

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>
                <a
                    href={'http://localhost:8080/api/getLocker?boxCd='+props.locker.box_cd}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {props.locker.box_nm}
                </a>
            </h2>
            <footer className={styles.footer}>
                <span className={styles.footerItem}>
                     {props.locker.box_price} 원&nbsp;({props.locker.deposit})
                </span>
                <span className={styles.footerItem}>
                     {props.locker.box_count} ({props.locker.use_cnt} / {props.locker.not_cnt})
                </span>
            </footer>
        </div>
    )

};

LockerList.propTypes = {
    locker: PropTypes.object.isRequired,
};

export default LockerList;
