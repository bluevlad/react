import React, { useState, useEffect } from "react";
import superagent from "superagent";
import { BASE_API } from "../../config/constant";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// useNavigate를 클래스 컴포넌트에서 사용하기 위한 HOC
function withRouter(Component) {
  return function (props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

// userId를 가져와서 전달하는 HOC
function withUserId(Component) {
  return function WrappedComponent(props) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    useEffect(() => {
      if (!token) return;

    }, [token]);

    return <Component {...props} userId={userId} />;
  };
}

class Write extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      regId: props.userId || "", // userId를 props에서 받아서 설정
      isUse: "Y",
      boardTitle: "",
      boardMemo: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.goList = this.goList.bind(this);
  }

  // userId가 변경될 경우 regId 업데이트
  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.setState({ regId: this.props.userId });
    }
  }

  goList() {
    this.props.navigate("/board/list");
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleFormSubmit(e) {
    e.preventDefault();

    superagent
      .post(BASE_API + "/insertBoard")
      .type("form")
      .send(this.state)
      .then((res) => {
        alert("Response: " + res.text);
        this.props.navigate("/board/list");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col sm={12}>
            <Card>
              <Card.Header>
                <Card.Title as="h5">게시판 쓰기</Card.Title>
              </Card.Header>
              <Card.Body>
                <Col md={12}>
                  <Form onSubmit={this.handleFormSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>작성자</Form.Label>
                      <Form.Control type="text" value={ this.state.regId || "Guest"} readOnly />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>제목</Form.Label>
                      <Form.Control
                        name="boardTitle"
                        type="text"
                        placeholder="제목을 입력하세요"
                        value={this.state.boardTitle}
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>내용</Form.Label>
                      <Form.Control
                        name="boardMemo"
                        as="textarea"
                        rows="5"
                        placeholder="내용을 입력하세요"
                        value={this.state.boardMemo}
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>사용 여부</Form.Label>
                      <Form.Control
                        as="select"
                        name="isUse"
                        value={this.state.isUse}
                        onChange={this.handleChange}
                      >
                        <option value="Y">사용</option>
                        <option value="N">미사용</option>
                      </Form.Control>
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                      <Button variant="primary" type="submit">등록</Button>
                      <Button variant="info" onClick={this.goList}>목록</Button>
                    </div>
                  </Form>
                </Col>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default withRouter(withUserId(Write));
