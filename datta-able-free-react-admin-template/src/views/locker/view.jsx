import React, { useEffect } from "react";
import superagent from "superagent";
import { BASE_API } from "../../config/constant";
import { Form, Button, Row, Col, Card, Table, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { fetchLockerDetailData } from "./data";

// useNavigate를 클래스 컴포넌트에서 사용하기 위한 HOC
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

class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.userId || "",
      userNm: props.userNm || "",
      token: props.token || "",
      lockerNumList: [],
      lockerDetail: {},
      loaded: false,
      activeAccordion: null,
    };
  }

  async componentDidMount() {
    try {
      const data = await fetchLockerDetailData();
      this.setState({
        lockerNumList: data.lockerNumList,
        lockerDetail: data.lockerDetail,
        loaded: true,
      });
    } catch (error) {
      console.error("데이터 로드 오류:", error);
    }
  }

  goList = () => {
    this.props.navigate("/locker/list");
  };

  handleFormSubmit = (i) => {
    const { userId, userNm, lockerDetail } = this.state;

    if (!lockerDetail.box_cd) {
      alert("사물함정보가 없습니다. 다시 시도해 주세요.");
      return;
    }
  
    const payload = {
      userId,
      userNm,
      boxCd: lockerDetail.box_cd,
      boxPrice: lockerDetail.box_price,
      boxNum: i,
    };
  
    superagent
      .post(`${BASE_API}/locker/insertLockerRent`)
      .type("form")
      .send(payload)
      .then((res) => {
        alert("Response: " + res.text);
        this.goList();
      })
      .catch((err) => console.error("사물함 예약 오류:", err));
  };

  // 개별 문제 아코디언 토글
  render() {
    const { lockerDetail, activeAccordion, lockerNumList } = this.state;

    return (
      <React.Fragment>
        <Row>
          <Col>
            {/* 사물함 정보 */}
            <Card className="mt-2">
              <Card.Header>
                <Card.Title as="h5">{lockerDetail.box_nm || "사물함 정보 없음"}</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <h6 className="mt-4 text-muted">대여비용</h6>
                    <hr />
                    {lockerDetail.box_count} - {lockerDetail.box_price}원 - 
                    <h6 className="mt-3 text-muted">대여가능/사용중</h6>
                    <hr />
                    {lockerDetail.not_cnt} / {lockerDetail.use_cnt}
                    <h6 className="mt-3 text-muted">열*개수</h6>
                    <hr />
                    {lockerDetail.row_num} * {lockerDetail.row_count}
                  </Col>
                  <Col md={6}>
                    <h6 className="mt-4 text-muted">예치금</h6>
                    <hr />
                    {lockerDetail.deposit}원
                    <h6 className="mt-4 text-muted">시작번호 - 끝번호</h6>
                    <hr />
                    {lockerDetail.start_num} - {lockerDetail.end_num}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Form>
              <Form.Control name="boxCd" type="hidden" value={lockerDetail.box_cd || ""} />
              <Form.Control name="userId" type="hidden" value={this.state.userId} />
              <Form.Control name="userNm" type="hidden" value={this.state.userNm} />
              <Form.Control name="boxPrice" type="hidden" value={lockerDetail.box_price} />
              <Col md={6} xl={12}>
                <Card className="Recent-Users widget-focus-lg">
                  <Card.Header>
                    <Card.Title as="h5">{lockerDetail.box_cd} [{lockerDetail.box_nm}]</Card.Title>
                  </Card.Header>
                  <Card.Body className="px-0 py-2">
                    <Table
                      responsive
                      hover
                      className="recent-users"
                      style={{ tableLayout: 'fixed', width: '100%' }} // 고정 레이아웃 적용
                    >
                      <tbody>
                        {lockerNumList.length > 0 ? (
                          lockerNumList
                            // 10개씩 묶어 2차원 배열로 변환
                            .reduce((rows, item, index) => {
                              if (index % 10 === 0) {
                                rows.push([]);
                              }
                              rows[rows.length - 1].push(item);
                              return rows;
                            }, [])
                            // 묶인 배열(chunk) 단위로 <tr> 생성
                            .map((chunk, rowIndex) => (
                        <tr key={rowIndex}>
                          {chunk.map((loc, colIndex) => (
                          <td
                            key={colIndex}
                            style={{
                            width: '10%', // 10개를 균등 분할
                            textAlign: 'center'
                          }}
                          >
                            {loc.box_flag === 'N' ? (
                            <Button
                              variant="success"
                              size="sm"
                              className="label theme-bg text-white f-12"
                              onClick={() => this.handleFormSubmit(loc.box_num)}
                            >
                              [{loc.box_num}] 예약
                            </Button>
                            ) : loc.box_flag === 'X' ? (
                            <div className="label theme-bg2 text-white f-12">
                              [{loc.box_num}] 고장
                            </div>
                            ) : (
                            <div className="label theme-bg2 text-white f-12">
                              [{loc.box_num}] 사용중
                            </div>
                            )}              
                          </td>
                          ))}
                        </tr>
                      ))
                      ) : (
                      <tr>
                        <td colSpan="10" style={{ textAlign: 'center' }}>
                          대여 가능한 사물함이 없습니다.
                        </td>
                      </tr>
                      )}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Col>

              {/* 버튼 영역 */}
              <div className="d-flex justify-content-end">
                <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip">목록</Tooltip>}>
                  <Button variant="info" onClick={this.goList}>목록</Button>
                </OverlayTrigger>
              </div>
            </Form>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default withRouter(View);
