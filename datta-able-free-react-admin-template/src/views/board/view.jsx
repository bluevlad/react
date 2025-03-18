import React from "react";
import superagent from "superagent";
import { BASE_URL } from "../../services/api";
import { Form, Button, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { boardOne } from "../../data/board";

import Card from '../../components/Card/MainCard';

// 🔹 `withRouter` 유틸 함수 (React Router v6에서 사용) 
// navigate를 props로 전달
function withRouter(Component) {
  return function (props) {
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
    // `goWrite` 함수 수정
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

  goEdit(boardId) {
    this.props.navigate("/board/edit?id="+boardId);
  }

  handleFormSubmit(e) {
    e.preventDefault();

    superagent
    .post(BASE_URL + "/deleteBoard")
    .type("form") // application/x-www-form-urlencoded 타입 설정
    .send({
      boardId: this.state.boardId,
    }) // 자동으로 URL-encoded 처리
    .then((res) => {
      alert("Response: " + res.text);
      this.goList(); // 저장 후 목록으로 이동
    })
    .catch((err) => {
      console.error(err);
    });
  }

  render() {

    return (
      <React.Fragment>
        <Row>
          <Col>
            <Card title={this.state.boardOne.data[0]?.board_title} isOption>
              <p dangerouslySetInnerHTML={ {__html : this.state.boardOne.data[0]?.board_memo} }/>
            </Card>
            <Form onSubmit={this.handleFormSubmit}>
              <Form.Control
                  name="boardId"
                  type="hidden"
                  value={this.state.boardOne.data[0]?.board_id}
              />
            <div className="d-flex justify-content-end">
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip className="mb-2" id="tooltip">목록</Tooltip>}
              >
                <Button variant="info" className="text-capitalize" onClick={this.goList}>
                  목록
                </Button>
              </OverlayTrigger>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip className="mb-2" id="tooltip">수정</Tooltip>}
              >
                <Button
                  variant="warning"
                  className="text-capitalize"
                  onClick={() => this.goEdit(this.state.boardOne.data[0]?.board_id)}
                >
                  수정
                </Button>
              </OverlayTrigger>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip className="mb-2" id="tooltip">삭제</Tooltip>}
              >
                <Button 
                  variant="danger" 
                  className="text-capitalize" 
                  type="submit"
                >
                삭제
                </Button>
              </OverlayTrigger>
            </div>
            </Form>
            </Col>
          </Row>
      </React.Fragment>
    );
  }
}

// 🔹 `withRouter`로 컴포넌트 감싸기
export default withRouter(View);
