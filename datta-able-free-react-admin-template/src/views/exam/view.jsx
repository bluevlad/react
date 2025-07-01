import React, { useEffect } from "react";
import superagent from "superagent";
import { BASE_API } from "../../config/constant";
import { Form, Button, Row, Col, Card, Collapse, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { fetchExamDetailData } from "./data";


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

class Write extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.userId || "",
      userNm: props.userNm || "",
      token: props.token || "",
      queList: [],
      examDetail: {},
      loaded: false,
      activeAccordion: null,
      answers: {}, // 응답 저장
    };
  }

  async componentDidMount() {
    try {
      const data = await fetchExamDetailData();
      this.setState({
        queList: data.queList,
        examDetail: data.examDetail,
        loaded: true,
      });
    } catch (error) {
      console.error("데이터 로드 오류:", error);
    }
  }

  // 날짜 포맷 함수 수정: 202301010800 형태 지원
  formatDateTime(dateStr) {
    if (!dateStr) return '';
    // 12자리(YYYYMMDDHHmm) 형태라면 직접 파싱
    if (/^\d{12}$/.test(dateStr)) {
      const yyyy = dateStr.substring(0, 4);
      const mm = dateStr.substring(4, 6);
      const dd = dateStr.substring(6, 8);
      const hh = dateStr.substring(8, 10);
      const min = dateStr.substring(10, 12);
      return `${yyyy}/${mm}/${dd} ${hh}:${min}`;
    }
    // Date 객체로 파싱 시도 (기존 방식)
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr; // 파싱 실패 시 원본 반환
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    return `${yyyy}/${mm}/${dd} ${hh}:${min}`;
  }

  goList = () => {
    this.props.navigate("/exam/list");
  };

  render() {
    const { examDetail, activeAccordion, queList } = this.state;

    return (
      <React.Fragment>
        <Row>
          <Col>
            {/* 시험 정보 */}
            <Card className="mt-2">
              <Card.Header>
                <Card.Title as="h5">{examDetail.exam_nm || "시험 정보 없음"}</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <h6 className="mt-4 text-muted">시험 정보</h6>
                    <hr />
                    {examDetail.exam_nm}
                    {examDetail.exam_year} - {examDetail.exam_round}
                    <h6 className="mt-3 text-muted">시험 기간</h6>
                    <hr />
                    {this.formatDateTime(examDetail.exam_open)} ~ {this.formatDateTime(examDetail.exam_end)}
                  </Col>
                  <Col md={6}>
                    <h6 className="mt-4 text-muted">시험 시간</h6>
                    <hr />
                    {examDetail.exam_period} - {examDetail.exam_time}
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* 버튼 영역 */}
            <div className="d-flex justify-content-end">
              <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip">목록</Tooltip>}>
                <Button variant="info" onClick={this.goList}>목록</Button>
              </OverlayTrigger>
            </div>

          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default withRouter(Write);
