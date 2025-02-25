import React from 'react';
import PropTypes from 'prop-types';
import styles from '../NewsList/index.css';

const ExamItem = (props) => {

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>
                {props.exam.que_title}
            </h2>
            <p className={styles.description}>{props.exam.pass_ans}</p>
            <footer className={styles.footer}>
                <span className={styles.footerItem}>
                    <span className={styles.footerItem}>
                        {props.exam.que_count}
                    </span>
                </span>
                <span className={styles.footerItem}>
                    <span className={styles.footerItem}>
                        {props.exam.ans_view1}
                        {props.exam.ans_view2}
                        {props.exam.ans_view3}
                        {props.exam.ans_view4}
                        {props.exam.ans_view5}
                    </span>
                </span>
            </footer>
        </div>
    )

};

ExamItem.propTypes = {
    exam: PropTypes.object.isRequired,
};

export default ExamItem;
