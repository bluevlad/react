import React from "react";
import superagent from "superagent";
import { BASE_API } from "../../config/constant";
import { Form, Button, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { examOne } from "./data";

import Card from '../../components/Card/MainCard';

// 🔹 `withRouter`를 `useNavigate`를 활용한 HOC로 변경
function withRouter(Component) {
  return function WrappedComponent(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      examId: "",
      examOne: {
        data: [],
        loaded: false,
      },
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.goList = this.goList.bind(this);
  }

  componentDidMount() {
    examOne((data) => {
      this.setState({
        examOne: {
          data: data,
          loaded: true,
        },
        examId: data[0]?.exam_id || "",
      });
    });
  }

  goList() {
    this.props.navigate("/exam/list");
  }

  handleFormSubmit(e) {
    e.preventDefault();

    superagent
      .post(BASE_API + "/deleteBoard")
      .type("form")
      .send({
        boardId: this.state.boardId,
      })
      .then((res) => {
        alert("삭제 완료");
        this.goList();
      })
      .catch((err) => {
        console.error("삭제 오류:", err);
      });
  }

  render() {
    const { examOne } = this.state;

    return (
      <React.Fragment>
        <Row>
          <Col>
            <Card title={examOne.data[0]?.exam_nm} isOption>
              {examOne.data[0]?.exam_nm}
            </Card>
            <Form onSubmit={this.handleFormSubmit}>
              <Form.Control name="boardId" type="hidden" value={examOne.data[0]?.exam_id} />
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
