import React from 'react';
import { Link } from 'react-router-dom';

import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';

class TabContent extends React.Component {

  render () {
    return (
      <React.Fragment>
      {
        this.props.data.map(item => {
          if (this.props.source == 'board') {
            return (
              <div key={item.board_id} className="d-flex friendlist-box align-items-center justify-content-center m-b-20">
                <div className="m-r-10 photo-table flex-shrink-0">
                  <Link to="#">
                    <img className="rounded-circle" style={{ width: '40px' }} src={avatar1} alt="activity-user" />
                  </Link>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="m-0 d-inline">{item.board_title}</h6>
                  <span className="float-end d-flex  align-items-center">
                    <i className="fa fa-caret-up f-22 m-r-10 text-c-green" />
                    {item.reg_dt}
                  </span>
                </div>
              </div>
            )
          }
          if (this.props.source == 'exam') {
            return (
              <div key={item.que_id} className="d-flex friendlist-box align-items-center justify-content-center m-b-20">
                <div className="m-r-10 photo-table flex-shrink-0">
                  <Link to="#">
                    <img className="rounded-circle" style={{ width: '40px' }} src={avatar2} alt="activity-user" />
                  </Link>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="m-0 d-inline">{item.que_title}</h6>
                  <span className="float-end d-flex  align-items-center">
                    <i className="fa fa-caret-up f-22 m-r-10 text-c-green" />
                    {item.pass_ans}
                  </span>
                </div>
              </div>
            )
          }
          if (this.props.source == 'locker') {
            return (
              <div key={item.box_cd} className="d-flex friendlist-box align-items-center justify-content-center m-b-20">
                <div className="m-r-10 photo-table flex-shrink-0">
                  <Link to="#">
                    <img className="rounded-circle" style={{ width: '40px' }} src={avatar3} alt="activity-user" />
                  </Link>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="m-0 d-inline">{item.box_nm}</h6>
                  <span className="float-end d-flex  align-items-center">
                    <i className="fa fa-caret-up f-22 m-r-10 text-c-green" />
                    {item.box_price}
                  </span>
                </div>
              </div>
            )
          }
        })
      }
      </React.Fragment>
    )
  }

};

export default TabContent;
