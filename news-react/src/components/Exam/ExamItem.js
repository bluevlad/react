import React from 'react';
import PropTypes from 'prop-types';
import Autolinker from 'autolinker';
import escape from 'html-escape';
import styles from '../List/index.css';

const ExamItem = (props) => {

    let getDescription = () => {
        const safeDescription = props.exam.ans_desc;
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
                {props.exam.que_title}
            </h2>({props.exam.que_count})
            <footer className={styles.footer}>
                <span className={styles.footerItem}>
                    <span className={styles.footerItem}>
                        <div>1. {props.exam.ans_view1}</div>
                        <div>2. {props.exam.ans_view2}</div>
                        <div>3. {props.exam.ans_view3}</div>
                        <div>4. {props.exam.ans_view4}</div>
                        <div>5. {props.exam.ans_view5}</div>
                    </span>
                    <p>{props.exam.pass_ans}</p>
                    <p className={styles.description} dangerouslySetInnerHTML={getDescription()}/>
                </span>
            </footer>
        </div>
    )

};

ExamItem.propTypes = {
    exam: PropTypes.object.isRequired,
};

export default ExamItem;
