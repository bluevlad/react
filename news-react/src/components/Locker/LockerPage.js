import React from 'react';
import PropTypes from 'prop-types';
import styles from '../List/index.css';

const LockerPage = (props) => {

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <a href="/?page={props.lPage.lastPageNo}">
                    Go to Next (page {props.lPage.lastPageNo})
                </a>
            </div>
        </footer>
    )

};

LockerPage.propTypes = {
    lPage: PropTypes.object.isRequired,
};

export default LockerPage;
