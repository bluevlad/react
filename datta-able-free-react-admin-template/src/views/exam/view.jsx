import React from "react";
import superagent from "superagent";
import { BASE_API } from "../../config/constant";
import { Form, Button, Row, Col, Card, Collapse, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useNavigate, Link, useParams } from "react-router-dom";
import { fetchExamDetailData } from "./data";

function withRouter(Component) {
  return function WrappedComponent(props) {
    const navigate = useNavigate();
    const { examId } = useParams(); // URL에서 examId 가져오기
    return <Component {...props} navigate={navigate} />;
  };
}


class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queList: [],
      examDetail: {},
      loaded: false,
      accordionKey: 0, // 닫힌 상태로 초기화
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

  goList = () => {
    this.props.navigate("/exam/list");
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    superagent
      .post(`${BASE_API}/deleteBoard`)
      .type("form")
      .send({ boardId: this.state.examDetail.exam_id })
      .then(() => {
        alert("삭제 완료");
        this.goList();
      })
      .catch((err) => console.error("삭제 오류:", err));
  };

  // 개별 문제 아코디언 토글
  toggleQuestionAccordion = (index) => {
    this.setState((prevState) => ({
      activeAccordion: prevState.activeAccordion === index ? null : index,
    }));
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
                      <Form.Group className="mb-3">
                        <Form.Check type="radio" label={que.ans_view1} name={que.que_id+"_1"} />
                        <Form.Check type="radio" label={que.ans_view2} name={que.que_id+"_2"} />
                        <Form.Check type="radio" label={que.ans_view3} name={que.que_id+"_3"} />
                        <Form.Check type="radio" label={que.ans_view4} name={que.que_id+"_4"} />
                        <Form.Check type="radio" label={que.ans_view5} name={que.que_id+"_5"} />
                      </Form.Group>
                      </Card.Body>
                    </div>
                  </Collapse>
                </Card>
              ))
            ) : (
              <p>등록된 문제가 없습니다.</p>
            )}
            </Form>

            {/* 삭제 버튼 */}
            <Form onSubmit={this.handleFormSubmit}>
              <Form.Control name="examId" type="hidden" value={examDetail.exam_id || ""} />
              <div className="d-flex justify-content-end">
                <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip">목록</Tooltip>}>
                  <Button variant="info" onClick={this.goList}>목록</Button>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip">제출</Tooltip>}>
                  <Button variant="primary" type="submit" className="ms-2">제출</Button>
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
