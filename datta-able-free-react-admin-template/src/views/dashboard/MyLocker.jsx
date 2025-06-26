import React, { useEffect } from 'react';
import superagent from "superagent";
import { BASE_API } from "../../config/constant";
import { Form, Row, Col, Card, Table } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { mylocker } from './data';

import avatar1 from '../../assets/images/user/avatar-1.jpg';

// 🔹 `withRouter` 유틸 함수 (React Router v6에서 사용) 
// navigate를 props로 전달
function withRouter(Component) {
  return function WrappedComponent(props) {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const userNm = localStorage.getItem("userNm");

    useEffect(() => {
      if (!token) {
        navigate("/auth/signin");
      }
    }, [token, navigate]);

    if (!token) {
      return null; // 로그인 페이지로 이동할 때 렌더링을 중단
    }

    return <Component {...props} token={token} userId={userId} userNm={userNm} navigate={navigate} />;
  };
}


class MyLocker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.userId || "",
      userNm: props.userNm || "",
      token: props.token || "",
      mylocker: {
        data: [],
        loaded: false,
      }
    };
  }

  componentDidMount() {
    mylocker((data) => {
      this.setState({
        mylocker: {
          data: data,
          loaded: true,
        },
      });
    });
  }

  doCancel = (boxCd, boxNum, rentSeq) => {

    const payload = {
      box_cd: boxCd,
      box_num: boxNum,
      rent_seq: rentSeq,
      user_id: this.state.userId,
    };
  
    superagent
      .post(`${BASE_API}/locker/lockerRefund`)
      .type("form")
      .send(payload)
      .then((res) => {
        alert("Response: " + res.text);
        window.location.reload(); // 간단한 방법
      })
      .catch((err) => console.error("사물함 취소 오류:", err));
  };
  
  render () {
    const { mylocker } = this.state;

    return (
    <React.Fragment>
      <Row>

        <Form>
        <Col md={6} xl={8}>
          <Card className="Recent-Users widget-focus-lg">
            <Card.Header>
              <Card.Title as="h5">My Locker Reservation</Card.Title>
            </Card.Header>
            <Card.Body className="px-0 py-2">
              <Table responsive hover className="recent-users">
              <tbody>
                {this.state.mylocker.loaded && this.state.mylocker.data.length > 0 ? (
                  this.state.mylocker.data.map((item, index) => (
                    <tr className="unread" key={index}>
                      <td>
                        <img className="rounded-circle" style={{ width: '40px' }} src={avatar1} alt="activity-user" />
                      </td>
                      <td>
                        <h6 className="mb-1">{item.box_cd} - {item.box_num}</h6>
                        <p className="m-0">{item.box_nm}</p>
                      </td>
                      <td>
                        {item.rest_yn == 1 ? (
                          <h6 className="text-muted">
                            <i className="fa fa-circle text-c-green f-10 m-r-15" />
                            {item.rent_start} ~ {item.rent_end}
                          </h6>
                        ) : (
                          <h6 className="text-muted">
                            <i className="fa fa-circle text-c-red f-10 m-r-15" />
                            {item.rent_start} ~ {item.rent_end}
                          </h6>
                        )}
                      </td>
                      <td>
                      {item.rest_yn == 1 ? (
                        <>
                        <Link to="#" className="label theme-bg2 text-white f-12">
                        Approve
                        </Link>
                        <Link to="#" className="label theme-bg text-white f-12" 
                        onClick={() => this.doCancel(item.box_cd, item.box_num, item.rent_seq)}>
                        Reject
                        </Link>
                        </>
                        ) : null}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">예약된 사물함이 없습니다.</td>
                  </tr>
                )}
              </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        </Form>

      </Row>
    </React.Fragment>
  );
}
};

export default MyLocker;
