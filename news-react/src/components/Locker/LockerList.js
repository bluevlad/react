import React from 'react';
import PropTypes from 'prop-types';
import styles from '../NewsList/index.css';

const LockerList = (props) => {

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>
                <a
                    href={"/Locker/?id="+props.loc.box_cd}
                    rel="noopener noreferrer"
                >
                    {props.loc.box_nm}
                </a>
            </h2>
            <footer className={styles.footer}>
                <span className={styles.footerItem}>
                     {props.loc.box_price} 원&nbsp;({props.loc.deposit})
                </span>
                <span className={styles.footerItem}>
                     {props.loc.box_count} ({props.loc.use_cnt} / {props.loc.not_cnt})
                </span>
            </footer>
        </div>
    )

};

LockerList.propTypes = {
    loc: PropTypes.object.isRequired,
};

export default LockerList;
