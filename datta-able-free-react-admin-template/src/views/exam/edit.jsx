import React, { useEffect } from "react";
import superagent from "superagent";
import { BASE_API } from "../../config/constant";
import { Form, Button, Row, Col, Card, Collapse, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { fetchExamResultlData } from "./data";

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
      queList: [],
      examDetail: {},
      loaded: false,
      activeAccordion: null,
      answers: {}, // 응답 저장
    };
  }

  async componentDidMount() {
    try {
      const data = await fetchExamResultlData();
      const initialAnswers = {};
      data.queList.forEach((que) => {
        initialAnswers[que.que_id] = que.answer || "";
      });
      this.setState({
        queList: data.queList,
        examDetail: data.examDetail,
        answers: initialAnswers,
        loaded: true,
      });
    } catch (error) {
      console.error("데이터 로드 오류:", error);
    }
  }

  goList = () => {
    this.props.navigate("/exam/list");
  };

  handleAnswerChange = (queId, value) => {
    this.setState((prevState) => ({
      answers: {
        ...prevState.answers,
        [queId]: value,
      },
    }));
  };
   
  handleFormSubmit = (e) => {
    e.preventDefault();

    const { userId, userNm, examDetail, answers } = this.state;

    if (!examDetail.exam_id) {
      alert("시험 ID가 없습니다. 다시 시도해 주세요.");
      return;
    }
  
    const payload = {
      userId,
      userNm,
      examId: examDetail.exam_id,
      answers, // 문제 ID와 선택한 답을 객체 형태로 전송
    };
  
    superagent
      .post(`${BASE_API}/exam/insertExamResult`)
      .type("form")
      .send(payload)
      .then((res) => {
        alert("Response: " + res.text);
        this.goList();
      })
      .catch((err) => console.error("시험 제출 오류:", err));
  };

  // 개별 문제 아코디언 토글
  toggleQuestionAccordion = (index) => {
    this.setState((prevState) => ({
      activeAccordion: prevState.activeAccordion === index ? null : index,
    }));
  };

  render() {
    const { examDetail, activeAccordion, queList, answers } = this.state;

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
                    {examDetail.exam_year} - {examDetail.exam_round}
                    <h6 className="mt-3 text-muted">시험 기간</h6>
                    <hr />
                    {examDetail.exam_open} - {examDetail.exam_end}
                  </Col>
                  <Col md={6}>
                    <h6 className="mt-4 text-muted">시험 시간</h6>
                    <hr />
                    {examDetail.exam_period} - {examDetail.exam_time}
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Form onSubmit={this.handleFormSubmit}>
              <Form.Control name="examId" type="hidden" value={examDetail.exam_id || ""} />
              <Form.Control name="userId" type="hidden" value={this.state.userId} />
              <Form.Control name="userNm" type="hidden" value={this.state.userNm} />
              {/* 시험 문제 목록 */}
              {queList.length > 0 ? (
                queList.map((que, index) => (
                  <Card key={index} className="mt-3">
                    <Card.Header>
                      <Card.Title as="h5">
                        <Link
                          to="#"
                          onClick={() => this.toggleQuestionAccordion(index)}
                          aria-controls={`accordion${index}`}
                          aria-expanded={activeAccordion === index}
                        >
                          {que.que_title}
                        </Link>
                      </Card.Title>
                    </Card.Header>
                    <Collapse in={activeAccordion === index}>
                      <div id={`accordion${index}`}>
                        <Card.Body>
                          <Form.Control name="que_id" type="hidden" value={que.que_id} />
                          <Form.Group className="mb-3">
                            {[1, 2, 3, 4, 5].map((num) => (
                              <Form.Check
                                key={num}
                                type="radio"
                                label={que[`ans_view${num}`]}
                                name={`ans_${que.que_id}`}
                                value={num}
                                checked={answers[que.que_id] == num}
                                onChange={(e) => this.handleAnswerChange(que.que_id, e.target.value)}
                              />
                            ))}
                          </Form.Group>
                        </Card.Body>
                      </div>
                    </Collapse>
                  </Card>
                ))
              ) : (
                <p>등록된 문제가 없습니다.</p>
              )}

              {/* 버튼 영역 */}
              <div className="d-flex justify-content-end">
                <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip">제출</Tooltip>}>
                  <Button variant="primary" type="submit" className="ms-2">제출</Button>
                </OverlayTrigger>
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
