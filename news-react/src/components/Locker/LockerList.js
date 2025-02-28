import React from 'react';
import PropTypes from 'prop-types';
import styles from '../List/index.css';

const LockerList = (props) => {

    return (
        <div className={styles.container}>
            [{props.list.box_cd}]
            <h2 className={styles.heading}>
                <a href={"/Locker/?id="+props.list.box_cd} target="_self" rel="noopener noreferrer">
                    {props.list.box_nm}
                </a>
            </h2>
            <footer className={styles.footer}>
                <span className={styles.footerItem}>
                    사용료 : {props.list.box_price}원&nbsp;(보증금 : {props.list.deposit}원)
                </span>
            </footer>
            <footer className={styles.footer}>
                <span className={styles.footerItem}>
                    개수 : {props.list.box_count}&nbsp;&nbsp;
                    (사용가능 : {props.list.not_cnt} | 사용중 : {props.list.use_cnt})
                </span>
            </footer>
            <footer className={styles.footer}>
                <span className={styles.footerItem}>
                    by {props.list.upd_dt} 
                </span>
            </footer>
        </div>
    )

};

LockerList.propTypes = {
    list: PropTypes.object.isRequired,
};

export default LockerList;
