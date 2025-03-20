import React from "react";
import superagent from "superagent";
import { BASE_API } from "../../config/constant";
import { Form, Button, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { boardOne } from "./data";

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
      boardId: "",
      boardOne: {
        data: [],
        loaded: false,
      },
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.goList = this.goList.bind(this);
    this.goEdit = this.goEdit.bind(this);
  }

  componentDidMount() {
    boardOne((data) => {
      this.setState({
        boardOne: {
          data: data,
          loaded: true,
        },
        boardId: data[0]?.board_id || "",
      });
    });
  }

  goList() {
    this.props.navigate("/board/list");
  }

  goEdit() {
    this.props.navigate(`/board/edit?id=${this.state.boardId}`);
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
    const { boardOne } = this.state;

    return (
      <React.Fragment>
        <Row>
          <Col>
            <Card title={boardOne.data[0]?.board_title} isOption>
              <p dangerouslySetInnerHTML={{ __html: boardOne.data[0]?.board_memo }} />
            </Card>
            <Form onSubmit={this.handleFormSubmit}>
              <Form.Control name="boardId" type="hidden" value={boardOne.data[0]?.board_id} />
              <div className="d-flex justify-content-end">
                <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip">목록</Tooltip>}>
                  <Button variant="info" onClick={this.goList}>목록</Button>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip">수정</Tooltip>}>
                  <Button variant="warning" onClick={this.goEdit}>수정</Button>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip">삭제</Tooltip>}>
                  <Button variant="danger" type="submit">삭제</Button>
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
