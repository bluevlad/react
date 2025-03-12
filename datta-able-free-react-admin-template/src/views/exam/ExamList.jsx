import React from 'react';
import Autolinker from 'autolinker';

const ExamList = (props) => {

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
                  <tr>
                      <th scope="row">{props.exam.que_id}</th>
                      <td>{props.exam.que_title}</td>
                      <td>{props.exam.que_type}</td>
                      <td>{props.exam.reg_id}({props.exam.reg_dt})</td>
                    </tr>
      )

};

export default ExamList;
