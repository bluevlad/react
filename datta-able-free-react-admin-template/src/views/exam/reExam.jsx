import React from "react";
import superagent from "superagent";
import { BASE_API } from "../../config/constant";
import { Form, Button, Row, Col, Card, Collapse, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { fetchExamResultlData } from "./data";

// 팝업용 시험 재응시 컴포넌트
export class ExamEditPopup extends React.Component {
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
      answers: {},
    };
  }

  async componentDidMount() {
    try {
      const data = await fetchExamResultlData(this.props.examId, this.state.userId);
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
    if (this.props.onClose) this.props.onClose();
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
    const payload = { userId, userNm, examId: examDetail.exam_id, answers };
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

  toggleQuestionAccordion = (index) => {
    this.setState((prevState) => ({
      activeAccordion: prevState.activeAccordion === index ? null : index,
    }));
  };

  render() {
    const { show, onClose } = this.props;
    const { examDetail, activeAccordion, queList, answers, loaded } = this.state;
    return (
      <Modal show={show} onHide={onClose} size="lg" backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title>{examDetail.exam_nm || "시험 정보 없음"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loaded ? (
            <>
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
              <Form onSubmit={this.handleFormSubmit}>
                <Form.Control name="examId" type="hidden" value={examDetail.exam_id || ""}/>
                <Form.Control name="userId" type="hidden" value={this.state.userId} />
                <Form.Control name="userNm" type="hidden" value={this.state.userNm} />
                {queList.length > 0 ? (
                  queList.map((que, index) => (
                    <Card key={index} className="mt-3">
                      <Card.Header>
                        <Card.Title as="h5">
                          <a href="#" onClick={() => this.toggleQuestionAccordion(index)} aria-controls={`accordion${index}`} aria-expanded={activeAccordion === index}>
                            {que.que_title}
                          </a>
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
                <div className="d-flex justify-content-end mt-3">
                  <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip">제출</Tooltip>}>
                    <Button variant="primary" type="submit" className="ms-2">제출</Button>
                  </OverlayTrigger>
                  <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip">목록</Tooltip>}>
                    <Button variant="info" onClick={onClose}>목록</Button>
                  </OverlayTrigger>
                </div>
              </Form>
            </>
          ) : (
            <p>로딩 중...</p>
          )}
        </Modal.Body>
      </Modal>
    );
  }
}

// 예시: EdExam에서 팝업 띄우기
class EdExam extends React.Component {
  state = { show: true };
  handleClose = () => { this.setState({ show: false }); };
  render() {
    return <ExamEditPopup show={this.state.show} onClose={this.handleClose} examId={this.props.examId} userId={this.props.userId} userNm={this.props.userNm} token={this.props.token} />;
  }
}

export default EdExam; 